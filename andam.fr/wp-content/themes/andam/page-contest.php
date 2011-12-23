<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
get_header(); ?>

<article>
	<?php $my_fblb = do_shortcode("[fb Locale=".__('[:fr]fr_FR[:en]en_US')."]"); ?>
	<section id="infos">
	<?
	$postid = get_the_ID();
	$my_lang = qtrans_getLanguage();
	// texte article //
	global $textarea_mb;
	$textsupp = $textarea_mb->the_meta();
	$inscript = simple_fields_get_post_group_values($postid, "inscription", true, 2);
	$inscriptfile = wp_get_attachment_url($inscript[0]['fichier']);
	// inserer fb button //
	$lecontenu = str_replace("[fb]", $my_fblb, $post->post_content);
	?>
		<p><a target="_blank" href="<? echo $inscriptfile; ?>"><? _e('[:fr]Télécharger le dossier d\'inscription[:en]Download registration file'); ?></a></p>
	<? echo wpautop($lecontenu); ?>
	<? print_r(get_the_content()); ?>
		<ul id="partenaires">
			<? 			
				$tabinfos = simple_fields_get_post_group_values($postid, "partenaires", true, 2);				
				foreach ($tabinfos as $cle=>$value) {
					if(!empty($value['image logo'])) {
					 	$imageurl = wp_get_attachment_url($value['image logo']);
					} else {
						$imageurl = $value['logo'];
					}
				?>
				<li><img src="<? echo $imageurl; ?>" width="16"/><a target="_blank" href="<? echo $value['url']; ?>"><span><? echo $value['nom']; ?></span></a></li>				
				<? };
			?>
		</ul>

	</section>
	
	<section id="creditsmentions">
<?
	 // text supp //
	 $my_textsupp =  trad_customfield2( $textsupp, "extra_content", $my_lang ); 
	 echo wpautop($my_textsupp);
?>		

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