<?php
/**
* The Header for our theme.
*
* Displays all of the <head> section and everything up till <div id="main">
*
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
?><!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<meta name="description" content="<?php bloginfo( 'description' ); ?>">
	<meta name="author" content="soixantecircuits / vacuumRandom">	
	<link type="text/plain" rel="author" href="/humans.txt" />
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="<?php bloginfo( 'template_directory' ); ?>/webfont/stylesheet.css" />
	<link rel="stylesheet" href="<?= get_template_directory_uri(); ?>/style.css" />
	<script src="<?= get_template_directory_uri(); ?>/js/libs/modernizr-2.0.6.min.js"></script>
	<?php $mycat = $post->post_name;?>
    <?php wp_enqueue_script( "$mycat", get_bloginfo('template_directory') .'/js/'.$mycat.'.js', array('jquery'), null, true ); ?> 
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
		<header role="banner">
		<div id="head_content">	
			<div id="uberalles">
				<div id="logo" class="clearfix">			
					<h1>ANDAM<br />FASHION AWARDS<br />2012</h1>			
				</div>
				
			</div>	
		</div>			
	</header>
	
<div id="main">
	<? echo get_sidebar(); ?>	