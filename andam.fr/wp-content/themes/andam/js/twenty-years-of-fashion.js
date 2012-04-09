//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.flickruser = '72610704@N08'; //ANDAM
  //window.flickruser = '71927167@N03'; //john doe
  //window.flickruser = '78720565@N03'; //thomas arassette
  window.flickrapikey= 'f6aee2b38c5a21562225b5d232205b95'; 
  
  window.en = { loading:'Loading'
              };
  window.fr = { loading:'Chargement'
                };
  window.lang = (wp_var.lang == 'fr')? window.fr : window.en;


  //  Model
  // ----------

  window.Photo = Backbone.Model.extend({});
  window.Set = Backbone.Model.extend({
    });

  //  Collection
  // ---------------
  window.Sets = Backbone.Collection.extend({

    model: Set,

    url:"http://www.flickr.com/services/rest/?method=flickr.photosets.getList&format=json&api_key="
        + window.flickrapikey + "&user_id=" + window.flickruser,
    
    sync: function(method, model, options){  
        options.timeout = 10000;  
        options.dataType = "jsonp";
        options.jsonp = "jsoncallback"; 
        return Backbone.sync(method, model, options);  
    },

    parse: function(response) {
        return response.photosets.photoset;
    },

    removeNotEvents: function(){
        this.remove(this.reject(function(model){
        var title = model.get('title')._content;
        var match = title.match(/[,.;:] ?\d\d\/(19|20)\d\d/);
        if (match){
          return true;
        }
        return false;
        }));
    }
  });

  window.Photos = Backbone.Collection.extend({

    model: Photo,

    setId: 0,
 
    sync: function(method, model, options){  
        this.url = "http://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&format=json&api_key="
            +window.flickrapikey + "&user_id=" + window.flickruser + "&photoset_id=" + this.setId,
        options.timeout = 10000;  
        options.dataType = "jsonp";
        options.jsonp = "jsoncallback"; 
        return Backbone.sync(method, model, options);  
    },

    parse: function(response) {
        return response.photoset.photo;
    },

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
      $("#main").prepend("<div class='loading'>" + lang.loading + "</div>");
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
      sets.bind('reset', this.render, this);
      sets.fetch();
    },
    render: function(){
      sets.removeNotEvents();
      clearInterval(window.loadingtimer);
      $(".loading").empty();      
      $("#main").prepend("<div id='photos'>" + 
        "<a href='#' id='photolink' target='_blank'><img id='photo' src=''></img></a></p>" +
        "<p><a href='#' id='precedent'>&lsaquo;</a>" + 
        "<a href='#' id='albumlink'><div id='legende'></div></a>" +
        "<a href='#' id='suivant'>&rsaquo;</a>" +
        "</div>");
      $("#precedent").bind('click', function(){
        App.previous();
      });
      $("#suivant").bind('click', function(){
        App.next();
      });
      i_set = 0;
      myset = sets.at(i_set);
      photos = new Photos;
      photos.setId = myset.get('id');
      photos.bind('all', this.renderSet, this);
      photos.fetch();
    },
    renderSet: function(){
      $("#legende").empty();
      $("#legende").append(myset.get('title')._content);
      i_photo = 0;
      var photo = photos.at(i_photo);
      this.fetchPhoto(photo);
    },
    fetchPhoto:function(picture){
              $.ajax({
                url:"http://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key="
                    +window.flickrapikey + "&user_id=" + window.flickruser + "&photo_id=" + picture.get('id'),
                    dataType: 'JSONP',
                    jsonp:  "jsoncallback", 
                    success: this.showPhoto,
                    error: function(){
                      console.log('couldnt retrieve background image from flickr');
                    }
               });
    },
    showPhoto: function(response){
      var sortedSizes = _.sortBy(response.sizes.size, function(size){return -size.width*size.height;});
      var image = _.find(sortedSizes, function(image){
          return image.width * image.height < 800*600;});
      $("#photo").attr("src", image.source);
      $("#photolink").attr("href", "http://www.flickr.com/photos/" + window.flickruser + "/" + photos.at(i_photo).get('id'));
    },

    next:function(){
      //check if it's the last photo
      if (i_photo == photos.length - 1){
        if (i_set == sets.length - 1){
          return;
        }
        i_set++;
        myset = sets.at(i_set);
        photos.setId = myset.get('id');
        photos.fetch();
        return;
      }
      else {
        i_photo++;
        var photo = photos.at(i_photo);
        this.fetchPhoto(photo);
      }
    },
    previous:function(){
      //check if it's the first photo
      if (i_photo == 0){
        if (i_set == 0){
          return;
        }
        i_set--;
        myset = sets.at(i_set);
        photos.setId = myset.get('id');
        photos.fetch();
        return;
      }
      else {
        i_photo--;
        var photo = photos.at(i_photo);
        this.fetchPhoto(photo);
      }
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
                      //$.backstretch(image.source, {speed: 1000});
                      //$("#img").append(image.source);
                      var src = $("#photo").attr("src").match(/[^\.]+/) + image.source;
                      $("#photo").attr("src", image.source);
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
