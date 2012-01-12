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
            'locale' => __('[:fr]fr_FR[:en]en_US'),
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
// Masquer les erreurs de connexion //
add_filter('login_errors',create_function('$a', "return null;"));

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

// gestion des colonnes d'index //
add_filter( 'manage_edit-page_columns', 'my_edit_page_columns' ) ;
function my_edit_page_columns( $columns ) {
	$columns = array(
		'cb' => '<input type="checkbox" />',
		'title' => __( 'Nom' ),
		'ordre' => __('Ordre'),
		'date' => __( 'date de publication' ),
	);
	return $columns;
}
// ajoute le numéro de classement de la page //
add_action( 'manage_page_posts_custom_column', 'my_manage_page_columns', 10, 2 );
function my_manage_page_columns( $column, $post_id ) {
global $post;
	switch( $column ) {
		/* If displaying the 'duration' column. */
		case 'ordre' :
			echo $post->menu_order;
			break;
	}	
}

// desactive flux des commentaires //
function remove_rss() {
    return;
}
add_filter('post_comments_feed_link','remove_rss');
// desactive les flux rss atom//
function disable_feed(){
     wp_die('Les flux RSS pour ce site sont désactivés. / RSS feeds are disable');
}
add_action('do_feed', 'disable_feed', 1);
add_action('do_feed_rdf', 'disable_feed', 1);
add_action('do_feed_rss', 'disable_feed', 1);
add_action('do_feed_rss2', 'disable_feed', 1);
add_action('do_feed_atom', 'disable_feed', 1);


// desactive rel=EditURI and rel=wlwmanifest links //
add_action('init', 'remheadlink');
function remheadlink() {
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
}

// filtre les pages par menu_order ASC //
add_action( 'pre_get_posts', 'meta_filter_page' );
function meta_filter_page( $query ) {
	global $post_type, $pagenow;
	if( is_admin() && $post_type == "page" && $pagenow == 'edit.php') {
		// $query is the WP_Query object, set is simply a method of the WP_Query class that sets a query var parameter
		$query->set( 'order', 'ASC' );
		$query->set( 'orderby', 'menu_order' );
		return $query;
	}	
}

//////////////////////////////////////   RESTRICTIONS POUR EDITEURS  ////////////////////////////////////// 
// custom admin editeur //
if ( is_admin()) {
	//global $current_user;
	//get_currentuserinfo();	  
	// 10 = administrateur
	// 7 = éditeur
	// 4 = auteur
	// 1 = contributeur  
	// si l' utilisateur est editeur ou en dessous //
	if (current_user_can('editor')) {		
		//CSS Admin  
		add_action('admin_head', 'css_editor');
		function css_editor() {
		$siteurl = get_bloginfo('template_url'); $url = $siteurl . '/editor-hide-style.css';
		echo "<link rel='stylesheet' type='text/css' href='$url' />\n";
		} 
		
		// empêche les notification de mise à jours //
		add_filter( 'pre_site_transient_update_core', create_function( '$a', "return null;" ) );
	// Remove the favourite actions drop-down menu
	function wp_admin_dashboard_remove_fav_actions(){
		return array();
	}
	add_filter('favorite_actions','wp_admin_dashboard_remove_fav_actions');
	add_filter('screen-options','wp_admin_dashboard_remove_fav_actions');

	//add_filter('page_row_actions','my_action_row', 10, 2);
	
	// set html editor by default //
	add_filter( 'wp_default_editor', 'rw_default_editor' );
	function rw_default_editor( $type ) {
	        return 'html';
	}

// désactive les boutons afficher dans les tables de posts //
add_filter( 'page_row_actions', 'remove_row_actions', 10, 1 );
function remove_row_actions( $actions )
{
    if( get_post_type() == 'page' ) {
        unset( $actions['trash'] );
        }
    return $actions;
}	
	// supprime le bouton ajouter dans Accueil //	
		function hide_buttons()
		{
		  global $post_type;
		 // print_r($pagenow);
		  if($post_type == 'page')
		  {
		    echo '<style>#edit-slug-box, #post-query-submit, #doaction,select[name="action"],select[name="m"] {display: none;}</style>';  
		  }
		}
		add_action('admin_head','hide_buttons');
 		
	// supprime les sous-menus //
		function remove_submenu() {
			global $submenu;
			unset($submenu['index.php'][0][0]);
			unset($submenu['edit.php?post_type=page'][10]);	
			unset($submenu['edit.php?post_type=page'][5]);			
		}
	add_action('admin_head', 'remove_submenu');
			
	// supprime les menus //    
	function delete_menu_items() {
			//remove_menu_page('index.php'); // Dashboard
			remove_menu_page('edit.php'); // Posts
			remove_menu_page('upload.php'); // Media
			remove_menu_page('link-manager.php'); // Links
			remove_menu_page('edit.php?post_type=publications'); // Pages
			remove_menu_page('profile.php'); // Pages
			remove_menu_page('edit.php?lang=fr'); // Pages
			remove_menu_page('edit.php?lang=en'); // Pages
			remove_menu_page('edit-comments.php'); // Comments			
			remove_menu_page('themes.php'); // Appearance
			remove_menu_page('plugins.php'); // Plugins
			remove_menu_page('users.php'); // Users
			remove_menu_page('tools.php'); // Tools
			remove_menu_page('options-general.php'); // Settings
	}
	add_action( 'admin_menu', 'delete_menu_items' );
		 	 
		//add_action('admin_head', 'remove_menu'); 
		
		function custom_menu_order($menu_ord) {
			if (!$menu_ord) return true;
			return array(
				'index.php',
				'edit.php?post_type=page', // Pages				
			);
		}
		add_filter('custom_menu_order', 'custom_menu_order');
		add_filter('menu_order', 'custom_menu_order');	
		
		function remove_footer_admin () {
		    echo "andam.fr est propulsé par <a href='http://www.wordpress-fr.net/' target='_blank'>Wordpress</a>.";}
			add_filter('admin_footer_text', 'remove_footer_admin');
		
	    // supprime les colonnes commentaires et parent de la page media//
	 	add_filter('manage_media_columns', 'my_custom_columns2');
	 	function my_custom_columns2($defaults) {
	 	   unset($defaults['comments']); 
	       unset($defaults['parent']);
	 	   return $defaults;
	 	}

		
	 // supprime les colonnes commentaires et parent de la page media//
	 	add_filter('edit-tags', 'my_custom_remove');
	 	function my_custom_remove($defaults) {
	       unset($defaults['parent']);
	 	   return $defaults;
	 	} 
		
		// supprime la colonne commentaires des pages //
     	add_filter('manage_pages_columns', 'my_custom_columns');
	 	function my_custom_columns($defaults) {
	 	   unset($defaults['comments']);
	 	   return $defaults;
	 	} 
	}
}
?>