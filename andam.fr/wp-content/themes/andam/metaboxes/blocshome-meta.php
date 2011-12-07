<? global $wp_media_access;?>
<h4>Insérez les images correspondantes aux catégories des projets</h4>
<div class="meta-content">
 
<?php 
$template_path = get_bloginfo('template_url');
//while($mb->have_fields_and_multi('blocs')): ?>
<?php while($mb->have_fields('bloc-1', 1)): ?>
<div class="wpa_group wpa_group-blocs first">
<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-1'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->	
	<div class="block" style="float:left; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
	<?
	$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	
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
	
	<div style="float:right">
		<img src="<? echo $template_path; ?>/metaboxes/images/01-map-home.png" />
		<div>dimensions (px) : 156 X 306</div>
	</div>
	


<!-- selectbox contenant les termes de taxonomies de couleur -->
	<?php $mb->the_field('my_categorie'); ?>
	<div class="block"><strong>Catégorie</strong>
<select name='<?php $mb->the_name(); ?>'>
    <?php 
        $couleurs = get_terms('catprojet', 'hide_empty=0');
        ?>
        <option class='cat-option' value='' 
        <?php if (!count($couleurs)) echo "selected";?>>None</option>
        <?php
	foreach ($couleurs as $couleur) {
		
		if ($mb->is_value($couleur->term_id)) {
			echo "<option class='theme-option' value='" . $couleur->term_id . "' selected>" . $couleur->name . "</option>\n"; 
		} else {
			echo "<option class='theme-option' value='" . $couleur->term_id . "'>" . $couleur->name . "</option>\n"; 
		}
	}
   ?>
</select>		
	</div>		
 	<hr>
</div>
<?php endwhile; ?>

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<?php while($mb->have_fields('bloc-2', 1)): ?>
<div class="wpa_group wpa_group-blocs">
<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-2'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->
	
	<div class="block" style="float:left; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
		<?
		$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	
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
	
	<div style="float:right">
		<img src="<? echo $template_path; ?>/metaboxes/images/02-map-home.png" />
		<div>dimensions (px) : 288 X 144</div>
	</div>

<!-- selectbox contenant les termes de taxonomies de couleur -->
	<?php $mb->the_field('my_categorie'); ?>
	<div class="block"><strong>Catégorie</strong>
<select name='<?php $mb->the_name(); ?>'>
    <?php 
        $couleurs = get_terms('catprojet', 'hide_empty=0');
        ?>
        <option class='cat-option' value='' 
        <?php if (!count($couleurs)) echo "selected";?>>None</option>
        <?php
	foreach ($couleurs as $couleur) {
		
		if ($mb->is_value($couleur->term_id)) {
			echo "<option class='theme-option' value='" . $couleur->term_id . "' selected>" . $couleur->name . "</option>\n"; 
		} else {
			echo "<option class='theme-option' value='" . $couleur->term_id . "'>" . $couleur->name . "</option>\n"; 
		}
	}
   ?>
</select>		
	</div>		
 	<hr>
</div>
<?php endwhile; ?>

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<?php while($mb->have_fields('bloc-3', 1)): ?>
<div class="wpa_group wpa_group-blocs">
<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-3'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->
	
	<div class="block" style="float:left; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
		<?
		$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	
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
	<div style="float:right">
		<img src="<? echo $template_path; ?>/metaboxes/images/03-map-home.png" />
		<div>dimensions (px) : 96 X 144</div>
	</div>

<!-- selectbox contenant les termes de taxonomies de couleur -->
	<?php $mb->the_field('my_categorie'); ?>
	<div class="block"><strong>Catégorie</strong>
<select name='<?php $mb->the_name(); ?>'>
    <?php 
        $couleurs = get_terms('catprojet', 'hide_empty=0');
        ?>
        <option class='cat-option' value='' 
        <?php if (!count($couleurs)) echo "selected";?>>None</option>
        <?php
	foreach ($couleurs as $couleur) {
		
		if ($mb->is_value($couleur->term_id)) {
			echo "<option class='theme-option' value='" . $couleur->term_id . "' selected>" . $couleur->name . "</option>\n"; 
		} else {
			echo "<option class='theme-option' value='" . $couleur->term_id . "'>" . $couleur->name . "</option>\n"; 
		}
	}
   ?>
</select>		
	</div>		
 	<hr>
</div>
<?php endwhile; ?>

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<?php while($mb->have_fields('bloc-4', 1)): ?>
<div class="wpa_group wpa_group-blocs">
<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-4'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->
	
	<div class="block" style="float:left; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
		<?
		$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	
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
	<div style="float:right">
		<img src="<? echo $template_path; ?>/metaboxes/images/04-map-home.png" />
		<div>dimensions (px) : 144 X 144</div>
	</div>

<!-- selectbox contenant les termes de taxonomies de couleur -->
	<?php $mb->the_field('my_categorie'); ?>
	<div class="block"><strong>Catégorie</strong>
<select name='<?php $mb->the_name(); ?>'>
    <?php 
        $couleurs = get_terms('catprojet', 'hide_empty=0');
        ?>
        <option class='cat-option' value='' 
        <?php if (!count($couleurs)) echo "selected";?>>None</option>
        <?php
	foreach ($couleurs as $couleur) {
		
		if ($mb->is_value($couleur->term_id)) {
			echo "<option class='theme-option' value='" . $couleur->term_id . "' selected>" . $couleur->name . "</option>\n"; 
		} else {
			echo "<option class='theme-option' value='" . $couleur->term_id . "'>" . $couleur->name . "</option>\n"; 
		}
	}
   ?>
</select>		
	</div>		
 	<hr>
</div>
<?php endwhile; ?>

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<?php while($mb->have_fields('bloc-5', 1)): ?>
<div class="wpa_group wpa_group-blocs">
<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-5'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->
	
	<div class="block" style="float:left; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
		<?
		$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	
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
	<div style="float:right">
		<img src="<? echo $template_path; ?>/metaboxes/images/05-map-home.png" />
		<div>dimensions (px) : 144 X 144</div>
	</div>

<!-- selectbox contenant les termes de taxonomies de couleur -->
	<?php $mb->the_field('my_categorie'); ?>
	<div class="block"><strong>Catégorie</strong>
<select name='<?php $mb->the_name(); ?>'>
    <?php 
        $couleurs = get_terms('catprojet', 'hide_empty=0');
        ?>
        <option class='cat-option' value='' 
        <?php if (!count($couleurs)) echo "selected";?>>None</option>
        <?php
	foreach ($couleurs as $couleur) {		
		if ($mb->is_value($couleur->term_id)) {
			echo "<option class='theme-option' value='" . $couleur->term_id . "' selected>" . $couleur->name . "</option>\n"; 
		} else {
			echo "<option class='theme-option' value='" . $couleur->term_id . "'>" . $couleur->name . "</option>\n"; 
		}
	}
   ?>
</select>		
	</div>		
 	<hr>
</div>
<?php endwhile; ?>

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<?php while($mb->have_fields('bloc-6', 1)): ?>
<div class="wpa_group wpa_group-blocs">
<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-6'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->
	
	<div class="block" style="float:left; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
		<?
		$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	
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
	<div style="float:right">
		<img src="<? echo $template_path; ?>/metaboxes/images/06-map-home.png" />
		<div>dimensions (px) : 192 X 144</div>
	</div>

<!-- selectbox contenant les termes de taxonomies de couleur -->
	<?php $mb->the_field('my_categorie'); ?>
	<div class="block"><strong>Catégorie</strong>
<select name='<?php $mb->the_name(); ?>'>
    <?php 
        $couleurs = get_terms('catprojet', 'hide_empty=0');
        ?>
        <option class='cat-option' value='' 
        <?php if (!count($couleurs)) echo "selected";?>>None</option>
        <?php
	foreach ($couleurs as $couleur) {		
		if ($mb->is_value($couleur->term_id)) {
			echo "<option class='theme-option' value='" . $couleur->term_id . "' selected>" . $couleur->name . "</option>\n"; 
		} else {
			echo "<option class='theme-option' value='" . $couleur->term_id . "'>" . $couleur->name . "</option>\n"; 
		}
	}
   ?>
</select>		
	</div>		
 	<hr>
</div>
<?php endwhile; ?>

<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<?php while($mb->have_fields('bloc-7', 1)): ?>
<div class="wpa_group wpa_group-blocs">
<!-- choisir l'image -->	
	<? $mb->the_field('image');?>
	<? $wp_media_access->setGroupName('img-7'. $mb->get_the_index())->setInsertButtonLabel('Inserer')->setTab('library'); ?>
	<!-- vignette preview -->
	
	<div class="block" style="float:left; margin:0 0 10px 0">
	<div style="clear:both; float:left" class="preview">
		<?
		$file_id = $mb->get_the_value();
	$image_thumbnail = @wp_get_attachment_image_src( $file_id, 'thumbnail', true );
	
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
	<div style="float:right">
		<img src="<? echo $template_path; ?>/metaboxes/images/07-map-home.png" />
		<div>dimensions (px) : 192 X 144</div>
	</div>

<!-- selectbox contenant les termes de taxonomies de couleur -->
	<?php $mb->the_field('my_categorie'); ?>
	<div class="block"><strong>Catégorie</strong>
<select name='<?php $mb->the_name(); ?>'>
    <?php 
        $couleurs = get_terms('catprojet', 'hide_empty=0');
        ?>
        <option class='cat-option' value='' 
        <?php if (!count($couleurs)) echo "selected";?>>None</option>
        <?php
	foreach ($couleurs as $couleur) {		
		if ($mb->is_value($couleur->term_id)) {
			echo "<option class='theme-option' value='" . $couleur->term_id . "' selected>" . $couleur->name . "</option>\n"; 
		} else {
			echo "<option class='theme-option' value='" . $couleur->term_id . "'>" . $couleur->name . "</option>\n"; 
		}
	}
   ?>
</select>		
	</div>		
 	<hr>
</div>
<?php endwhile; ?>
 
</div>