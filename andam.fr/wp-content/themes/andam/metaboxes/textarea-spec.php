<?php

$custom_metabox = $textarea_mb = new WPAlchemy_MetaBox(array
(
	'id' => '_texte_secondaire',
	'title' => 'Texte secondaire',
	'types' => array('presentation'), 
	'template' => get_stylesheet_directory() . '/metaboxes/textarea-meta.php',
));

/* eof */