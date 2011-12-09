<?php

$custom_metabox = $textarea_mb = new WPAlchemy_MetaBox(array
(
	'id' => '_article',
	'title' => 'article', 
	'include_post_id' => array(51),
	'template' => get_stylesheet_directory() . '/metaboxes/textarea-meta.php',
));

/* eof */