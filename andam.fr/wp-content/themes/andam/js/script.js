//(c) Soixante circuits 2011
$(document).ready(function() {
	if ($('#localbgdurl').length > 0 ) {
		var bgdurl = $('#localbgdurl img').attr('src');
		$.backstretch(bgdurl, {speed: 1000});
	}
	
	$(".main").fadeIn('slow');	
});