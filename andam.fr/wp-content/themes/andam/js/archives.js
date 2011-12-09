//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
    
  moment.lang('fr');
  Handlebars.registerHelper('prettydate', function(date) {
            if (date) {
              return moment(moment(date)).format("D MMM");
            }
            return "";
  });

  // Template
  // --------
/*
var srctmpl = "<article id='container tweet'>\
					<time datetime='2010-01-20' pubdate>\
					{{prettydate created_at}}\
					</time>\
					<span rel='author'>\
					     {{retweeted_status.user.screen_name}}\
					     {{^retweeted_status.user.screen_name}}\
					     {{user.screen_name}}\
					</span>\
					<h1 id='message'>{{text}}</h1>\
					<a href='#'>\
						{{#entities.urls}}{{url}}{{/entities.urls}}\
					</a>\
			    </article>";
*/
					  
  var srctmpl =  "<time datetime='2010-01-20' pubdate>\
                          {{prettydate created_at}}\
                  </time>\
                  <span id='author' rel='author'>\
                       {{retweeted_status.user.screen_name}}\
                       {{^retweeted_status.user.screen_name}}\
                       {{user.screen_name}}\
                       {{/retweeted_status.user.screen_name}}\
                  </span>\
                  <h1>{{*}}</h1>\
                  <a href='#'>{{#entities.urls}}{{url}}{{/entities.urls}}</a>";

  window.tmplTwitter = Handlebars.compile(srctmpl);
 
 
  
  //  Model
  // ----------

  window.Tweet = Backbone.Model.extend({
  });

  //  Collection
  // ---------------

  window.Timeline = Backbone.Collection.extend({

    model: Tweet,

    url: "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=ANDAMaward&count=20",
    
    sync: function(method, model, options){  
        options.timeout = 10000;  
        options.dataType = "jsonp";  
        return Backbone.sync(method, model, options);  
    },
    parse: function(response) {
      return response.query;//.pages.3051354.revisions;
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
    el: $("#main"),

    initialize: function() {
      timeline.bind('add',   this.addOne, this);
      timeline.bind('all',   this.addAll, this);
      timeline.fetch();
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(tweet) {
      var view = new TweetView({model: tweet});
      this.$("#main").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      timeline.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});

























