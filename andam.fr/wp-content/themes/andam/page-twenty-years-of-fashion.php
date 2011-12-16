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
<?php get_footer(); ?>
