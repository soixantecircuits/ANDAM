<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
 */
get_header(); ?>
<?php if(have_posts()) : ?>
	<?php while(have_posts()) : the_post(); ?>  
<article>
	<style type="text/css" media="screen">
		#header { display:none; }
		#enveloppe, #main { margin: 0; padding: 0;}
	</style>
	<? the_content(); 
	$postid = get_the_ID();
	$my_lang = qtrans_getLanguage();	
	$inscript = simple_fields_get_post_group_values($postid, "téléchargement", true, 2);
	$inscriptfile = wp_get_attachment_url(trad_customfield2( $inscript[0], "fichier", $my_lang ));
	if (!empty($inscriptfile)) {
	?>
		<p><a target="_blank" href="<? echo $inscriptfile; ?>"><? echo trad_customfield2( $inscript[0], "intitulé", $my_lang ); ?></a></p>
	<? } ?>
</article>
<?php endwhile; // end of the loop. ?>
<?php endif; ?>
<?php get_footer(); ?>
