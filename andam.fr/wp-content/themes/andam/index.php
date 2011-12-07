<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query. 
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
* @package WordPress
* @subpackage ANDAM
* @since ANDAM 1.0
 */
get_header(); ?>

<article id="home" class="grid_16">
</article>
    <!-- ANDAM API Interface -->
    <div id="andamapp">
      <div class="content">
        <div id="tweets">
          <ul id="tweet-list"></ul>
        </div>
      </div>
    </div>

    <!-- Templates -->
	<script id="tweetTemplate" type="text/x-jquery-tmpl">
	    <div class="tweet">    
		<div class="source">
		<label>  ${from_user} (${created_at}) </label>
		<div class="message">
		    ${text}                
		</div>
		<div class ="link">
		</div>
	     </div>
	     </div>
	   </div>
	</script> 			
<?php get_footer(); ?>