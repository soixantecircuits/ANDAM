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

// ajoute un shortcode pour l'ajout du bouton like
function fb_like( $atts, $content=null ){
/* Author: Nicholas P. Iler
 * URL: http://www.ilertech.com/2011/06/add-facebook-like-button-to-wordpress-3-0-with-a-simple-shortcode/
 */
    extract(shortcode_atts(array(
            'send' => 'false',
            'layout' => 'button_count',
            'show_faces' => 'true',
            'width' => '100px',
            'action' => 'like',
            'font' => '',
            'colorscheme' => 'light',
            'ref' => 'andamfr',
            'locale' => 'fr_FR',
            'appId' => '' // Put your AppId here 
    ), $atts));
 
    $fb_like_code = <<<HTML
        <div id="fb-root"></div><script src="http://connect.facebook.net/$locale/all.js#appId=$appId&amp;xfbml=1"></script><fb:like ref="$ref" href="$content" layout="$layout" colorscheme="$colorscheme" action="$action" send="$send" width="$width" show_faces="$show_faces" font="$font"></fb:like>
HTML;
 
    return $fb_like_code;
}
add_shortcode('fb', 'fb_like');

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
//include_once 'metaboxes/gallery-spec.php';


add_action( 'after_setup_theme', 'wpse3882_after_setup_theme' );
function wpse3882_after_setup_theme()
{
    add_editor_style();
}

add_filter('mce_buttons_2', 'wpse3882_mce_buttons_2');
function wpse3882_mce_buttons_2($buttons)
{
    array_unshift($buttons, 'styleselect');
    return $buttons;
}

// initialise le wysiwig //
function custom_options( $opt ) {
	//format drop down list
	//bold,italic,strikethrough,|,bullist,numlist,blockquote,|,justifyleft,justifycenter,justifyright,|,link,unlink,wp_more,|,spellchecker,fullscreen,wp_adv
	$opt['theme_advanced_buttons1'] = 'formatselect, bold, italic, link, unlink, spellchecker, underline, pastetext, pasteword, removeformat, charmap, undo, redo';
	$opt['theme_advanced_buttons2'] = '';

    $opt['theme_advanced_blockformats'] = 'p,h1,h2,h3,h4';

    // From http://tinymce.moxiecode.com/examples/example_24.php
    $style_formats = array(
        array('title' => 'Bold text', 'inline' => 'b'),
        array('title' => 'Red text', 'inline' => 'span', 'styles' => array('color' => '#ff0000')),
        array('title' => 'Red header', 'block' => 'h1', 'styles' => array('color' => '#ff0000')),
        array('title' => 'Example 1', 'inline' => 'span', 'classes' => 'example1'),
        array('title' => 'Example 2', 'inline' => 'span', 'classes' => 'example2'),
        array('title' => 'Table styles'),
        array('title' => 'Table row 1', 'selector' => 'tr', 'classes' => 'tablerow1'),
    );
    // Before 3.1 you needed a special trick to send this array to the configuration.
    // See this post history for previous versions.
    $opt['style_formats'] = json_encode( $style_formats );
	return $opt;
}
add_filter('tiny_mce_before_init', 'custom_options');
?>
