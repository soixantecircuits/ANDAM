<?php
$wp_media_access = new WPAlchemy_MediaAccess();
$blocshome_mb = new WPAlchemy_MetaBox(array
(
	'id' => '_blocshome',
	'title' => 'Blocs Home',
	'types' => array('home'), 
	'template' => get_stylesheet_directory() . '/metaboxes/blocshome-meta.php',
));
global $blocshome_mb;
/* eof */