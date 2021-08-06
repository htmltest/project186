$(document).ready(function() {

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        responsive: [
            {
                breakpoint: 1239,
                settings: {
                    arrows: false
                }
            }
        ]
    }).on('setPosition', function(event, slick) {
        var curIndex = $('.slider').slick('slickCurrentSlide');
        $('.slider .slick-dots li button.active').removeClass('active');
        $('.slider .slick-dots li button').eq(curIndex).addClass('active');
        if ($('.slider .slick-current .slider-item-inverse').length > 0) {
            $('.slider .slick-prev, .slider .slick-next').addClass('inverse');
        } else {
            $('.slider .slick-prev, .slider .slick-next').removeClass('inverse');
        }

    });

    $('.realme-8pro-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: false
                }
            }
        ]
    }).on('setPosition', function(event, slick) {
        $('.realme-8pro-slider .slick-dots li button.active').removeClass('active');
        $('.realme-8pro-slider .slick-dots li button').eq($('.realme-8pro-slider').slick('slickCurrentSlide')).addClass('active');
    });

	$('body').on('click', '.realme-c-video-link', function(e) {
        $('.realme-c-video.start').removeClass('start');
		$('.realme-c-video-player').html('<div id="realme-c-video-player"></div>');
		$(this).parent().addClass('start');
        var curVideoID = $(this).attr('data-video');

        var player;
        player = new YT.Player('realme-c-video-player', {
            videoId: curVideoID,
            playerVars: {
                'autoplay' : 1,
                'controls': 1,
                'modestbranding': 1
            },
            events: {
                'onReady': onPlayerReady
            }
        });

        function onPlayerReady(event) {
            event.target.playVideo();
        }

		e.preventDefault();
	});

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('data-window'));
        if ($(this).hasClass('window-link-video')) {
            $('.window-video-player').html('<div id="window-video-player"></div>');
            var curVideoID = $(this).attr('data-video');

            var player;
            player = new YT.Player('window-video-player', {
                videoId: curVideoID,
                playerVars: {
                    'autoplay' : 1,
                    'controls': 1,
                    'modestbranding': 1
                },
                events: {
                    'onReady': onPlayerReady
                }
            });

            function onPlayerReady(event) {
                event.target.playVideo();
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

});

function windowOpen(windowID) {
    var curPadding = $('.wrapper').width();
    var curWidth = $(window).width();
    if (curWidth < 480) {
        curWidth = 480;
    }
    var curScroll = $(window).scrollTop();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    $('.wrapper').css({'top': -curScroll});
    $('.wrapper').data('curScroll', curScroll);
    $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

    $('.window[data-window="' + windowID + '"]').addClass('visible');
}

function windowClose() {
    $('.window').removeClass('visible');
    $('.window-video-player').html('');
    $('html').removeClass('window-open');
    $('body').css({'margin-right': 0});
    $('.wrapper').css({'top': 0});
    $('meta[name="viewport"]').attr('content', 'width=device-width');
    $(window).scrollTop($('.wrapper').data('curScroll'));
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if ($(window).scrollTop() > $(window).height() / 2) {
        $('.up-link').addClass('visible');
    } else {
        $('.up-link').removeClass('visible');
    }
});