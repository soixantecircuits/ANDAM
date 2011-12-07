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
?>