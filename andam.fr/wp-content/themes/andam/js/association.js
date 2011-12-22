//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  // -------
  window.en = { wiki:'en',
                page:'Pierre_Bergé',
                //page:'Fashion',
                from:'From <a href="http://en.wikipedia.org">Wikipedia</a>, the free encyclopedia'};
  window.fr = { wiki:'fr',
                page:'Association_nationale_pour_le_d%C3%A9veloppement_des_arts_de_la_mode',
                from:'De <a href="http://fr.wikipedia.org">Wikip&eacute;dia</a>, l\'encyclop&eacute;die libre'};
  window.lang = (wp_var.lang == 'fr')? window.fr : window.en; 
  
  Handlebars.registerHelper('wikilink', function(text) {
        if (text){
          text = text.replace(/"((\/w\/|\/wiki\/)[^"]+)"/g, function(match, link){
            link = link.replace(/\"/g,"");    
            return "\"http:\/\/" + lang.wiki + ".wikipedia.org" + link + "\" target='_blank'"});
          return text;
        }
        return ""; 
  });
 
  // Template
  // --------
  var srctmpl =  "{{{wikilink content}}}";
  window.tmplWiki = Handlebars.compile(srctmpl);
 
 
  
  //  Model
  // ----------

  window.Tweet = Backbone.Model.extend({
  });

  //  Collection
  // ---------------
  window.Timeline = Backbone.Collection.extend({

    model: Tweet,

    //url:"http://fr.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=xml&pageids=3051354&format=json",
    url:"http://" + lang.wiki + ".wikipedia.org/w/api.php?action=parse&page=" + lang.page + "&format=json",    

    sync: function(method, model, options){  
        options.timeout = 10000;  
        options.dataType = "jsonp";  
        return Backbone.sync(method, model, options);  
    },
    parse: function(response) {
      //return response.query.pages['3051354'].revisions;
      return response.parse.text;
    }

  });

  // View
  // --------------

  // The DOM element for a todo item...
  window.TweetView = Backbone.View.extend({

	tagName:  "div",
	
    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      this.model.attributes.content=this.model.attributes['*'];
      $(this.el).html(window.tmplWiki(this.model.toJSON()));
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
      $(".main").append("<div>Loading...</div>");
      timeline.bind('add',   this.addOne, this);
      timeline.bind('all',   this.addAll, this);
      timeline.fetch();
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(tweet) {
      var view = new TweetView({model: tweet});
      this.$(".main").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      $(".main").empty();      
      $(".main").append("<div class='intro'>"+lang.from+"</div><br/>");
      timeline.each(this.addOne);
      
      $.backstretch($(".thumb img").attr('src'), {speed: 1000});
      $(".thumb").empty();
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
