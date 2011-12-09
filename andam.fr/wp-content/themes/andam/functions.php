<?php
/**
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
*/
// remove version info from head and feeds (http://digwp.com/2009/07/remove-wordpress-version-number/)
function complete_version_removal() {
	return '';
}
add_filter('the_generator', 'complete_version_removal');
add_filter('show_admin_bar','__return_false');

// fonction de traduction des metadonnées //
function trad_customfield2 ($tab, $field) {
	$lang = qtrans_getLanguage();	
		if ($lang == "fr") {
			return $tab[$field."_fr"];
		} else {
			if(empty($tab[$field.'_en'])) {
				return $tab[$field."_fr"];
			} else {
				return $tab[$field."_en"];
			}
		};
}

// ajout de metaboxes //
include_once 'metaboxes/setup.php';
include_once 'metaboxes/textarea-spec.php';

// initialise le wysiwig //
function custom_options( $opt ) {
	//print_r($opt);
	//format drop down list
	//bold,italic,strikethrough,|,bullist,numlist,blockquote,|,justifyleft,justifycenter,justifyright,|,link,unlink,wp_more,|,spellchecker,fullscreen,wp_adv
	$opt['theme_advanced_buttons1'] = 'bold, italic, link, unlink, spellchecker, underline, pastetext, pasteword, removeformat, charmap, undo, redo';
	$opt['theme_advanced_buttons2'] = '';
	return $opt;
}
add_filter('tiny_mce_before_init', 'custom_options');
?>