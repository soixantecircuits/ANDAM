//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
    
  moment.lang(my_vars.mylang.toString());
  Handlebars.registerHelper('prettydatefb', function(date) {
            if (date) {
              return moment(moment(date)).format("dddd D MMMM, HH:mm");
            }
            return "";
  });
  Handlebars.registerHelper('likers', function(likers) {
    if (likers.length == 1){
      return likers[0].name + ' aime &ccedil;a';
    } else if (likers.length == 2){
      return likers[0].name +' et ' + likers[1].name + ' aiment &ccedil;a';
    } else if (likers.length == 3){
      return likers[0].name + ', ' + likers[1].name + ' et ' + likers[2].name + ' aiment &ccedil;a';
    } else if (likers.length > 3){
      return likers[0].name + ', ' + likers[1].name + ' et ' + (likers.length - 2) + ' aiment &ccedila;a';
    }
    return '';
  });
  // Template
  // --------
  
  var srctmpl =  "<time datetime='2010-01-20' pubdate>\
                          {{prettydatefb created_time}}\
                        </time>\
                        <div class='story'>\
                             {{story}}\
                        </div>\
                        <h1>{{name}}</h1>\
                        <a href={{link}} target='_blank' class='link'>{{caption}}</a>\
                        {{#description}}<p>{{.}}</p>{{/description}}\
                        {{#message}}<p>{{.}}</p>{{/message}}\
                        {{#likes}}<div class='likes'>{{likers data}}</div>{{/likes}}\
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
        window.firsttime = true;
        $.backstretch(post.get('picture'), {speed: 350});
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
