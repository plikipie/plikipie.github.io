$('.page-scroll').on('click', function(event) {
    var tujuan = $(this).attr('href');
    var elemenTujuan = $(tujuan);
    $('html,body').animate({
        scrollTop: elemenTujuan.offset().top - 50
    }, 1250, 'swing');
    event.prefentDefault();
});