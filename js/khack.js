jQuery(document).ready(function ($) {
    "use strict";

    function kt_tab_fadeeffect(){
      // effect click
      $(document).on('click','.kt-tab-fadeeffect a[data-toggle="pill"]',function(){
        var item = '.product-item';
        var tab_id = $(this).attr('href');
        var tab_animated = $(this).data('animated');
        tab_animated = ( tab_animated == undefined ) ? 'fadeInUp' : tab_animated;

        if( $(tab_id).find('.owl-carousel').length > 0 ){
          item = '.owl-item.active';
        }
        $(tab_id).find(item).each(function(i){
          var t = $(this);
          var style = $(this).attr("style");
          style = ( style == undefined ) ? '' : style;
          var delay  = i * 200;
          t.attr("style", style +
                    ";-webkit-animation-delay:" + delay + "ms;"
                  + "-moz-animation-delay:" + delay + "ms;"
                  + "-o-animation-delay:" + delay + "ms;"
                  + "animation-delay:" + delay + "ms;"
          ).addClass(tab_animated+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              t.removeClass(tab_animated+' animated');
              t.attr("style", style);
          });
        })
      })
    }

    $('.show-content').on( "click", function(e) {
      $(this).closest('.parent-content').find('.inner-content').addClass('show');
      return false;
    });
    $('.hidden-content').on( "click", function(e) {
      $(this).closest('.inner-content').removeClass('show');
      return false;
    });

    $('.toggle-button').on( "click", function(e) {
      $(this).closest('.parent-content').find('.toggle-content').toggleClass('show');
      return false;
    });

    /*special header*/
    $('.special-header .show-content').on( "click", function(e) {
      $(this).closest('.special-header').find('.content-need-hidden').addClass('hidden');
      return false;
    });

    $('.special-header .hidden-content').on( "click", function(e) {
      $(this).closest('.special-header').find('.content-need-hidden').removeClass('hidden');
      return false;
    });
    $('.header.layout5 .show-content').on( "click", function(e) {
      $(this).closest('body').find('.special-content').addClass('translate');
      return false;
    });
    $('.header.layout5 .hidden-content').on( "click", function(e) {
      $(this).closest('body').find('.special-content').removeClass('translate');
      return false;
    });

    

    // My Account
    $('.login-button').on( "click", function(e) {
      $(this).addClass('active');
       $(this).closest('.my-account').find('.top-login-form').find('.register-button').removeClass('active');
      $(this).closest('.my-account').find('.top-login-form').addClass('show');
      $(this).closest('.my-account').find('.top-register-form').removeClass('show');
       return false;
    });
    $('.register-button').on( "click", function(e) {
      $(this).addClass('active');
       $(this).closest('.my-account').find('.top-register-form').find('.login-button').removeClass('active');
      $(this).closest('.my-account').find('.top-register-form').addClass('show');
      $(this).closest('.my-account').find('.top-login-form').removeClass('show');
       return false;
    });


    $(document).on('change', '.group-payment input[type="radio"][name="payment"]', function(e){
      kt_payment_methods_changed();
    });

    function kt_payment_methods_changed(){
      $('.group-payment input[type="radio"][name="payment"]').each(function(){
        if ($(this).is(':checked')) {
          var thisPaymentItem = $(this).closest('.payment-item');
          var thisPaymentGroup = $(this).closest('.group-payment');
          thisPaymentGroup.find('.des-payment').hide();
          thisPaymentItem.find('.des-payment').show();
        }
      });
    }
    
    function kt_get_scrollbar_width() {
      var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
          $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
          inner = $inner[0],
          outer = $outer[0];
      jQuery('body').append(outer);
      var width1 = parseFloat(inner.offsetWidth);
      $outer.css('overflow', 'scroll');
      var width2 = parseFloat(outer.clientWidth);
      $outer.remove();
      return (width1 - width2);
    }

    function kt_resizeMegamenu(){
      var window_size = parseFloat(jQuery('body').innerWidth());
      window_size += kt_get_scrollbar_width();
      if( window_size > 1199 ){
        if( $('.container-wapper .main-menu').length >0){
          var container = $('.main-menu-wapper');
          if( container!= 'undefined'){
            var container_width = 0;
            container_width = parseFloat(container.innerWidth());
            var container_offset = container.offset();
            setTimeout(function(){
              $('.main-menu .menu-item-has-children').each(function(index,element){
                $(element).children('.mega-menu').css({'width':container_width+'px'});
                var sub_menu_width = parseFloat($(element).children('.mega-menu').outerWidth());
                var item_width = parseFloat($(element).outerWidth());
                $(element).children('.mega-menu').css({'left':'-'+(sub_menu_width/2 - item_width/2)+'px'});
                var container_left = container_offset.left;
                var container_right = (container_left + container_width);
                var item_left = $(element).offset().left;
                var overflow_left = (sub_menu_width/2 > (item_left - container_left));
                var overflow_right = ((sub_menu_width/2 + item_left) > container_right);
                if( overflow_left ){
                  var left = (item_left - container_left);
                  $(element).children('.mega-menu').css({'left':-left+'px'});
                }
                if( overflow_right && !overflow_left ){
                  var left = (item_left - container_left);
                  left = left - ( container_width - sub_menu_width );
                  $(element).children('.mega-menu').css({'left':-left+'px'});
                }
              })
            },100);
          }
        }
      }
    }

    function sticky_menu(){
      if(!$('.header').hasClass('no-sticky')){
        if($(window).width() > 1024) {
          if ($(window).scrollTop() > 350) {
              $('.header .sticky-menu').addClass('is-sticky');
          } 
          else {
              $('.header .sticky-menu').removeClass('is-sticky');
          }
          if ($(window).scrollTop() > 450) {
              $('.header .sticky-menu').addClass('sticky-run');
          } 
          else {
              $('.header .sticky-menu').removeClass('sticky-run');
          }
        }
      }
    }

    function kutethemes_innit_carousel(){
      //owl has thumbs 
      $('.owl-carousel.has-thumbs').owlCarousel({
          loop: true,
          items: 1,
          thumbs: true,
          thumbImage: true,
          thumbContainerClass: 'owl-thumbs',
          thumbItemClass: 'owl-thumb-item'
      });
      // config
      $(".owl-carousel").each(function(index, el) {
          var config = $(this).data();
          config.navText = ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'];
          var animateOut = $(this).data('animateout');
          var animateIn  = $(this).data('animatein');
          var slidespeed = parseFloat($(this).data('slidespeed'));
          if(typeof animateOut != 'undefined' ){
              config.animateOut = animateOut;
          }
          if(typeof animateIn != 'undefined' ){
              config.animateIn = animateIn;
          }
          if(typeof (slidespeed) != 'undefined' ){
              config.smartSpeed = slidespeed;
          }

          if( $('body').hasClass('rtl')){
              config.rtl = true;
          }

          var owl = $(this);
          owl.on('initialized.owl.carousel',function(event){
              var total_active = parseInt(owl.find('.owl-item.active').length);
              var i            = 0;
              owl.find('.owl-item').removeClass('item-first item-last');
              setTimeout(function(){
                  owl.find('.owl-item.active').each(function () {
                      i++;
                      if (i == 1) {
                          $(this).addClass('item-first');
                      }
                      if (i == total_active) {
                          $(this).addClass('item-last');
                      }
                  });

              }, 100);
          })
          owl.on('refreshed.owl.carousel',function(event){
              var total_active = parseInt(owl.find('.owl-item.active').length);
              var i            = 0;
              owl.find('.owl-item').removeClass('item-first item-last');
              setTimeout(function(){
                  owl.find('.owl-item.active').each(function () {
                      i++;
                      if (i == 1) {
                          $(this).addClass('item-first');
                      }
                      if (i == total_active) {
                          $(this).addClass('item-last');
                      }
                  });

              }, 100);
          })
          owl.on('change.owl.carousel',function(event){
              var total_active = parseInt(owl.find('.owl-item.active').length);
              var i            = 0;
              owl.find('.owl-item').removeClass('item-first item-last');
              setTimeout(function(){
                  owl.find('.owl-item.active').each(function () {
                      i++;
                      if (i == 1) {
                          $(this).addClass('item-first');
                      }
                      if (i == total_active) {
                          $(this).addClass('item-last');
                      }
                  });

              }, 100);
              owl.addClass('owl-changed');
              setTimeout(function () {
                  owl.removeClass('owl-changed');
              },config.smartSpeed)
          })
          owl.on('drag.owl.carousel',function(event){
              owl.addClass('owl-changed');
              setTimeout(function () {
                  owl.removeClass('owl-changed');
              },config.smartSpeed)
          })

          owl.owlCarousel(config);

      });
    }

    function kt_scroll() {
      if(parseFloat($(window).outerWidth()) > 0) {
        if($(window).width() < 1200) {
          $('.header .menu-mobile').mCustomScrollbar();
        }
        else {
          $('.header .scrollbar-menu').mCustomScrollbar();
        }
      }
    }

    function menu_mobile(){
      if(!$('.header').hasClass('no-menu-mobile')) {
        $('.header .menu-mobile').prepend('<span class="text">MENU</span><a href="#" class="close-menu"><i class="fa fa-times" aria-hidden="true"></i></a>');
        $('.header').find('.main-menu').clone().appendTo('.header .menu-mobile');
      }
      $('.header .show-menu').on( "click", function(e) {
        $(this).closest('header').find('.menu-mobile').addClass('show');
        return false;
      });
      $('.header .close-menu').on( "click", function(e) {
        $(this).closest('header').find('.menu-mobile').removeClass('show');
        return false;
      });
      $('.toggle-submenu').on( "click", function(e) {
        $(this).parent('.menu-item-has-children').toggleClass('show-submenu');
        $(this).toggleClass('active');
         return false;
      });
    }
    
    $(".chosen-select").chosen({disable_search_threshold: 10});

    menu_mobile();
    kt_scroll();
    kt_payment_methods_changed();
    kt_tab_fadeeffect();
    kt_resizeMegamenu();
    sticky_menu();
    kutethemes_innit_carousel();

    $(window).scroll(function() {
      sticky_menu();
      kt_resizeMegamenu();
    });

    $(window).resize(function(){
      kt_resizeMegamenu();
      sticky_menu();
      kutethemes_innit_carousel();
      kt_scroll();
    });
    $(window).load(function(){
      kt_payment_methods_changed();
      kt_resizeMegamenu();
      kt_scroll();
    });
});
