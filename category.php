<?php
get_header()
?><?php
global $wp_query, $paged;$max_page = $wp_query->max_num_pages;if (($max_page > 1 | ($max_page == 1 & get_option('hide_pagi_only_1') != "checked") ) & get_option('pagi_float') == "checked") {$pagi_float_class = "pagi_float";}if ($max_page > 1 | ($max_page == 1 & get_option('hide_pagi_only_1') != "checked") ) {$has_pagi_class = "has_pagi";}?><?php include("assets/template/carousel.php"); ?><div class="cats_display <?php echo $pagi_float_class." ".$has_pagi_class; ?>" :class="main.carousel.type"><?php include('assets/template/nav_category.php'); ?><?php
echo "<div class='cat_group category content-container clear-float' style='padding-top:30px'>";echo "<div class='newest-container clear-float'>";if (get_option('allow_user_change_show_type')) {?><div class="change_show_type col-xs-12" style="margin-top: -24px;margin-bottom: 6px"><el-dropdown @command="change_show_type"><span class="label_text"><i class="fa fa-th-large" aria-hidden="true"></i></span><el-dropdown-menu slot="dropdown" class="change_show_type_lists"><el-dropdown-item command="">恢复默认</el-dropdown-item><el-dropdown-item divided command="list">列表</el-dropdown-item><el-dropdown-item command="card">卡片</el-dropdown-item><el-dropdown-item command="cover">封面</el-dropdown-item><el-dropdown-item command="blog">博客</el-dropdown-item></el-dropdown-menu></el-dropdown></div><?php
}global $wp_query;$cat = get_query_var('cat');$cat_modes = get_option('categorys_show_mode');$show_type = '';foreach ($cat_modes as $cat_mode) {if ($cat_mode['cat'] == $cat) {$show_type = $cat_mode['type'];}}while( have_posts() ){the_post();if ($_COOKIE['display_type'] != '' & get_option('allow_user_change_show_type')=='checked') {$show_type = $_COOKIE['display_type'];}switch ($show_type) {case 'list':include("assets/template/post_list.php");break;case 'card':include("assets/template/post_card.php");break;case 'cover':include("assets/template/post_newest.php");break;default:include("assets/template/post_blog.php");break;}}echo "</div>";echo "</div>";?><?php echo wp_nav( $p = 2 ,$showSummary = false, $showPrevNext = true, $style = 'panda_pagination', $container = 'full-container' ); ?></div><?php get_footer() ?>