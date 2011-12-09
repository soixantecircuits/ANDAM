<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
get_header(); ?>

<article>

<? echo wpautop($post->post_content); ?>

</article>
			
<?php get_footer(); ?>