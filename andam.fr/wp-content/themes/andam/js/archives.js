//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.flickruser = '71927167@N03';
  window.flickrapikey= 'f6aee2b38c5a21562225b5d232205b95'; 
  Handlebars.registerHelper('onetime', function(year) {
            if (year!= window.year) {
              window.year = year;
              return "<h2 class='year'>"+year+"</h2>";
            }
            return "";
  });

  // Template
  // --------
					  
  var srctmpl = "{{#laureats}}\
                 {{{onetime year}}}\
                 <li><a href='http://www.flickr.com/photos/" + window.flickruser 
                 + "/sets/{{id}}/' target='_blank'>{{artist}}</a></li>\
                 {{/laureats}}";
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

  window.Year = Backbone.Model.extend({});

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
        return set.get('artist');
    }

  });

  window.Years = Backbone.Collection.extend({
    model: Year,
    parse: function(response){
      return _.groupBy(response,'year');
      return response;
    } 
  });

  // View
  // --------------

  // The DOM element for a todo item...
  window.SetView = Backbone.View.extend({

    tagName:  "li",
	
    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      window.tmplFlickr = (window.alphabetical) ? tmplFlickrAlpha : tmplFlickrChrono;
      $(this.el).html(window.tmplFlickr(this.model.toJSON()));
      return this;
    }
  });

  window.YearView = Backbone.View.extend({
 
    tagName: "ul",
  
    initialize: function(){
      this.model.bind('change', this.render, this);
    },

    render: function(){
      $(this.el).html(window.tmplFlickrChrono(this.model.toJSON()));
      return this;
    }
   });
  // The Application
  // ---------------

  // Create our global collection.
  window.sets = new Sets;
  window.years = new Years;
  
  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    //el: $(".main"),

    initialize: function() {
      $(".main").append("<p>Liste des laur&eacute;ats depuis 1989 par ann&eacute;e<br />(voir par <a href='#' id='sortToggle'>ordre alphab&eacute;tique</a>)</p><div id='laureats'></div>");
      sets.bind('add',   this.addOne, this);
      sets.bind('all',   this.addAll, this);
      sets.fetch();
      years.parse(sets.toJSON());
      this.sortToggle();
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(set) {
      var view = new SetView({model: set});
      this.$("#alpha").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAll: function() {
      $("#laureats").append("<ul id='alpha'></ul>");
      sets.each(this.addOne);
    },

    // Add a single tweet item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOneYear: function(year) {
      var view = new YearView({model: year});
      this.$("#laureats").append(view.render().el);
    },

    // Add all items in the collection at once.
    addAllYears: function() {
      years.add(_.map(_.toArray(_.groupBy(sets.toJSON(),'year')), function(e){return {laureats:e}}));
      years.each(this.addOneYear);
    },

    sortToggle: function(){
      $("#laureats").empty();
      if (window.alphabetical){
        $("#sortToggle").html('ordre alphab&eacute;tique');
        window.alphabetical = false;
        //sets.comparator = function(set){
        //    return -set.get('year');
        //};
        this.addAllYears();
      }else{
        $("#sortToggle").html('ordre chronologique');
        window.alphabetical = true;
        //sets.comparator = function(set){
        //    return set.get('artist');
        //};
        this.addAll();
      }
      //sets.sort();
      //this.addAll();
    },
  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

  $("#sortToggle").bind('click', function(){
    App.sortToggle();
  });
});
