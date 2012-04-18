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

      $("#main").prepend("<div id='photos' class='suivant'><img id='hack' src='"+wp_var.themeroot+"/images/hack.gif'/></div>" + 
        "<nav id='gallery'><a href='#' id='albumprecedent' title='previous album'>&laquo;</a><a href='#' title='previous picture' id='precedent'>&lsaquo;</a>" + 
        "<figcaption id='legende'><a href='#' id='albumlink' title='flickr' target='_blank'></a></figcaption>" +
        "<a href='#' id='suivant' title='next picture' class='suivant'>&rsaquo;</a><a href='#' title='next album' id='albumsuivant'>&raquo;</a></nav>");
		/*
      $("#precedent").bind('click', function(){
        App.previous();
        return false;
      });
   
      $("#photolink").bind('click', function(){
        App.next();
        return false;
      });
 
      $("#suivant").bind('click', function(){
        App.next();
        return false;
      });
      */
      $("#albumprecedent").bind('click', function(){
        App.previousAlbum();
        return false;
      });
      $("#albumsuivant").bind('click', function(){
        App.nextAlbum();
        return false;
      });
   			
   		    $("#photos").live('mouseover', function(){
   		    	elt = $(this).find('figure').first().attr('class');
   		    	//alert('over');
		      	App.pauseRollover(elt);
		      	return false;
		    });
		    
   		    $("#photos").live('mouseout', function(){
   		    	elt = $(this).find('figure').first().attr('class');
		      	App.resumeRollout(elt);
		      	return false;
		    });	

      i_set = 0;
      myset = sets.at(i_set);
      photos = new Photos;
      photos.setId = myset.get('id');
      photos.bind('all', this.renderSet, this);
      photos.fetch();
    },
    renderSet: function(){
      $("#albumlink").empty();
      $("#albumlink").append(myset.get('title')._content);
      $("#albumlink").attr("href", "http://www.flickr.com/photos/" + window.flickruser + "/sets/" + myset.get('id'));
      i_photo = 0;
      /*var photo = photos.at(i_photo);
      this.fetchPhoto(photo);*/
    $("#photos figure#spinner").remove();
    $("#photos").prepend("<figure id='spinner'><img src='"+wp_var.themeroot+"/images/loader.gif'/></figure>");
    $("#photos figure.pic").remove();
    
    photos.forEach(this.fetchPhoto, this);

	$.fn.cycle.transitions.my_truc = function($cont, $slides, opts) {		
	    opts.fxFn = function(curr, next, opts, after) {                 
	        $(curr).fadeOut(opts.fadeSpeed, function() {
	            $(next).fadeIn(opts.fadeSpeed, function() {
	                after();              
	            });
	            // on centre l'image //
	            elt = $(next).find('img');
	            cntw = $(next).width();
	            picw = $(next).find('img').width();
	            cnth = $(next).height();
	            pich = $(next).find('img').height();
	            /*------------------------------------*/	
	            marg_left = (((cntw-picw)/2)*100)/cntw;	
	            marg_top = (((cnth-pich)/2)*100)/cnth;
	            /*------------------------------------*/	        
	            $(elt).css({marginLeft: marg_left+'%'});
	            $(elt).css({marginTop: marg_top+'%'});
	            /*------------------------------------*/		           
	        });
	        
	    };
	};
     $("#photos").cycle({
        slideExpr: 'figure',
        fx: 'my_truc', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
        after: onAfter,
        next: '.suivant, #suivant',
        prev: '#precedent',
        pause : 0,       
        fit : 1,
        slideResize: 1,
        width : '100%',
        height: '100%',
        timeout: 1000,
        speed: 1000,
      }).touchwipe({
    wipeLeft: function() {
        $('#precedent').click();
    },
    wipeRight: function() {
	     $('#suivant').click();
    }
	});

	function onAfter (currSlideElement, nextSlideElement, options, forwardFlag) {
	    //si le premier elt et le spinner alors on le supprime //
	    if (currSlideElement == $('figure#spinner')[0] && nextSlideElement == $('figure')[1]) {
   			$("#spinner").remove();			
	    }	    
	}
	
    },
    fetchPhoto:function(picture){
      var dataurl = "http://www.flickr.com/photos/" + window.flickruser + "/" + picture.get('id');
      var photourl = "http://farm"+picture.get('farm')+".staticflickr.com/"+picture.get('server')+"/"+picture.get('id')+"_"+picture.get('secret')+"_z.jpg";
     $("<figure class='pic'><img class='photo' src='" + photourl + "' data-caption='" + picture.get('title') + "' data-url='"+ dataurl + "'></img></figure>").insertBefore("#photos #hack");
      /*
      $.ajax({
        url:"http://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key="
            +window.flickrapikey + "&user_id=" + window.flickruser + "&photo_id=" + picture.get('id'),
            dataType: 'JSONP',
            jsonp:  "jsoncallback", 
            success: this.showPhoto,
            error: function(){
              console.log('couldnt retrieve image from flickr');
            }
       });
       */
    },
    
    pauseRollover : function(elt) {
    	if (elt == 'pic') {
    		$('#photos').focus();  		
    		$('#photos').cycle('pause');
    	}
    },
    
    resumeRollout : function(elt) {
    	if (elt == 'pic') {
    		$('#photos').cycle('resume');
    	}
    	
    },
    
    showPhoto: function(response){
      var sortedSizes = _.sortBy(response.sizes.size, function(size){return -size.width*size.height;});
      var image = _.find(sortedSizes, function(image){
          return image.width * image.height < 800*600;});
    },

    nextAlbum:function(){
        if (i_set == sets.length - 1){
          return;
        }

        $("#photos").cycle('stop');
        i_set++;
        myset = sets.at(i_set);
        photos.setId = myset.get('id');
        photos.fetch();
        return;
    },
    previousAlbum:function(){
        if (i_set == 0){
          return;
        }

       $("#photos").cycle('stop');  
        i_set--;
        myset = sets.at(i_set);
        photos.setId = myset.get('id');
        photos.fetch();
        return;

    },
    next:function(){
      //check if it's the last photo
      if (i_photo == photos.length - 1){
         //nextAlbum();  
         //$('a#suivant').toggleClass('inactif');
      } else {
        i_photo++;
        var photo = photos.at(i_photo);
        this.fetchPhoto(photo);
      }
    },
    previous:function(){
      //check if it's the first photo
      if (i_photo == 0){
        //previousAlbum();
        //$('a#suivant').toggleClass('inactif');  
      }  
      else {
        i_photo--;
        var photo = photos.at(i_photo);
        this.fetchPhoto(photo);
      }
      
    },
  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
