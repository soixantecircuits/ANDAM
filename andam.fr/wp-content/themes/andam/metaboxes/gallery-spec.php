<?php
$wp_media_access = new WPAlchemy_MediaAccess();
$gallery_mb = new WPAlchemy_MetaBox(array
(
	'id' => '_gallery',
	'title' => 'Galerie d\'images',
	'include_post_id' => array(2),
	'template' => get_stylesheet_directory() . '/metaboxes/gallery-meta.php',
));
global $gallery_mb;
/* eof */