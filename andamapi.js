// Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  //  Model
  // ----------

  window.Tweet = Backbone.Model.extend({
  });

  //  Collection
  // ---------------

  window.Timeline = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Tweet,

    url: "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=ANDAMaward&count=5",
    
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

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: $("#tweetTemplate"),
    
    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template.tmpl(this.model.toJSON()));
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


    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      timeline.bind('add',   this.addOne, this);
      timeline.bind('all',   this.addAll, this);
      timeline.fetch();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(tweet) {
      var view = new TweetView({model: tweet});
      this.$("#tweet-list").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      timeline.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
