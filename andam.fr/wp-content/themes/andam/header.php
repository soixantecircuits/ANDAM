<?php
/**
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
	<title><?php is_front_page() ? bloginfo('description') : wp_title(''); ?> | <?php bloginfo('name'); ?></title>
	<meta name="description" content="<?php bloginfo( 'description' ); ?>">
	<meta name="author" content="Pierre-François Letué / Soixante circuits / vacuumRandom">	
	<link type="text/plain" rel="author" href="/humans.txt" />
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<meta name="viewport" content="width=device-width">
	<? $malangue = qtrans_getLanguage(); ?>
	<link rel="stylesheet" href="<?php bloginfo( 'template_directory' ); ?>/webfont/stylesheet<? echo "_".$malangue; ?>.css" />
	<link rel="stylesheet" href="<?= get_template_directory_uri(); ?>/style.css" />
	<script src="<?= get_template_directory_uri(); ?>/js/libs/modernizr-2.0.6.min.js"></script>

    <?php 
    $mycat = $post->post_name;
    if ($mycat != "contest" /*&& $mycat != "twenty-years-of-fashion"*/) {
    	wp_enqueue_script( "$mycat", get_bloginfo('template_directory') .'/js/'.$mycat.'.js', array('jquery'), null, true );
	} 
    ?> 
	<?php wp_head(); ?>
</head>
<body id="<? echo $post->post_name; ?>" <?php body_class(); ?>>
<? if ($malangue == "en") { ?>
<!--[if lt IE 7]> <div style=' clear: both; height: 59px; padding:0 0 0 15px; position: relative;'> <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode"><img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." /></a></div> <![endif]-->
<? } else { ?>
<!--[if lt IE 7]> <div style=' clear: both; height: 59px; padding:0 0 0 15px; position: relative;'> <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode"><img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0024_french.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." /></a></div> <![endif]-->
<? } ?>
	<header id="header" role="banner">
		<div id="head_content">
				<div id="logo">	
					<? if ($post->post_name == "archives" || $post->post_name == "twenty-years-of-fashion "|| $post->post_name == "association") { $subtitle = "paris"; } else {$subtitle = date("Y");}?>	
					<h1><a href="<? echo get_home_url();?>"><span id="mot1">ANDAM</span><br /><span id="mot2">FASHION&nbsp;AWARD</span><br /><span id="mot3"><? echo $subtitle; ?></span></a></h1>			
					<? echo get_sidebar(); ?>
				</div>		
		</div>			
	</header>
<div id="enveloppe">	
<div id="main">
	
