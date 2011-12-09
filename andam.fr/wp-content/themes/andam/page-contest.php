<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
get_header(); ?>

<article>

<? echo wpautop($post->post_content); ?>

	<section id="partenaires">
		<ul>
			<? 
				$postid = get_the_ID();
				$tabinfos = simple_fields_get_post_group_values($postid, "partenaires", true, 2);
				foreach ($tabinfos as $cle=>$value) {
					$imageinfos = wp_get_attachment_image_src($value['logo'], 'thumbnail');
				?>
				<li><img src="<? echo $imageinfos[0]?>" width="<? echo $imageinfos[1]; ?>" height="<? echo $imageinfos[2]; ?>" /><a><span><? echo $value['nom']; ?></span></a></li>
					
				<? };
			?>
		</ul>
	</section>

</article>
			
<?php get_footer(); ?>