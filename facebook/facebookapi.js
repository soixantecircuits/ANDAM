//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
    
  moment.lang('fr');
  Handlebars.registerHelper('prettydatefb', function(date) {
            if (date) {
              return moment(moment(date)).format("dddd d MMMM, HH:mm");
            }
            return "";
  });

  // Template
  // --------
  
  var srctmpl =  "<div class='post'>\
                        <div class='date'>\
                          {{prettydatefb created_time}}\
                        </div>\
                        <div class='story'>\
                             {{story}}\
                        </div>\
                        <div class='link'>{{caption}}</div>\
                        <div class='title'>{{name}}</div>\
                        <div class='description'>{{description}}</div>\
                        <img class='bg' alt='' src='{{picture}}'>\
                        <div class='likes'>{{#likes.data}}{{name}}, {{/likes.data}} aiment &ccedil;a</div>\
                        <div class='action'>J\'aime * Commenter</div>\
                      </div>";
  window.tmplFacebook = Handlebars.compile(srctmpl);
     
  
  //  Model
  // ----------

  window.Post = Backbone.Model.extend({
  });

  //  Collection
  // ---------------

  window.Feed = Backbone.Collection.extend({

    model: Post,

    url: "https://graph.facebook.com/ANDAMFashionAwards/feed?access_token=AAAEPx4ZBt6T4BAPVb4u61KVfDoLuiIX5oSCeTaEeama22clBLxZBA2gHyHwPI1KeaZBTedDf8Il7g15huwbl01DF2CMOvAV4ZC0lUfLvSwZDZD",
    
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
    el: $("#andamapp"),

    initialize: function() {
      feed.bind('add',   this.addOne, this);
      feed.bind('all',   this.addAll, this);
      feed.fetch();
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(post) {
      var view = new PostView({model: post});
      this.$("#facebook").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      feed.each(this.addOne);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
