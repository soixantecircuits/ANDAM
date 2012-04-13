//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.flickruser = '72610704@N08';//'71927167@N03';
  //window.flickruser = '78720565@N03'; //thomas arassette
  window.flickrapikey= 'f6aee2b38c5a21562225b5d232205b95'; 
  
  window.en = { list:'Winners',
                chrono:'sort by date',
                alpha: 'sort by name',
                from:'from <a href="http://www.flickr.com/' + flickruser + '" target="_blank">Flickr</a>',
                loading:'Loading'
              };
  window.fr = { list:'Laur&eacute;ats',
                chrono:'voir la liste chronologique',
                alpha: 'voir la liste alphab&eacute;tique',
                from:'de <a href="http://www.flickr.com/' + flickruser + '" target="_blank">Flickr</a>',
                loading:'Chargement'
                };
  window.lang = (wp_var.lang == 'fr')? window.fr : window.en;


  Handlebars.registerHelper('onetime', function(year) {
            if (year!= window.year) {
              window.year = year;
              return "<h2 class='year'>"+year+"</h2>";
            }
            return "";
  });

  // Template
  // --------
	var	srctmpl = "{{#chronolaureats}}" +
             "<ul>"+
              "<h2><strong>{{year}}</strong></h2>" +
              "{{#laureats}}" +
                  "<li><a href='http://www.flickr.com/photos/" + window.flickruser +
                  "/sets/{{id}}/' target='_blank'>{{artist}}</a></li>" +
              "{{/laureats}}" +
             "</ul>" + 
            "{{/chronolaureats}}";
  window.tmplChrono = Handlebars.compile(srctmpl);
  srctmpl = "{{#alphalaureats}}" +
             "<ul>" +
              "{{#laureats}}" +
                  "<li><a href='http://www.flickr.com/photos/" + window.flickruser +
                  "/sets/{{id}}/' target='_blank'><span class='alphac'>{{artist}}, {{year}}</span></a></li>" +
              "{{/laureats}}" +
             "</ul>" + 
            "{{/alphalaureats}}";
  window.tmplAlpha = Handlebars.compile(srctmpl);
 
 
  
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
    removeNotLaureats: function(){
        this.remove(this.reject(function(model){
        var title = model.get('title')._content;
        var match = title.match(/[,.;:] ?(19|20)\d\d/);
        if (match){
          return true;
        }
        return false;
        }));
    }

  });

  // View
  // --------------

  // The Application
  // ---------------

  // Create our global collection.
  window.sets = new Sets;
  
  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    //el: $("#main"),

    initialize: function() {
      $("#main").append("<div class='loading'>" + lang.loading + "</div>");
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
      sets.bind('all', this.render, this);
      sets.fetch();
    },
    render: function(){
      sets.removeNotLaureats();
      clearInterval(window.loadingtimer);
      $("#main").empty();      
      $("#main").append("<p>" + lang.list + " (<a href='#' id='sortToggle'>" + lang.alpha +"</a>)</p><div id='laureats'></div>");
      $("#main").append("<div class='from'>("+lang.from+")</div>");
      $("#sortToggle").bind('click', function(){
        App.sortToggle();
      });
      this.viewChrono();
      this.randomBackgroundImage();
    },
    randomBackgroundImage: function(){
      var set = sets.at(Math.floor(Math.random() * sets.length));
      $.ajax({
        url:"http://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&format=json&api_key="
            +window.flickrapikey + "&user_id=" + window.flickruser + "&photoset_id=" + set.get('id'),
            dataType: 'JSONP',
            jsonp:  "jsoncallback", 
            success: function(pictures){
              var picture = pictures.photoset.photo[Math.floor(Math.random() * pictures.photoset.photo.length)];
              $.ajax({
                url:"http://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key="
                    +window.flickrapikey + "&user_id=" + window.flickruser + "&photo_id=" + picture.id,
                    dataType: 'JSONP',
                    jsonp:  "jsoncallback", 
                    success: function(sizes){
                      var sortedSizes = _.sortBy(sizes.sizes.size, function(size){return -size.width*size.height;});
                      var image = _.find(sortedSizes, function(image){
                          return image.width * image.height < 800*600;});
                      //var image = _.find(sizes.sizes.size, function(size){return size.label == 'Original';});
                      $.backstretch(image.source, {speed: 1000});
                    },
                    error: function(){
                      console.log('couldnt retrieve background image from flickr');
                    }
               });
            },
            error: function(){
              console.log('couldnt retrieve background image from flickr');
            }
       });
    },
    viewAlpha: function(){
      var alphajs = _.map(_.toArray(_.groupBy(_.sortBy(sets.toJSON(),function(laureat){
         return laureat.artist}), function(laureat){
             return laureat.artist.substring(0,1);})),
            function(e){return {laureats:e}});
      alphajs = {alphalaureats:alphajs};
      $("#laureats").append(window.tmplAlpha(alphajs));
    },
    
    viewChrono: function(){
      var chronojs = _.sortBy(_.map(_.toArray(_.groupBy(sets.toJSON(), function(laureat){
                                                return laureat.year;})), function(e){
                               return {year:e[0].year,laureats:e}}), function(laureats){
                      return laureats.year});
      chronojs = {chronolaureats:chronojs};
      $("#laureats").append(window.tmplChrono(chronojs));
    },
    
    sortToggle: function(){
      $("#laureats").empty();
      if (window.alphabetical){
        $("#sortToggle").html(lang.alpha);
        window.alphabetical = false;
        this.viewChrono();
      }else{
        $("#sortToggle").html(lang.chrono);
        window.alphabetical = true;
        this.viewAlpha();
      }
    }
  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
