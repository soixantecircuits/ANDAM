//(c) Soixante circuits 2011
$(document).ready(function() {
	if ($('#localbgdurl').length > 0 ) {
		var bgdurl = $('#localbgdurl img').attr('src');
		$.backstretch(bgdurl, {speed: 1000});
	}
	
	$("#main").fadeIn('slow');
		
	 
	 $("ul#partenaires li a.btn").click(function(){
	 	var that = this;
	 	
	 	$('ul#partenaires li div.unfold').animate({
	 		height:0,
	 		complete: function(){ }
	 	});
	 	unFold(that);
	 	return false;
	 });
	 
	 
	 function unFold(e) {
	 	h = $(e).parent().find('div p').innerHeight();
	 	ctn_height = $(e).parent().find('div').height();
	 	//$("ul#partenaires li div.unfold").animate({ height: 0});
	 	$('ul#partenaires li div.unfold').attr('class', 'fold');
	 	if ((ctn_height) == 0) {
			$(e).parent().find("div").animate({
	            height: h,
	        },{ duration:300,
	        	complete: function(){ $(this).attr('class', 'unfold'); }
	        });	 		
	 	} else {
		   $(e).parent().find("div").animate({
		   	height: 0
		   	}, {duration: 300,
		   		complete: function(){ $(this).attr('class', 'fold')}
		   	});	 		
	 	}
	 }
	 
	 
	 
});