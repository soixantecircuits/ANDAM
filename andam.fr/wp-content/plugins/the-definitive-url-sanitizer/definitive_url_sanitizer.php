<?php
/**
 * @package The Definitive URL Sanitizer
 * @author David Martinez
 * @version 0.4.9
 */
/*
Plugin Name: The Definitive URL Sanitizer
Plugin URI: http://dmnet.bitacoras.com/proyectos/wp_dus
Description: Really sanitizes post titles for URL, fixing native sanitize_url()
Author: David Martinez
Version: 0.4.9
Author URI: http://dmnet.bitacoras.com/
*/

/**
 * 
 * @param	string	$str
 * @return	int
 */
function url_sanitizer($str)
	{
	// blog charset
	static $charset = null;
	if(is_null($charset)) $charset = get_option('blog_charset');

	// string separator
	$sep = '-';

	// character translation table
	$chars = array
		(
		'á' => 'a', 'à' => 'a', 'â' => 'a', 'ä' => 'a',
		'Á' => 'A', 'À' => 'A', 'Â' => 'A', 'Ä' => 'A',
		'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
		'É' => 'E', 'È' => 'E', 'Ê' => 'E', 'Ë' => 'E',
		'í' => 'i', 'ì' => 'i', 'î' => 'i', 'ï' => 'i',
		'Í' => 'I', 'Ì' => 'I', 'Î' => 'I', 'Ï' => 'I',
		'ó' => 'o', 'ò' => 'o', 'ô' => 'o', 'ö' => 'o',
		'Ó' => 'O', 'Ò' => 'O', 'Ô' => 'O', 'Ö' => 'O',
		'ú' => 'u', 'ù' => 'u', 'û' => 'u', 'ü' => 'u',
		'Ú' => 'U', 'Ù' => 'U', 'Û' => 'U', 'Ü' => 'U',
		'ç' => 'c', 'ý' => 'y', 'Ç' => 'C', 'Ý' => 'Y',
		'ñ' => 'n', '$' => 's', '?' => '',  '&' => '',
		'Ñ' => 'N', '$' => 'S', '¿' => '',  '&' => '',
		'<' => '', '>' => ''
		);

	// lowercase trying to preserver charset
	if(!function_exists('mb_strtolower')) $str = strtolower($str);
	else $str = mb_strtolower($str, $charset);

	// strips tags and fix encoded chars
	$str = trim(strip_tags(urldecode($str)));

	// convert disallowed chars into allowed
	foreach ($chars as $no => $yes) $str = str_replace($no, $yes, $str);

	// replaces non allowed chars into spaces
	$str = preg_replace('/[^a-z0-9' . implode('', $chars) . ']/ui', ' ', $str);

	// delete remaining spaces
	$str = preg_replace('/\s+/', $sep , str_replace('+', ' ', $str));

	// replaces spaces with default separator
	$str = preg_replace("/(^$sep|$sep$)/", '', str_replace(' ', $sep, $str));

	// special fix for "anno"
	$str = preg_replace('/^ano-/i', 'anno-', $str);
	$str = preg_replace('/-ano$/i', '-anno', $str);
	$str = str_replace('-ano-', '-anno-', $str);

	return $str;
	}

if(is_admin()) add_filter('sanitize_title', 'url_sanitizer');