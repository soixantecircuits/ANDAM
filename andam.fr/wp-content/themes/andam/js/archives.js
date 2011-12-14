//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.flickruser = '71927167@N03';
  window.flickrapikey= 'f6aee2b38c5a21562225b5d232205b95'; 
  Handlebars.registerHelper('onetime', function(year) {
            if (year!= window.year) {
              window.year = year;
              return year;
            }
            return "";
  });

  // Template
  // --------
					  
  var srctmpl = "<year>{{onetime year}}</year>\
                 <a href='http://www.flickr.com/photos/" + window.flickruser 
                 + "/sets/{{id}}/' target='_blank'>{{artist}}</a>";
  window.tmplFlickrChrono = Handlebars.compile(srctmpl);
  srctmpl = "<a href='http://www.flickr.com/photos/" + window.flickruser
            + "/sets/{{id}}/' target='_blank'>{{artist}}, {{year}}</a>";
  window.tmplFlickrAlpha = Handlebars.compile(srctmpl);
 
 
  
  //  Model
  // ----------

  window.Set = Backbone.Model.extend({
    set: function(attributes,options) {
        attributes.artist = attributes.title._content.replace(/[,.;:] ?(19|20)\d\d/g,""); 
        attributes.year = attributes.title._content.match(/(19|20)\d\d/g)[0]; 
        return Backbone.Model.prototype.set.call(this, attributes,options);
    }
  });

  //  Collection
  // ---------------

  window.Sets = Backbone.Collection.extend({

    model: Set,

    url:"http://www.flickr.com/services/rest/?method=flickr.photosets.getList&format=json&api_key="
        +window.flickrapikey + "&user_id=" + window.flickruser,
    
    sync: function(method, model, options){  
        options.timeout = 10000;  
        options.dataType = "jsonp";
        options.jsonp = "jsoncallback"; 
        return Backbone.sync(method, model, options);  
    },
    parse: function(response) {
        return response.photosets.photoset;
    },
    comparator: function(set){
        return -set.get('year');
    }

  });

  // View
  // --------------

  // The DOM element for a todo item...
  window.SetView = Backbone.View.extend({

    tagName:  "div",
	
    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      window.tmplFlickr = (window.alphabetical) ? tmplFlickrAlpha : tmplFlickrChrono;
      $(this.el).html(window.tmplFlickr(this.model.toJSON()));
      return this;
    }

  });

  // The Application
  // ---------------

  // Create our global collection.
  window.sets = new Sets;
  
  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    //el: $(".main"),

    initialize: function() {
      $(".main").append("<preambule>Liste des laur&eacute;ats depuis 1989 par ann&eacute;e </preambule>(voir par <div id='sortToggle'>ordre alphab&eacute;tique</div>)<div id='laureats'></div>");
      sets.bind('add',   this.addOne, this);
      sets.bind('all',   this.addAll, this);
      sets.fetch();
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(set) {
      var view = new SetView({model: set});
      this.$("#laureats").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      sets.each(this.addOne);
    },

    sortToggle: function(){
      if (window.alphabetical){
        $("#sortToggle").html('ordre alphab&eacute;tique');
        window.alphabetical = false;
        sets.comparator = function(set){
            return -set.get('year');
        };
      }else{
        $("#sortToggle").html('ordre chronologique');
        window.alphabetical = true;
        sets.comparator = function(set){
            return set.get('artist');
        };
      }
      sets.sort();
      $("#laureats").empty();
      this.addAll();
    },
  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

  $("#sortToggle").bind('click', function(){
    App.sortToggle();
  });
});
