$(function () {
    $('.top-slider__inner').slick({
        dots: true,
        arrows: false,
    });

    
    let containerEl1 = document.querySelector('.products');
    let containerEl2 = document.querySelector('.design');
    let config = {
        controls: {
            scope: 'local',
        },
    };
    (() => mixitup(containerEl1, config))();
    (() => mixitup(containerEl2, config))();
});

