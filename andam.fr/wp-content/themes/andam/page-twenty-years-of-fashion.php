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
<?php if(have_posts()) : ?>
	<?php while(have_posts()) : the_post(); ?> 
<article>
	<section>
	<? the_content(); ?>
	</section>
</article>
<?php endwhile; // end of the loop. ?>
<?php endif; ?>
<div id="localbgdurl" style="display:none">
	<?
	$mybgd = simple_fields_get_post_group_values($post->ID, "image de fond", true, 2);
	$mybgdurl = urldecode(wp_get_attachment_url($mybgd[0]['fichier']));
	?>
	<img src="<? echo $mybgdurl; ?>"/>
</div>
<?php get_footer(); ?>
