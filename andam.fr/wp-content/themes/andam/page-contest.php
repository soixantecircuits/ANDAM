<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
get_header(); ?>

<article>

<?
$postid = get_the_ID();
$inscript = simple_fields_get_post_group_values($postid, "inscription", true, 2);
$inscriptfile = wp_get_attachment_url($inscript[0]['fichier']);
?>
<p><a target="_blank" href="<? echo $inscriptfile; ?>"><? _e('[:fr]Télécharger le dossier d\'inscription[:en]Download registration file'); ?></a></p>
<? echo wpautop($post->post_content); ?>
	<section id="partenaires">
		<ul>
			<? 
				
				$tabinfos = simple_fields_get_post_group_values($postid, "partenaires", true, 2);
				
				
				foreach ($tabinfos as $cle=>$value) {
					$imageurl = $value['logo'];
				?>
				<li><img src="<? echo $imageurl; ?>" width="16"/><a target="_blank" href="<? echo $value['url']; ?>"><span><? echo $value['nom']; ?></span></a></li>
					
				<? };
			?>
		</ul>
	</section>

</article>
			
<?php get_footer(); ?>