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
	<section id="infos">
	<?
	$postid = get_the_ID();
	$my_lang = qtrans_getLanguage();
	// texte article //
	global $textarea_mb;
	$textsupp = $textarea_mb->the_meta();
	$inscript = simple_fields_get_post_group_values($postid, "téléchargement", true, 2);
	$inscriptfile = wp_get_attachment_url(trad_customfield2( $inscript[0], "fichier", $my_lang ));
	if (!empty($inscriptfile)) {
	?>
		<p><a target="_blank" href="<? echo $inscriptfile; ?>"><? echo trad_customfield2( $inscript[0], "intitulé", $my_lang ); ?></a></p>
	<? } ?>
	<? the_content(); ?>
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

		<ul id="partenaires_particuliers">
			<? 			
				$tabinfos = simple_fields_get_post_group_values($postid, "partenaires particuliers", true, 2);				
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
	 // text supp (crédits & mentions légales) //
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
<?php endwhile; // end of the loop. ?>
<?php endif; ?>
			
<?php get_footer(); ?>