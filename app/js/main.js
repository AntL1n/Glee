$(function () {

  $('.products__filter-btn').on('click', function (){
    $('.products__filter').slideToggle();
  })

  $('.menu__btn').on('click', function(){
    $('.menu__list').toggleClass('menu__list--active');
    $('.menu__btn').toggleClass('menu__btn--active');
  });

  $('.related__items').slick({
    dots: false,
    arrows: true,
    infinite: false,
    slidesToScroll: 4,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1201,
        settings:{
          slidesToScroll: 3,
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 871,
        settings:{
          slidesToScroll: 2,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 601,
        settings:{
          slidesToScroll: 1,
          slidesToShow: 1,
        }
      },

    ]
  })

  $('.product-tabs__top-item').on('click', function (e) {

    e.preventDefault();
    $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
    $(this).addClass('product-tabs__top-item--active');

    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');
  })

  $('.product-slide__thumb').slick({
    asNavFor: '.product-slide__big',
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    draggable: false
  });

  $('.product-slide__big').slick({
    asNavFor: '.product-slide__thumb',
    draggable: false,
    arrows: false,
    fade: true,
    responsive: [
      {
        breakpoint: 501,
        settings:{
          draggable: true,
        }
      },
    ]
  });

  $('.select-style, .product-one__item-num').styler();

  $('.products-content__filter-btn').on('click', function () {
    $('.products-content__filter-btn').removeClass('products-content__filter-btn--active')
    $(this).addClass('products-content__filter-btn--active')
  })

  $('.button-list').on('click', function () {
    $('.product__item').addClass('product__item--list')
    $('.products-content__inner').addClass('products-content__inner--list')
  })

  $('.button-grid').on('click', function () {
    $('.product__item').removeClass('product__item--list')
    $('.products-content__inner').removeClass('products-content__inner--list')
  })

   $(".star").rateYo({
    starWidth: "12px",
    normalFill: "#d6d6d6",
    ratedFill: "#ffcc00",
    readOnly: true
  });

   $(".product-one__item-star").rateYo({
    starWidth: "16px",
    normalFill: "#d6d6d6",
    ratedFill: "#ffcc00",
    readOnly: true
  });

  $('.filter-price__input').ionRangeSlider({
    type: "double",
    prefix: "$",
    onStart: function (data){
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
    onChange: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
      },
  });
  
  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000
  })

  var mixer = mixitup('.product__items');
  var mixer = mixitup('.design__items');
  
})