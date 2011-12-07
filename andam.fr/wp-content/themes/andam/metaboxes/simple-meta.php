<?php
// important: note the priority of 99, the js needs to be placed after tinymce loads

function my_admin_print_footer_scripts()
{
	?><script type="text/javascript">/* <![CDATA[ */
		jQuery(function($)
		{
			var i=1;
			$('.customEditor textarea').each(function(e)
			{
				var id = $(this).attr('id');
 
				if (!id)
				{
					id = 'customEditor-' + i++;
					$(this).attr('id',id);
				}
 
				
				tinyMCE.execCommand('mceAddControl', true, id);
 
			});
		});
	/* ]]> */</script><?php
}
?>
<div class="my_meta_control">
  
	<label>Texte (français) <span>(optional)</span></label>
	
	<?php $mb->the_field('extra_content_fr'); ?>	
	<div class="customEditor">
		<!--<div id="editor-toolbar"><a id="my_english" class="edButton hide-if-no-js">English</a><a id="my_french" class="edButton hide-if-no-js">Français</a></div>-->
		<textarea name="<?php $mb->the_name(); ?>"><?php echo ($mb->get_the_value()); ?></textarea>
	</div>
	
    <label>Texte (english) <span>(optional)</span></label>
	<?php $mb->the_field('extra_content_en'); ?>
	<div class="customEditor">
		<textarea name="<?php $mb->the_name(); ?>"><?php echo ($mb->get_the_value()); ?></textarea>
	</div>

 
<? add_action('admin_print_footer_scripts','my_admin_print_footer_scripts',99); ?>
</div>
<script>

</script>

