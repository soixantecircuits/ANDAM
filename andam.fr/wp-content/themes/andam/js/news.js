//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.fbpage = 'ANDAMFashionAwards';
  window.access_token = 'AAAEPx4ZBt6T4BAPVb4u61KVfDoLuiIX5oSCeTaEeama22clBLxZBA2gHyHwPI1KeaZBTedDf8Il7g15huwbl01DF2CMOvAV4ZC0lUfLvSwZDZD';
  moment.lang(wp_var.lang);
  window.en = { locale: 'en_US',
                newphoto: 'New picture',
                newvideo: 'New video',
                likesthis: 'likes this',
                likethis: 'like this',
                others: 'others',
                and: 'and',
                from:'from <a href="http://www.facebook.com/' + fbpage + '" target="_blank">Facebook</a>',
                loading:'Loading'
              };
  window.fr = { locale: 'fr_FR',
                newphoto: 'Nouvelle photo',
                newvideo: 'Nouvelle video',
                likesthis: 'aime &ccedil;a',
                likethis: 'aiment &ccedil;a',
                others: 'autres personnes',
                and: 'et',
                from:'de <a href="http://www.facebook.com/' + fbpage + '" target="_blank">Facebook</a>',
                loading:'Chargement'
                };
  window.lang = (wp_var.lang == 'fr')? window.fr : window.en;
  Handlebars.registerHelper('prettydatefb', function(date) {
            if (date) {
              return moment(moment(date,'YYYY-MM-DDTHH:mm:ssZ')).format("dddd D MMMM, HH:mm");
            }
            return "";
  });
  Handlebars.registerHelper('likers', function(likers) {
    if (likers.length == 1){
      return likers[0].name + ' ' +lang.likesthis + '.';
    } else if (likers.length == 2){
      return likers[0].name + ' ' + lang.and + ' ' + likers[1].name + ' ' + lang.likethis + '.';
    } else if (likers.length == 3){
      return likers[0].name + ', ' + likers[1].name + ' ' + lang.and + ' ' + likers[2].name + ' ' + lang.likethis + '.';
    } else if (likers.length > 3){
      return likers[0].name + ', ' + likers[1].name + ' ' + lang.and + ' ' + (likers.length - 2) + ' ' + lang.others + ' ' + lang.likethis + '.';
    }
    return '';
  });
  // Template
  // --------
  
  var srctmpl =  "<time datetime='2010-01-20' pubdate>" +
                     "{{prettydatefb created_time}}" +
                 "</time>" +
                 //"{{#story}}" +
                 //  "<div class='story'>{{.}}</div>" +
                 //"{{/story}}" +
                 "{{#name}}<h1><a href={{../link}} target='_blank' class='link'>{{.}}</h1></a>{{/name}}" +
                 //"{{#caption}}{{.}}{{/caption}}" +
                 "{{#description}}<p>{{.}}</p>{{/description}}" +
                 "{{#message}}<p>{{.}}</p>{{/message}}" +
                 //"{{#likes}}<div class='likes'>{{likers data}}</div>{{/likes}}"+
                 "{{#actions}}<a href={{link}} target='_blank'>{{name}}</a> {{/actions}}";
  window.tmplFacebook = Handlebars.compile(srctmpl);
     
  //  Model
  // ----------

  window.Post = Backbone.Model.extend({
    validate: function(attrs){
      if (attrs.type == 'photo'){
        attrs.name = lang.newphoto;
      }
      if (attrs.type == 'video'){
        attrs.name = lang.newvideo;
      }
      if (attrs.name == attrs.description){
        attrs.description = undefined;
      }
      if (attrs.actions){
        attrs.actions=_.find(attrs.actions, function(action){return (action.name == 'Like');});       
      }
    }
  });

  //  Collection
  // ---------------

  window.Feed = Backbone.Collection.extend({

    model: Post,

    url: "https://graph.facebook.com/ANDAMFashionAwards/feed?access_token=" + window.access_token + "&locale=" + lang.locale,
    
    sync: function(method, model, options){  
        options.timeout = 10000;  
        options.dataType = "jsonp";  
        return Backbone.sync(method, model, options);  
    },
    parse: function(response) {
      return response.data;
    }
  });

  // View
  // --------------

  // The DOM element for a todo item...
  window.PostView = Backbone.View.extend({
	tagName:  "article",

    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      if (this.model.get('type') != 'status'){
        $(this.el).html(window.tmplFacebook(this.model.toJSON()));
      }      
      return this;
    }

  });

  // The Application
  // ---------------

  // Create our global collection.
  window.feed = new Feed;
  
  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $(".main"),

    initialize: function() {
      $(".main").append("<div class='loading'>" + lang.loading + "</div>");
      window.timecounter = 0;
      window.loadingtimer = setInterval(function() {
        window.timecounter++;
        if (window.timecounter > 3){
          window.timecounter = 0;
          $('.loading').html(lang.loading);
        } 
        else{
          $('.loading').append('.');
        }
      }, 400);
      feed.bind('add',   this.addOne, this);
      feed.bind('all',   this.addAll, this);
      feed.fetch();
    },

    addOne: function(post) {
      if (window.firsttime == undefined){
        if (post.get('type') == 'photo'){
           window.firsttime = true;
           $.ajax({
            url:"https://graph.facebook.com/" + post.get('object_id') + "?access_token=" + window.access_token,
            dataType:'JSONP',
            success:function(picture){
              var image = _.find(picture.images, function(image){
                    return image.width * image.height < 800*600;});
              $.backstretch(image.source, {speed: 1000});
            },
            error:function(){
              console.log('couldnt retrieve background image from facebook');
            }
          }); 
        }
      }
      var view = new PostView({model: post});
      this.$(".main").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      clearInterval(window.loadingtimer);
      $(".main").empty();      
      $(".main").append("<div class='intro'>("+lang.from+")</div><br/><br/>");
      feed.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
