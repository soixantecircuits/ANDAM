<?php
/**
 * The Sidebar containing the primary and secondary widget areas.
 *
 * @package WordPress
 * @subpackage ANDAM
 * @since ANDAM 1.0
 */
?>
<nav id="main_menu">
	<ul>
<?php wp_list_pages('sort_column=menu_order&exclude=6,8&&title_li='); ?>
	</ul>	
	<ul id="langues">
		<li>
	<? 
	global $q_config;
	foreach(qtrans_getSortedLanguages() as $language) {
		if($language != $q_config['language']) {
			echo "<a id='url-translate' href='".qtrans_convertURL(null, $language)."'";
			// set hreflang
			echo " hreflang='".$language."' title='".$q_config['language_name'][$language]."'";
			echo " class='italic'>".__('[:en](en français)[:fr](in english)')."</a>";
		}} ?>
		</li>
	</ul>
	<? if($post->post_name == "association" || $post->post_name == "press") {?>
	<aside id="contact">
		<? echo wpautop($post->post_content);?>
	</aside>
	<? } ?>
</nav>