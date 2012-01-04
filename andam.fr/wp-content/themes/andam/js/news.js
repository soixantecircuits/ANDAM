//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.fbpage = 'ANDAMFashionAwards';
  window.twuser = 'ANDAMaward';
  window.access_token = 'AAAEPx4ZBt6T4BAPVb4u61KVfDoLuiIX5oSCeTaEeama22clBLxZBA2gHyHwPI1KeaZBTedDf8Il7g15huwbl01DF2CMOvAV4ZC0lUfLvSwZDZD';
  moment.lang(wp_var.lang);
  window.en = { locale: 'en_US',
                newphoto: 'New picture',
                newvideo: 'New video',
                likesthis: 'likes this',
                likethis: 'like this',
                others: 'others',
                and: 'and',
                from:'from <a href="http://www.facebook.com/' + fbpage + '" target="_blank">Facebook</a> and <a href ="htpp://www.twitter.com/' + twuser + ' target="_blank">Twitter</a>',
                loading:'Loading'
              };
  window.fr = { locale: 'fr_FR',
                newphoto: 'Nouvelle photo',
                newvideo: 'Nouvelle video',
                likesthis: 'aime &ccedil;a',
                likethis: 'aiment &ccedil;a',
                others: 'autres personnes',
                and: 'et',
                from:'de <a href="http://www.facebook.com/' + fbpage + '" target="_blank">Facebook</a> et <a href ="htpp://www.twitter.com/' + twuser + ' target="_blank">Twitter</a>',
                loading:'Chargement'
                };
  window.lang = (wp_var.lang == 'fr')? window.fr : window.en;
  moment.lang(wp_var.lang);
  Handlebars.registerHelper('prettydatetw', function(date) {
            if (date) {
              return moment(moment(date,'YYYY-MM-DDTHH:mm:ssZ')).format("D MMM, HH:mm");
              //return moment(date.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/, "$1 $2 $4 $3 UTC"), 'ddd MMM DD HH:mm:ss ZZ YYYY').format("D MMM");
              //return moment(moment(date,'YYYY-MM-DDTHH:mm:ssZ')).format("dddd D MMMM, HH:mm");
              //return moment(date.replace(/\+/,'')).format("D MMM");
            }
            return "";
  });

  Handlebars.registerHelper('dolinksin', function(text) {
        if (text){
          text = text.replace(/((www|http:\/\/)[^ ]+)/g,"<a href='$1' target='_blank'>$1</a>");
          text = text.replace(/((@)[^ :]+)/g,function(match, user){
            user = user.replace(/@/g,"");
            return "@<a href='http://twitter.com/"+ user+ "' target='_blank'>"+ user + "</a>";}
          );
          text = text.replace(/((#)[^ ]+)/g,function(match, user){
            user = user.replace(/#/g,"");
            return "#<a href='http://twitter.com/search?q=%23"+ user+ "' target='_blank'>"+ user + "</a>";}
          );
          return text;
        }
        return ""; 
  });
  
  Handlebars.registerHelper('readabledate', function(date) {
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
  var srctmpl =   "<time datetime='2010-01-20' pubdate>" +
                    + "{{prettydatetw created_at}}" +
                  "</time>" +
                  "<div class='username'>(" +
                    "<a href='http://twitter.com/" +
                        "{{retweeted_status.user.screen_name}}" +
                        "{{^retweeted_status.user.screen_name}}" +
                          "{{user.screen_name}}" +
                        "{{/retweeted_status.user.screen_name}}" +
                      "' target='_blank'>" +
                        "{{retweeted_status.user.screen_name}}" +
                        "{{^retweeted_status.user.screen_name}}" +
                          "{{user.screen_name}}" +
                        "{{/retweeted_status.user.screen_name}}" +
                    "</a>" +
                  ")</div>" +
                  "<h1>" +
                    "{{{dolinksin retweeted_status.text}}}" +
                    "{{^retweeted_status.text}}" +
                       "{{{dolinksin text}}}" +
                    "{{/retweeted_status.text}}" +
                  "</h1>" +
                  "<div class='action'><a href='#'>Retweet</a></div>";
  window.tmplTwitter = Handlebars.compile(srctmpl);
  
  srctmpl =       "<time datetime='2010-01-20' pubdate>" +
                     "{{readabledate created_time}}" +
                  "</time>" +
                  "<div class='username'>(" +
                    "<a href='http://www.facebook.com/{{from.id}}' target='_blank'>{{from.name}}</a>" +  
                  ")</div>" +
                  "{{#name}}<h1><a href={{../link}} target='_blank' class='link'>{{.}}</h1></a>{{/name}}" +
                  "{{#description}}<p>{{.}}</p>{{/description}}" +
                  "{{#message}}<p>{{.}}</p>{{/message}}" +
                  "{{#actions}}<div class='action'><a href={{link}} target='_blank'>{{name}}</a></div>{{/actions}}";
  window.tmplFacebook = Handlebars.compile(srctmpl);
     
  //  Model
  // ----------

  window.Tweet = Backbone.Model.extend({  
    validate: function(attrs){
              //2011-12-30T11:19:15+0000 Fri Dec 30 11:31:35 +0000 2011
              //return moment(moment(date,'YYYY-MM-DDTHH:mm:ssZ')).format("dddd D MMMM, HH:mm");
              attrs.created_at = attrs.created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) (\+\d+) (\d+)$/, "$5-$1-$2T$3$4");
              attrs.created_at = attrs.created_at.replace(/Dec/, "12");
              attrs.created_at = attrs.created_at.replace(/Nov/, "11");
              attrs.created_at = attrs.created_at.replace(/Oct/, "10");
              attrs.created_at = attrs.created_at.replace(/Sep/, "9");
              attrs.created_at = attrs.created_at.replace(/Aug/, "8");
              attrs.created_at = attrs.created_at.replace(/Jul/, "7");
              attrs.created_at = attrs.created_at.replace(/Jun/, "6");
              attrs.created_at = attrs.created_at.replace(/May/, "5");
              attrs.created_at = attrs.created_at.replace(/Apr/, "4");
              attrs.created_at = attrs.created_at.replace(/Mar/, "3");
              attrs.created_at = attrs.created_at.replace(/Feb/, "2");
              attrs.created_at = attrs.created_at.replace(/Jan/, "1");
    }
  });
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
  window.Timeline = Backbone.Collection.extend({

    model: Tweet,

    url: "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=" + window.twuser + "&count=20",
    
    sync: function(method, model, options){  
        options.timeout = 10000;  
        options.dataType = "jsonp";  
        return Backbone.sync(method, model, options);  
    }

  });


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

  window.BothFeed = Backbone.Collection.extend({

    comparator: function(post){
        return -(post.get('created_at') ? moment(post.get('created_at'),'YYYY-MM-DDTHH:mm:ssZ') : moment(post.get('created_time'),'YYYY-MM-DDTHH:mm:ssZ'));
    }
  });
  // View
  // --------------
  
  window.TweetView = Backbone.View.extend({

	tagName:  "article",
	
    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      $(this.el).html(window.tmplTwitter(this.model.toJSON()));
      return this;
    }

  });

  // The DOM element for a todo item...
  window.PostView = Backbone.View.extend({
	tagName:  "article",

    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      //if (this.model.get('type') != 'status'){
        $(this.el).html(window.tmplFacebook(this.model.toJSON()));
      //}      
      return this;
    }

  });

  // The Application
  // ---------------

  // Create our global collection.
  window.timeline = new Timeline;
  window.feed = new Feed;
  window.bothfeed = new BothFeed; 
  
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
      //timeline.bind('add',   this.addOne, this);
      timeline.bind('all',   this.addAllTweets, this);
      timeline.fetch();
      feed.bind('add',   this.addOne, this);
      feed.bind('all',   this.addAllPosts, this);
      feed.fetch();
    },

    addOne: function(post) {
      if (window.firsttime == undefined){
        if (post.get('entities')){
          if (post.get('entities').media){
            if (post.get('entities').media.length> 0){
              if (post.get('entities').media[0].type == 'photo'){
                window.firsttime = true;
                $.backstretch(post.get('entities').media[0].media_url, {speed: 350});
              }
            }
          }  
        }        
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
      if (post.get('entities')){
        view = new TweetView({model: post});
      }
      this.$(".main").append(view.render().el);
    },

    addAllPosts: function(){
      bothfeed.add(feed.models);
      this.addAll();
    },
    addAllTweets: function(){
      bothfeed.add(timeline.models);
      this.addAll();
    },

    // Add all items in the collection at once.
    addAll: function() {
      clearInterval(window.loadingtimer);
      $(".main").empty();      
      $(".main").append("<div class='intro'>("+lang.from+")</div><br/><br/>");
      bothfeed.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
