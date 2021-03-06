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
	 html { overflow-y: hidden }
		#header { display:none; }
		#enveloppe, #main { margin: 0; padding: 0;}
	</style>
	<? 
	$postid = get_the_ID();
	$image = simple_fields_get_post_group_values($postid, "image", true, 2); 
	if (!empty($image[0]["fichier"])) {
		$my_pic = wp_get_attachment_image_src( $image[0]["fichier"], "full");
	?>
	<figure>
		<img  src="<? echo $my_pic[0]; ?>" width="<? echo $my_pic[1]; ?>" height="<? echo $my_pic[2]; ?>" />
	</figure>
	<? } ?>
	<? the_content(); 
	
	$my_lang = qtrans_getLanguage();	
	$pub = simple_fields_get_post_group_values($postid, "téléchargement de la publication", true, 2);
	$nb_pub = count($pub);
	$mois = date("n");
	$annee = date("Y");
	?>
	<ul id="chapitres">
<?	
// si l'année en cours est supérieure ou égale à 2013 //
	if ($annee >= 2013) {
		$mois += 11+($annee-2012);
	}

	for($i=0; $i<$nb_pub; $i++) {		
		if (($i >= $mois-1) && ($i <= $mois-1)){		
	?>
		<li class="current_pub"><a target="_blank" href="<? echo wp_get_attachment_url($pub[$i]["fichier"]); ?>"><? echo $pub[$i]["intitulé"]; ?></a></li>
		<? } else if ($i >= $mois-1) { ?>
		<li class="futur_pub"><? echo $pub[$i]["intitulé"]; ?></li>
		<? } else { ?>
		<li class="passed_pub"><? echo $pub[$i]["intitulé"]; ?></li>
	<? } } ?>
	</ul>
</article>
<?php endwhile; // end of the loop. ?>
<?php endif; ?>
</div><!-- enveloppe -->
</div><!-- main container -->
</body>
</html>