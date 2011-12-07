<? global $wp_media_access;?>
<h4>Ajouter des images au projet : </h4>
<div class="meta-content">
 
<?php while($mb->have_fields_and_multi('blocspics')): ?>
<?php $mb->the_group_open(); ?>

<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-n'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->	
	<div class="block" style="height:80px; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
	<?
	$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	//$image_thumbnail = @$image_thumbnail[0];
	$image_html = "<img src='$image_thumbnail[0]' style='overflow:hidden' width='$image_thumbnail[1]' height='$image_thumbnail[2]' alt='' />";
	echo @$image_html;
	?>
	</div>
	<!-- champ texte contenant l'id de l'image-->
	<div class="block" style="display:none">
		<? echo $wp_media_access->getField(array('name'=> $mb->get_the_name(), 'value'=> $mb->get_the_value())); ?>
	</div>
	<!-- bouton ajouter image -->	
	<? echo $wp_media_access->getButton(array('text'=> 'Choisir une image')); ?>
	<!-- nom de l'image -->
	<p>
	<span id="pic_name"><em><? if(!empty($file_id)) echo get_the_title($mb->get_the_value());?></em></span>
	</p>
	</div>

<!-- légendes fr / en -->
	<?php //$mb->the_field('légende_fr'); ?>
	<!--<div class="block"><strong>légende_fr</strong>
<input type="text" name="<?php $metabox->the_name(); ?>" value="<?php $metabox->the_value(); ?>"/>		
	</div>!-->
	
	<?php //$mb->the_field('légende_en'); ?>
	<!--<div class="block"><strong>légende_en</strong>
<input type="text" name="<?php $metabox->the_name(); ?>" value="<?php $metabox->the_value(); ?>"/>		
	</div>
	!-->	
	<div class="block"><a href="#" class="dodelete button">Supprimer</a></div>
 	<hr>
 	
<?php $mb->the_group_close(); ?>
<?php endwhile; ?>
 
<p><a href="#" class="docopy-blocspics button">Ajouter une image</a></p>
</div>
<script type="text/javascript">
	//<![CDATA[
		jQuery (function ($)
			{
					$('#wpa_loop-blocspics').sortable({
						 axis:'y',
						 cursor: 'move'
					});
			});
			//]] >
</script>