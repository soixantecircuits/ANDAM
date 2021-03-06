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
			/* tab en /fr */
	$('#my_english').click(
		function() {
		$(this).addClass('active');
		$('#my_french').removeClass('active');
		$('#editor_en').css('display', 'block');
		$('#editor_fr').css('display', 'none');
	});
	
	$('#my_french').click(
		function() {
		$(this).addClass('active');
		$('#my_english').removeClass('active');
		$('#editor_en').css('display', 'none');
		$('#editor_fr').css('display', 'block');
	});
	
		});
	/* ]]> */</script><?php
}
?>

<div class="my_meta_control">
	<label>Texte<span>(optional)</span></label>
	
<div id="editor-toolbar"><a id="my_english" class="edButton">English</a><a id="my_french" class="edButton active">Français</a></div>	
	<?php $mb->the_field('extra_content_fr'); ?>
	
	<div id="editor_fr" class="customEditor">
		<textarea name="<?php $mb->the_name(); ?>"><?php echo wpautop(($mb->get_the_value())); ?></textarea>
	</div>

	<?php $mb->the_field('extra_content_en'); ?>
	<div id="editor_en" class="customEditor">
		<textarea name="<?php $mb->the_name(); ?>"><?php echo wpautop(($mb->get_the_value())); ?></textarea>
	</div>

<? add_action('admin_print_footer_scripts','my_admin_print_footer_scripts',99); ?>
</div>
<script>

</script>

