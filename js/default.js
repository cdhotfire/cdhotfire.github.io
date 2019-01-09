$(window).load(function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});
$(document).ready(function () {
    //parallax
    $('.parallax-window').parallax();
});

// wow
new WOW({
    offset: 50
}).init();

// Back to Top
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
/*==============================
    3. TimeCircles Countdown
==============================*/
/*  */
$(".countdown").TimeCircles({
    fg_width: 0.02,
    bg_width: 0.3,
    circle_bg_color: 'white',
    time: {
        Days: { color: 'white' },
        Hours: { color: 'white' },
        Minutes: { color: 'white' },
        Seconds: { color: 'white' }
    },
    count_past_zero: false
});
$(window).on("resize", function () {
    $(".countdown").TimeCircles().rebuild();
});