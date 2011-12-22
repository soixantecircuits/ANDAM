//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.access_token = 'AAAEPx4ZBt6T4BAPVb4u61KVfDoLuiIX5oSCeTaEeama22clBLxZBA2gHyHwPI1KeaZBTedDf8Il7g15huwbl01DF2CMOvAV4ZC0lUfLvSwZDZD';
  moment.lang(wp_var.lang);
  window.en = { locale: 'en_US',
                likesthis: 'likes this',
                likethis: 'like this',
                others: 'others',
                and: 'and'};
  window.fr = { locale: 'fr_FR',
                likesthis: 'aime &ccedil;a',
                likethis: 'aiment &ccedil;a',
                others: 'autres personnes',
                and: 'et'};
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
                 "{{#story}}" +
                   "<div class='story'>{{.}}</div>" +
                 "{{/story}}" +
                 "{{#name}}<h1>{{.}}</h1>{{/name}}" +
                 "{{#caption}}<a href={{../link}} target='_blank' class='link'>{{.}}</a>{{/caption}}" +
                 "{{#description}}<p>{{.}}</p>{{/description}}" +
                 "{{#message}}<p>{{.}}</p>{{/message}}" +
                 "{{#likes}}<div class='likes'>{{likers data}}</div>{{/likes}}"+
                 "{{#actions}}<a href={{link}} target='_blank'>{{name}}</a> {{/actions}}";
  window.tmplFacebook = Handlebars.compile(srctmpl);
     
  //  Model
  // ----------

  window.Post = Backbone.Model.extend({
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
      $(this.el).html(window.tmplFacebook(this.model.toJSON()));
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
              $.backstretch(picture.images[0].source, {speed: 1000});
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
      feed.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
