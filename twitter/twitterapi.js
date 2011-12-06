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
  
  var srctmpl =  "<div class='tweet'>\
                        <div class='date'>\
                          {{prettydate created_at}}\
                        </div>\
                        <div class='username'>\
                             {{retweeted_status.user.screen_name}}\
                             {{^retweeted_status.user.screen_name}}\
                                {{user.screen_name}}\
                             {{/retweeted_status.user.screen_name}}\
                        </div>\
                        <div class='message'>{{text}}</div>\
                        <div class='url'>{{#entities.urls}}{{url}}{{/entities.urls}}</div>\
                      </div>";
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
    }

  });

  // View
  // --------------

  // The DOM element for a todo item...
  window.TweetView = Backbone.View.extend({

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
    el: $("#andamapp"),

    initialize: function() {
      timeline.bind('add',   this.addOne, this);
      timeline.bind('all',   this.addAll, this);
      timeline.fetch();
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(tweet) {
      var view = new TweetView({model: tweet});
      this.$("#tweets").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      timeline.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
