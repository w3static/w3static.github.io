$(document).ready(function(){
    $('#header .grid').clone().addClass('fixed').appendTo('#header');
});
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    var winHeight = $(window).height() / 2;
    if(scroll > winHeight) {
        $('#header .grid.fixed').addClass('scroll');
    }else{
        $('#header .grid.fixed').removeClass('scroll');
    }
});
$(document).ready(function(){
    $('body').append('<div id="page-loader"></div>');
});
$(window).on("beforeunload", function() {
    $('#page-loader').fadeIn(500).delay(1000).fadeOut(1000);
    $('#header .menu.desktop').removeClass('on');
});
function lazyload() {
    var loadingBG = '#f2f2f2';
    $('img[data-src]').each(function() {
        $(this).attr('style', 'display: block;max-width:100%;opacity: 0;');
        var data_img = $(this).attr('data-src');
        $(this)
            .attr('src', data_img)
            .wrap('<div class="lazy-img-wrap" style="background:' + loadingBG + '"></div>');
        $(this).bind('load', function() {
            $(this).animate({
                    opacity: "1"
                }, 1000)
                .unwrap()
                .removeAttr('data-src');
        });
    });

    $('*[data-bg]').each(function() {
        var data_bg = $(this).attr('data-bg');
        $(this)
            .attr('style', 'position:relative;')
            .prepend('<div class="lazy-bg-placeholder" style="position:absolute;z-index:auto;top:0;left:0;right:0;bottom:0;background:' + loadingBG + '"><img src="' + data_bg + '" style="display:none;"/></div>');
        $('.lazy-bg-placeholder img', this).bind('load', function() {
            $(this)
                .parents('*[data-bg]')
                .attr('style', 'background-image:url(' + data_bg + ');position:relative;')
                .removeAttr('data-bg')
                .find('.lazy-bg-placeholder').fadeOut(1000, function() {
                    $(this).remove();
                });
        });
    });
}
$(window).bind('load', function() {
    lazyload();
});

if ($('.slide').html() != undefined) {
    $('.slide').owlCarousel({
        loop: true,
        autoplay: true,
        autoHeight: true,
        lazyLoad: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        margin: 0,
        nav: true,
        navText: ["<i class='icon ion-ios-arrow-back'></i>", "<i class='icon ion-ios-arrow-forward'></i>"],
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            769: {
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false,
            },
        },
    });
}
$(function() {
  if ($('#sidebar').length) { // Ganti "#sidebar" dengan ID tertentu
    var el = $('#sidebar');
    var stickyTop = $('#sidebar').offset().top;
    var stickyHeight = $('#sidebar').height();
    var headerHeight = $('#header .grid').height() + 60;
    $(window).scroll(function() {
      var limit = $('#gallery').offset().top - stickyHeight - headerHeight - 20*2; // Jarak berhenti di "#footer-wrapper"
      var windowTop = $(window).scrollTop();
      if (stickyTop < windowTop) {
        el.css({
          position: 'fixed',
          top: headerHeight, // Jarak atau margin sticky dari atas
          width: 300 // Jarak atau margin sticky dari atas
        });
      } else {
        el.css('position', 'static');
      }
      if (limit < windowTop) {
        var diff = limit - windowTop;
        el.css({
          top: diff
        });
      }
    });
  }
});
$('a').each(function() {
    var url = $(this).attr('href');
    if (url == window.location) {
        $(this).addClass('current');
    }
});