<?php

$custom_metabox = $textarea_mb = new WPAlchemy_MetaBox(array
(
	'id' => '_textesupplementaire',
	'title' => 'texte supplémentaire', 
	'include_post_id' => array(2),
	'template' => get_stylesheet_directory() . '/metaboxes/textarea-meta.php',
));

/* eof */