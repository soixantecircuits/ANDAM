//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.username = 'egeoffray';  
  window.en = { 
                from:'From <a href="http://www.twitter.com/' + username + '" target="_blank">Twitter</a>',
                loading:'Loading'
              };
  window.fr = { 
                from:'De <a href="http://www.twitter.com/' + username + '" target="_blank">Twitter</a>',
                loading:'Chargement'
                };
  window.lang = (wp_var.lang == 'fr')? window.fr : window.en;
  moment.lang(wp_var.lang);
  Handlebars.registerHelper('prettydate', function(date) {
            if (date) {
              //return moment(date,'ddd MMM DD HH:mm:ss ZZ YYYY').format("D MMM");
              //return moment(date.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/, "$1 $2 $4 $3 UTC"), 'ddd MMM DD HH:mm:ss ZZ YYYY').format("D MMM");
              //return moment(moment(date,'YYYY-MM-DDTHH:mm:ssZ')).format("dddd D MMMM, HH:mm");
              return moment(date.replace(/\+/,'')).format("D MMM");
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
  // Template
  // --------
  var srctmpl =  "<time datetime='2010-01-20' pubdate>\
                          {{prettydate created_at}}\
                  </time>\
                  <span id='author' rel='author'>\
                    <a href='http://twitter.com/"
                       + "{{retweeted_status.user.screen_name}}"
                       + "{{^retweeted_status.user.screen_name}}"
                      + "{{user.screen_name}}"
                      + "{{/retweeted_status.user.screen_name}}"
                      + "' target='_blank'>\
                       {{retweeted_status.user.screen_name}}\
                       {{^retweeted_status.user.screen_name}}\
                       {{user.screen_name}}\
                       {{/retweeted_status.user.screen_name}}\
                    </a>\
                  </span>\
                  <h1>\
                       {{{dolinksin retweeted_status.text}}}\
                       {{^retweeted_status.text}}\
                       {{{dolinksin text}}}\
                       {{/retweeted_status.text}}</h1>";
                  //<a href='#'>{{#entities.urls}}{{url}}{{/entities.urls}}</a>";

  window.tmplTwitter = Handlebars.compile(srctmpl);
 
 
  
  //  Model
  // ----------

  window.Tweet = Backbone.Model.extend({
  });

  //  Collection
  // ---------------

  window.Timeline = Backbone.Collection.extend({

    model: Tweet,

    url: "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=" + window.username + "&count=20",
    
    sync: function(method, model, options){  
        options.timeout = 10000;  
        options.dataType = "jsonp";  
        return Backbone.sync(method, model, options);  
    }

  });

  // View
  // --------------

  // The DOM element for a todo item...
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

  // The Application
  // ---------------

  // Create our global collection.
  window.timeline = new Timeline;
  
  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $(".main"),

    initialize: function() {
      $(".main").append("<div class='loading'>" + lang.loading + "...</div>");
      window.loadingtimer = setInterval(function() { 
       $('.loading').append('.');
      }, 400);
      timeline.bind('add',   this.addOne, this);
      timeline.bind('all',   this.addAll, this);
      timeline.fetch();
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(tweet) {
      if (window.firsttime == undefined){
        if (tweet.get('entities').media){
          if (tweet.get('entities').media.length> 0){
            if (tweet.get('entities').media[0].type == 'photo'){
              window.firsttime = true;
              $.backstretch(tweet.get('entities').media[0].media_url, {speed: 350});
            }
          }
        }  
      }
      var view = new TweetView({model: tweet});
      this.$(".main").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      clearInterval(window.loadingtimer);
      $(".main").empty();      
      $(".main").append("<div class='intro'>("+lang.from+")</div><br/>");
      timeline.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
