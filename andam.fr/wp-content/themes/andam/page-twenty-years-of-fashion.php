<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
 */
get_header(); ?>
<?
$my_lang = qtrans_getLanguage();
// texte article //
global $textarea_mb;
$article = $textarea_mb->the_meta();
?>
<article>
<? 
// facebook //
$my_fblb = do_shortcode("[fb Locale=".__('[:fr]fr_FR[:en]en_US')."]");
$lecontenu = str_replace("[fb]", $my_fblb, $post->post_content);
?>
<section>
<? echo wpautop($lecontenu); ?>
</section>
</article>
<div id="localbgdurl" style="display:none">
	<?
	$mybgd = simple_fields_get_post_group_values($post->ID, "image de fond", true, 2);
	$mybgdurl = urldecode(wp_get_attachment_url($mybgd[0]['fichier']));
	?>
	<img src="<? echo $mybgdurl; ?>"/>
</div>
<?php get_footer(); ?>
