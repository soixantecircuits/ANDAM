<?php
/**
* The template for displaying the footer.
*
* Contains the closing of the main section and all content after.
*
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
?>
</div><!-- main container -->

<? 
$malangue = qtrans_getLanguage();
$tab_vars = array("mylang" => $malangue);																			
wp_localize_script (  "$post->post_name" , 'my_vars' , $tab_vars);
?>
<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
<script src="http://www.google.com/jsapi?key=ABQIAAAAMZtLdEEp8B9FKLJ2F8KdCxS4Hg7y3Ifan2q66sLq2B03Ev_aTRR7sCCsXgqNdVAEf0Jos8tmw-1Gmg"></script>
<script type="text/javascript">
  google.load("webfont", "1");
  google.setOnLoadCallback(function() {
    WebFont.load({
      google: {
        families: [ 'PT+Sans:400,700,400italic,700italic:latin' ]
      }});
  });
</script>
<script>google.load('jquery', '1.6')</script>
<script>!window.jQuery && document.write(unescape('%3Cscript src="<?= get_template_directory_uri(); ?>/js/libs/jquery-1.6.2.min.js"%3E%3C/script%3E'))</script>
<script src="<?= get_template_directory_uri(); ?>/js/libs/json2.js"></script>
<script src="<?= get_template_directory_uri(); ?>/js/libs/handlebars-1.0.0.beta.4.js"></script>
<script src="<?= get_template_directory_uri(); ?>/js/libs/underscore-1.2.2.js"></script>
<script src="<?= get_template_directory_uri(); ?>/js/libs/backbone.js"></script>
<script src="<?= get_template_directory_uri(); ?>/js/libs/moment.min.js"></script>
<script src="<?= get_template_directory_uri(); ?>/js/libs/wiki2html.js"></script>
<!-- scripts concatenated and minified via ant build script-->
<script src="<?= get_template_directory_uri(); ?>/js/plugins.js"></script>
<script src="<?= get_template_directory_uri(); ?>/js/script.js"></script>
<!-- end scripts-->

<!--<script>
	var _gaq=[['_setAccount','UA-25530657-1'],['_trackPageview']]; // Change UA-XXXXX-X to be your site's ID
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
	g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
</script>-->

<!--[if lt IE 7 ]>
	<script>google.load("chrome-frame", "1.0.2");</script>
	<script>window.attachEvent("onload",function(){CFInstall.check({mode:"overlay"})})</script>
<![endif]-->

<?php wp_footer(); ?>
</body>
</html>
