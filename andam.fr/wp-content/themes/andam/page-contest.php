<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
get_header(); ?>

<article>
	<section id="infos">
	<?
	$postid = get_the_ID();
	$my_lang = qtrans_getLanguage();
	// texte article //
	global $textarea_mb;
	$textsupp = $textarea_mb->the_meta();
	$inscript = simple_fields_get_post_group_values($postid, "inscription", true, 2);
	$inscriptfile = wp_get_attachment_url($inscript[0]['fichier']);
	?>
		<p><a target="_blank" href="<? echo $inscriptfile; ?>"><? _e('[:fr]Télécharger le dossier d\'inscription[:en]Download registration file'); ?></a></p>
	<? echo wpautop($post->post_content); ?>
	<p>	<iframe id="facebook-like" src="http://www.facebook.com/plugins/like.php?locale=<? _e("[:fr]fr_FR[:en]en_US"); ?>&amp;app_id=168284213234217&amp;href=<? echo get_permalink($postid); ?>&amp;send=false&amp;layout=button_count&amp;width=91&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=verdana" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:91px; height:21px; vertical-align:bottom;" allowTransparency="true"></iframe>
	</p>
	</section>
	
	<section id="partenaires">
<?
	// text supp //
	 $my_textsupp =  trad_customfield2( $textsupp, "extra_content", $my_lang ); 
	 echo wpautop($my_textsupp);
?>		
		<ul>
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
</article>
			
<?php get_footer(); ?>