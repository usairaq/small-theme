var carousel_type=$(window).width()>768?"card":"";try{if(pandastudio_framework.carousels.length==0){carousel_type='';}}catch(e){}
var vm=new Vue({data:function(){return{scroll:0,true_scroll:0,isDesktop:true,destroy:false,destroy_app:false,disableTooltip:true,main:{carousel:{type:carousel_type,content:pandastudio_framework.carousels,force_landscape:false},sidebar:{open:false,tabModel:pandastudio_framework.sidebar_tabModel,fixed:false,loading:false},menu:{open:false,}},post_menu:false,post_share_popover:false,comment:{name:"",email:"",text:"",url:"",ding:true,cmt_req_name_email:true,popover_nickname:false,popover_faces:false,popover_validate:false,popover_logout:false,validate_num1:2,validate_num2:2,validate_input:'',need_validate:false,is_user_logged_in:false},showBox_contain:pandastudio_framework.showBox_contain||false,showBox_start_position:{x:0,y:0},faq:{searchbox:'',tip:'暂无相关问题',answers:[]},announcement:'', announcement_title:''}},el:"#wrap",mounted:function(){var _this=this;setTimeout(function(){ $('.header .menu').css('transition','0.25s'); $('body').scrollspy({target:'.post_nav'});},100); this.parseDesktop(); if(!this.is_Mobile()){this.disableTooltip=false;} 
$('body #wrap').on('click','.topNav ul.menu li.menu-item-has-children > a',function(event){event.preventDefault();return false;}); $('body #wrap').on('click','.header.mobile .topNav ul.menu li.menu-item-has-children > a',function(event){$(this).toggleClass('open');$(this).siblings('.sub-menu').slideToggle(250);return false;}); $(window).resize(function(event){_this.parseDesktop();}); if(this.ieHasBug()){var el=document.getElementById('main')
this.fixElementHeight(el);var _this=this;$(window).resize(function(event){setTimeout(function(){_this.fixElementHeight(el);},250)});} 
$('body #wrap').on('click','.carousel a',function(event){if(!$(this).children().hasClass('is-active')){event.preventDefault();return false;}});this.get_options(); 
this.validate_random(); window.addEventListener('scroll',function(){_this.true_scroll=$(window).scrollTop();window.wait500=window.setTimeout(function(){_this.scroll=_this.true_scroll;},500)});this.make_shadowbox();$(function(){$('[pandaTab]').pandaTab();}) 
var guestInfo=localStorage.guestInfo;if(guestInfo){if(!this.comment.is_user_logged_in){guestInfo=JSON.parse(guestInfo);this.comment.name=guestInfo.name;this.comment.email=guestInfo.email;this.comment.url=guestInfo.url;}}},methods:{is_Mobile:function(){var u=navigator.userAgent,app=navigator.appVersion;var ios=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);var android=u.indexOf('Android')>-1||u.indexOf('Linux')>-1;var iPhone=u.indexOf('iPhone')>-1;var iPad=u.indexOf('iPad')>-1;if(ios|android|iPhone|iPad){return true;}else{return false;}},parseDesktop:function(){ this.isDesktop=$(window).width()>991?true:false;},carouselTypeOnResize:function(){var _this=this; if($(window).width()>768){_this.main.carousel.type="card"}else if(_this.main.carousel.type=="card"){_this.main.carousel.type="";_this.destroy=true;setTimeout(function(){_this.destroy=false;},1);}},get_options:function(){_this=this;var option_data;$.ajax({url:pandastudio_framework.route+'pandastudio/framework/blog_settings',type:'GET',beforeSend:function(xhr){xhr.setRequestHeader('X-WP-Nonce',pandastudio_framework.nonce);},}).done(function(data){option_data=data;if(data.sidebar_fixed=="checked"&localStorage.sidebar_fixed!="false"){_this.main.sidebar.fixed=true;}
_this.comment.cmt_req_name_email=data.cmt_req_name_email==""?false:true;_this.comment.need_validate=data.validate_comment=="checked"?true:false;_this.comment.is_user_logged_in=data.is_user_logged_in;if(data.carousel_force_landscape=='true'){_this.main.carousel.type="";_this.main.carousel.force_landscape=true;}else{$(window).resize(function(event){_this.carouselTypeOnResize();});} 
_this.announcement=data.announcement;_this.announcement_title=data.announcement_title;}).fail(function(data){$('#wrap').html('');});if(sessionStorage.sidebar_tabModal){this.main.sidebar.tabModel=sessionStorage.sidebar_tabModal;if(sessionStorage.sidebar_tabModal=="sidebar-bookmark"){this.main.sidebar.tabModel='sidebar-blogger'}}
if(pandastudio_framework.contentNav){this.post_menu=true;this.main.sidebar.tabModel="sidebar-bookmark";this.main.sidebar.fixed=true;}else{this.post_menu=false;}},ieHasBug:function(){var outer=document.createElement('div');var inner=document.createElement('div');outer.setAttribute('style','display:-ms-flexbox; display:flex; min-height:100vh;');outer.appendChild(inner);(document.body||document.documentElement).appendChild(outer);var bug=!inner.offsetHeight;outer.parentNode.removeChild(outer);return bug;},fixElementHeight:function(el){el.style.height='auto';var height=el.offsetHeight;el.style.height=height+'px';},changeSidebarFixedState:function(event){localStorage.sidebar_fixed=event;},tabChanged:function(){sessionStorage.sidebar_tabModal=this.main.sidebar.tabModel;},is_IE9:function(){var browser=navigator.appName;var b_version=navigator.appVersion;var version=b_version.split(";");var trim_Version=version[1].replace(/[ ]/g,"");if(browser=="Microsoft Internet Explorer"&&trim_Version=="MSIE9.0"){return true;}else{return false;}},is_Email:function(str){var reg=/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;return reg.test(str);},addCommentFace:function(face_code){this.comment.text+=face_code;this.comment.popover_faces=false;$('#comment').focus();},validateComment:function(event){var prevent=false;var errarr=[];var offset=this.isDesktop?50:35;if(!this.comment.is_user_logged_in){if(this.comment.name.replace(/ /g,'')==''&this.comment.cmt_req_name_email){prevent=true;errarr.push("昵称未填写");this.comment.popover_nickname=true;}
if(this.comment.email.replace(/ /g,'')==''&this.comment.cmt_req_name_email){prevent=true;errarr.push("邮箱未填写");this.comment.popover_nickname=true;}
if(this.comment.email.replace(/ /g,'')!=''&!this.is_Email(this.comment.email)){prevent=true;errarr.push("邮箱格式错误");this.comment.popover_nickname=true;}
if(this.comment.need_validate&!this.comment_is_human()){prevent=true;errarr.push("验证码错误");this.validate_random();}}
if(this.comment.text.replace(/ /g,'')==''){prevent=true;errarr.push("评论未填写")}
if(prevent){event.preventDefault();this.$notify({title:'请修改以下错误',message:errarr.toString().replace(/,/g,' · '),type:'warning',offset:offset});}else{ var guestInfo={name:this.comment.name,email:this.comment.email,url:this.comment.url}
localStorage.guestInfo=JSON.stringify(guestInfo);}},validate_random:function(){this.comment.validate_num1=parseInt(Math.random()*18)+1;this.comment.validate_num2=parseInt(Math.random()*18)+1;if(this.comment.validate_num1==this.comment.validate_num2){this.validate_random();}
this.comment.validate_input='';},comment_is_human:function(){num1=this.comment.validate_num1.toString();input=this.comment.validate_input.toString().substr(0,6);num2=this.comment.validate_num2.toString();bds=num1+input+" == "+num2;try{if(eval(bds)){return true;}else{return false;}}catch(e){return false;}},shareTSina:function(title,url){window.open('http://service.weibo.com/share/share.php?title='+encodeURIComponent(title)+'&url='+encodeURIComponent(url)+'&searchPic=true','_blank','scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');},shareTWechat:function(){var _this=this;$('body > .weQRcode').remove();$('body').append('<div class="weQRcode" style="display:none"><div class="code"></div><span>微信“扫一扫”分享到朋友圈</span><div class="closeBtn"><span><i class="fa fa-times" aria-hidden="true"></i> 关闭</span></div></div>');$('.weQRcode > .code').qrcode({width:200,height:200,correctLevel:0,text:_this.utf16to8(location.href)});$('body > .weQRcode').fadeIn();},shareTQq:function(title,url){window.open('http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title));},shareTQzone:function(title,url){window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title));},get_post_title:function(){if($('h1').html()){return $('h1').html();}else{return document.title;}},utf16to8:function(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i);}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}}
return out;},showBoxtouchStart:function(event){console.log(event.touches[0].clientX)
this.showBox_start_position.x=event.touches[0].clientX
this.showBox_start_position.y=event.touches[0].clientY},showBoxtouchEnd:function(event){if(Math.abs(event.changedTouches[0].clientX-this.showBox_start_position.x)>30&Math.abs(event.changedTouches[0].clientY-this.showBox_start_position.y)<Math.abs(event.changedTouches[0].clientX-this.showBox_start_position.x)){console.log('swipe')
if(event.changedTouches[0].clientX>this.showBox_start_position.x){console.log('prev')
$('[pandaPicshow=enable] .showBox .navigator .prev').trigger('click')}else{console.log('next')
$('[pandaPicshow=enable] .showBox .navigator .next').trigger('click')}}},contentClickHideSidebar:function(event){if(this.main.sidebar.open&!this.isDesktop){event.preventDefault();this.main.sidebar.open=!this.main.sidebar.open;this.main.menu.open=false;}},faq_search:function(){var _this=this;_this.faq.answers=[];_this.faq.tip='正在检索...'
$.ajax({url:pandastudio_framework.route+'pandastudio/framework/faq_search',type:'POST',beforeSend:function(xhr){xhr.setRequestHeader('X-WP-Nonce',pandastudio_framework.nonce);},data:JSON.stringify(_this.faq.searchbox)}).done(function(data){_this.faq.answers=data;_this.faq.tip='暂无相关问题'}).fail(function(){_this.tip='网路错误，请重试';})},backToTop:function(){$('body,html').animate({scrollTop:0},500);},make_shadowbox:function(){$('article a').each(function(index,el){var hrefAtt=$(el).attr('href');if(!hrefAtt){return false;} 
if((hrefAtt.indexOf(".svg")>0|hrefAtt.indexOf(".SVG")>0|hrefAtt.indexOf(".gif")>0|hrefAtt.indexOf(".GIF")>0|hrefAtt.indexOf(".jpg")>0|hrefAtt.indexOf(".JPG")>0|hrefAtt.indexOf(".png")>0|hrefAtt.indexOf(".PNG")>0|hrefAtt.indexOf(".tif")>0|hrefAtt.indexOf(".TIF")>0|hrefAtt.indexOf(".jpeg")>0|hrefAtt.indexOf(".JEPG")>0|hrefAtt.indexOf(".tiff")>0|hrefAtt.indexOf(".TIFF")>0)&$(el).attr("rel")!="no-shadowbox"){$(el).attr("rel","shadowbox");}});},is_announcement_viewed:function(content){ if(localStorage.getItem('announcement')&&localStorage.getItem('announcement')==content){return'viewed';}else{return'not_viewed';}},set_announcement:function(content){ localStorage.setItem('announcement',content); $('.float_btns .info').addClass('viewed');},change_show_type:function(type){document.cookie="display_type = "+type;this.$message({message:'已切换，仅对本次浏览有效。正在刷新...',type:'success'});setTimeout(function(){location.reload();},1000)}}})
$("#wrap").removeClass("before_mounted");$(document).on('click','.post_nav a',function(event){event.preventDefault();if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var $target=$(this.hash);$target=$target.length&&$target||$('[name='+this.hash.slice(1)+']');if($target.length){var targetOffset=$target.offset().top;$('html,body').animate({scrollTop:targetOffset},500);return false;}}});$('.single-post.blog.img-thumb .thumb_img').each(function(index,el){var url=$(el).css('background-image');url=url.replace(/^url\(["']?/,'').replace(/["']?\)$/,'');$(el).css('opacity','0');try{blurImg2Base64(url,el,true)}catch(e){};});$('.single .top_img.img-thumb').each(function(index,el){var url=$(el).css('background-image');url=url.replace(/^url\(["']?/,'').replace(/["']?\)$/,'');$(el).css('opacity','0');try{blurImg2Base64(url,el,true)}catch(e){};});function blurImg2Base64(url,el,rgbaster){var image=document.createElement('img');image.crossOrigin='anonymous';image.src=url;if(image.complete){drawBlurImg(image,el,rgbaster);}else{image.onload=function(){drawBlurImg(image,el,rgbaster);};};}
function drawBlurImg(image,el,rgbaster){var cvs=document.createElement('canvas');cvs.width=image.width;cvs.height=image.height;var ctx=cvs.getContext("2d")
ctx.drawImage(image,0,0); ctx.fillStyle="rgba(0,0,0,.2)";ctx.fillRect(0,0,image.width,image.height);ctx.fillStyle="rgba(0,0,0,.3)";ctx.save();ctx.globalCompositeOperation='overlay';ctx.fillRect(0,0,image.width,image.height); StackBlur.canvasRGB(cvs,0,0,image.width,image.height,18);var dataURL=cvs.toDataURL();$(el).css('background-image','url('+dataURL+')');if(rgbaster){RGBaster.colors(image,{paletteSize:10,exclude:['rgb(255,255,255)','rgb(0,0,0)'], success:function(colors){color=colors.dominant; color=color.replace(/^rgb\(?/,'').replace(/["']?\)$/,'');rgb=color.split(',')
if(!((parseInt(rgb[0])<100&parseInt(rgb[1])<100&parseInt(rgb[2])<100)|(parseInt(rgb[0])>200&parseInt(rgb[1])>200&parseInt(rgb[2])>200))){ctx.fillStyle="rgba("+color+",.5)";ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillRect(0,0,image.width,image.height);}
var dataURL=cvs.toDataURL();$(el).css('background-image','url('+dataURL+')');$(el).animate({opacity:1},250)}});}
window.setTimeout(function(){$(el).animate({opacity:1},250)},1000)}
$(".commentlist .children > li").each(function(index,el){var name=$(this).parent().siblings().find('.name').html();var nameStr="<span class='reply'>@"+name+"</span>"
$(this).find('.comment-author.vcard').first().find('p').first().prepend(nameStr)});$(document).on('click','.weQRcode > .closeBtn > span',function(event){$('body > .weQRcode').fadeOut('fast',function(){$(this).remove();});});$.fn.postLike=function(){if($(this).hasClass('done')){return false;}else{$(this).addClass('done');var id=$(this).data("id"),rateHolder=$(this).children('.count');var ajax_data={post_id:id};$.ajax({url:pandastudio_framework.route+"pandastudio/framework/post_ding/",type:'POST',dataType:'json',data:JSON.stringify(ajax_data),}).done(function(data){$(rateHolder).html(data);})
return false;}}
$(document).on("click",".favorite",function(){$(this).postLike()});$(document).on("click",".favorite.done",function(){vm.$message({message:'请勿重复点赞',type:'warning'});});if($('#wrap').hasClass('page-template-faq-php')){vm.faq_search();}
window.setTimeout(function(){ $('.content-container > .baiduPaw').append($('.baiduPaw_follow'))
$('.baiduPaw_follow').slideDown();},1000)