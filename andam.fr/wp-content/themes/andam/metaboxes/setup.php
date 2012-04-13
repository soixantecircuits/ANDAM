<?php

include_once WP_CONTENT_DIR . '/wpalchemy/MetaBox.php';
include_once WP_CONTENT_DIR . '/wpalchemy/MediaAccess.php';
// global styles for the meta boxes
//if (is_admin()) wp_enqueue_style('wpalchemy-metabox', get_stylesheet_directory_uri() . '/metaboxes/meta.css');
// include css to help style our custom meta boxes
if (is_admin()) { wp_enqueue_style('wpalchemy-metabox', get_stylesheet_directory_uri() . '/metaboxes/meta.css');
					wp_enqueue_script('jquery-ui-sortable');
					wp_enqueue_script('jquery-ui-core');
				}
/* eof */