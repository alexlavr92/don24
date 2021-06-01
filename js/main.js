'use strict'
var docWidth = $(document).width()
var WindowHeight = $(window).height()

/* Function Block Scroll */
var blockScroll = function (state) {
    if (state == "open") {
        setTimeout(function () {

            if (!document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
            }

        }, 10);
    }
    if (state == "close") {
        if (document.body.hasAttribute('data-body-scroll-fix')) {

            let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

            document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';

            window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение

        }
    }
}
//----------------------//


jQuery(document).ready(function ($) {
    'use strict'
    // Init marquee //
    if ($('.marquee-block').length > 0) {
        $('.marquee-block').marquee({
            //speed in milliseconds of the marquee
            duration: 45000,
            //gap in pixels between the tickers
            gap: 10,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            pauseOnHover: true,
            startVisible: true,
        });
    }
    //----------------------//



    // Инициализация верхнего слайдера на главной странице //
    var InitTopSlider = function (slider, index) {
        top_slider[index] = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 8,
            grabCursor: true,
            speed: 1000,
            touchReleaseOnEdges: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            /*  lazy: true, */
            /*  freeMode: true, */
            navigation: {
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
                disabledClass: 'disabled'
            },
            pagination: {
                el: slider.next('.slider-pagination-block'),
                lockClass: 'lock',
                clickable: true,
                bulletClass: 'slider-pagination-item',
                bulletActiveClass: 'active',
                type: 'bullets',
            },
            breakpoints: {
                768: {
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                    /*  freeMode: false, */
                },
            },
        })
    }
    if ($('.top-slider-container').length) {
        var top_slider = []
        $('.top-slider-container').each(function (i, elem) {
            InitTopSlider($(this), i)
        })
        console.log(top_slider)
        $(top_slider).each(function () {
            let LoadImageText = function ($this, ActiveIndex) {
                var ActiveSlideElement = $($this.slides).eq(ActiveIndex),
                    ActivePicture = ActiveSlideElement.find('picture'),
                    ActivePictureSource = ActivePicture.children('source'),
                    ActivePictureImg = ActivePicture.children('img'),
                    ActiveText = ActiveSlideElement.find('.top-slider-slide_text')
                /*   console.log(ActiveSlideElement) */
                ActivePictureSource.attr('srcset', ActivePictureSource.attr('data-srcset')).removeAttr('data-srcset')
                ActivePictureSource.attr('media', ActivePictureSource.attr('data-media')).removeAttr('data-media')
                ActivePictureImg.attr('src', ActivePictureImg.attr('data-src')).removeAttr('data-src')
                ActiveSlideElement.find('.swiper-lazy-preloader').remove()

                ActiveText.fadeIn({
                    duration: 200,
                    start: function () {
                        $(this).css({
                            'display': 'flex'
                        })
                    }
                })
            }
            this.on('slideChangeTransitionEnd', function () {
                console.log(this.activeIndex)
                LoadImageText(this, this.activeIndex)
            })

            LoadImageText(this, this.activeIndex)
        })
    }
    //----------------------//


    // Init ScrollBar
    if ($('.scrollbar-inner').length) {
        $('.scrollbar-inner').scrollbar({
            ignoreMobile: true,
        });
    }
    //----------------------//


    // обработчик клина на переключение программ сейчас в эфире //
    $('body').on('click', '.live-tabs-switcher', function (e) {
        e.preventDefault()
        if ($(this).hasClass('active')) {
            return
        }
        var $this = $(this)
        $this.siblings('.active').removeClass('active')
        $this.addClass('active')
        var $thisVideoImg = $this.attr('href'),
            liveContent =
                $this.parents('.live-tabs-wrapper').find('.live-tabs-content')
        liveContent.hide().fadeIn({
            start: function () {
                $(this).attr('style', 'background-image: url(' + $thisVideoImg + ');')
            }
        })
    })
    //----------------------//



    // Инициализация слайдере с 3 слайдами //
    var Init3stSlider = function (slider) {
        three_st_slider = new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 8,
            grabCursor: true,
            speed: 1000,
            touchReleaseOnEdges: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            lazy: true,
            /*   direction: 'vertical', */
            /*  freeMode: true, */
            navigation: {
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
                disabledClass: 'disabled'
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
            },
        })
    }
    if ($('.st3-slider-container').length && docWidth > 767) {
        var three_st_slider
        Init3stSlider($('.st3-slider-container'))
    }
    //----------------------//

    // Инициализация слайдере с 2 слайдами //
    var Init2stSlider = function (slider) {
        two_st_slider = new Swiper(slider, {
            slidesPerView: 2,
            spaceBetween: 8,
            grabCursor: true,
            speed: 1000,
            touchReleaseOnEdges: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            lazy: true,
            /*   direction: 'vertical', */
            /*  freeMode: true, */
            navigation: {
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
                disabledClass: 'disabled'
            },
            /*         breakpoints: {
                        768: {
                            spaceBetween: 8,
                            slidesPerView: 3,
                        },
                        1200: {
                            spaceBetween: 8,
                            slidesPerView: 2,
                        },
                    }, */
        })
    }
    if ($('.st2-slider-container').length && docWidth > 767) {
        var two_st_slider
        Init2stSlider($('.st2-slider-container'))
    }
    //----------------------//

    // Инициализация слайдере с 4 слайдами //
    var Init4stSlider = function (slider) {
        four_st_slider = new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 8,
            /*  setWrapperSize: true, */
            grabCursor: true,
            speed: 1000,
            touchReleaseOnEdges: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            /*  direction: 'vertical', */
            watchOverflow: true,
            lazy: true,
            /*  freeMode: true, */
            navigation: {
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
                disabledClass: 'disabled'
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                },
            },
        })
    }
    if ($('.st4-slider-container').length && docWidth >= 768) {
        var four_st_slider
        Init4stSlider($('.st4-slider-container'))
    }
    //----------------------//


    // Инициализация слайдере с 1 слайдом //
    var Init1stSlider = function (slider) {
        var paginationBlock = slider.next('.slider-pagination-block');
        first_st_slider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 16,
            grabCursor: true,
            speed: 1000,
            lazy: true,
            touchReleaseOnEdges: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            navigation: {
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
                disabledClass: 'disabled'
            },
            pagination: {
                el: paginationBlock,
                lockClass: 'lock',
                clickable: true,
                bulletClass: 'slider-pagination-item',
                bulletActiveClass: 'active',
                type: 'bullets',
            },
            breakpoints: {
                768: {
                    spaceBetween: 8,
                },
            },
        })
    }
    if ($('.st1-slider-container').length) {
        var first_st_slider
        Init1stSlider($('.st1-slider-container'))
    }
    //----------------------//

    // Плавный скролл к верху страницы //
    $('body').on('click', '.top-link', function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    })
    //----------------------//

    // Плавный скролл к якорям //
    $("body").on('click', '[href*="#"]', function (e) {
        var fixed_offset
        if (docWidth >= 1200)
            fixed_offset = $('header .bottom-header-wrapper').innerHeight();
        else {
            fixed_offset = $('header').innerHeight();
        }
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset - 50 }, 1000);
        e.preventDefault();
        return false
    });
    //----------------------//


    // Проверяем если ли на странице блок с социальными сетями и инициализируем добавление анимации //
    if ($('.social-wrapper').length && docWidth >= 1200) {
        var SocialWrapper = $('.social-wrapper')
        var SocialWrapperOffsetTop = SocialWrapper.offset().top
        /* console.log(SocialWrapperOffsetTop) */

        $(window).scroll(function () {
            var ThisScrollTop = $(this).scrollTop()
            var ThisScrollTopWindow = ThisScrollTop + $(window).height()
            /*  console.log('отступ сверху ' + ThisScrollTopWindow) */

            if (ThisScrollTopWindow > SocialWrapperOffsetTop) {
                var SocialWrapperBg = SocialWrapper.find('.social-wrapper-bg')
                SocialWrapperBg.addClass('animate-init')
            }
        })
    }
    //----------------------//

    // Замена фона в блоке социальных сетей в адаптиве //
    if ($('.social-wrapper-bg').length && docWidth < 1200) {
        console.log($('.social-wrapper-bg').attr('data-bg-mobile'))
        console.log('url(' + $('.social-wrapper-bg').attr('data-bg-mobile') + ');')
        $('.social-wrapper-bg').css({
            'background-image': 'url(' + $('.social-wrapper-bg').attr('data-bg-mobile') + ')',
        })
    }
    //----------------------//

    // Перенос блока подписка в смартфоне //
    if (docWidth < 768 && $('.footer-subscribe-wrapper').length) {
        $('.footer-subscribe-wrapper').insertAfter('.footer-address-copyright')
    }
    //----------------------//

    // Функционал ленивой загрузки //
    let LazyLoad = function (AllSlides) {

        let Load = function (NowSlide, scrollTop) {
            if (scrollTop >= ($(NowSlide).offset().top - ($(window).height())) ||
                (scrollTop == 0 && $(NowSlide).offset().top < $(window).height() && $(NowSlide).offset().top != 0)) {
                $(NowSlide).parent('.swiper-slide').addClass('swiper-slide-visible')
                $(NowSlide).css({
                    'background-image': 'url(' + $(NowSlide).attr('data-background') + ')',
                }).addClass('lazy-init')
                $(NowSlide).removeAttr('data-background')
                $(NowSlide).find('.swiper-lazy-preloader').remove()

            }
            else
                return false
        }

        var ThisScrollTop = $(window).scrollTop()
        AllSlides.each(function (index, elem) {
            /*  console.log(elem) */
            if (!$(elem).hasClass('lazy-init')) {
                Load($(elem), ThisScrollTop)
            }
        })
        $(window).scroll(function () {
            ThisScrollTop = $(this).scrollTop()
            AllSlides = AllSlides.filter(':not(.lazy-init)')
            /*   console.log(AllSlides) */
            AllSlides.each(function (index, elem) {
                if (!$(elem).hasClass('lazy-init')) {
                    Load($(elem), ThisScrollTop)
                }
            })
            return false
        })
        return false
    }

    if (docWidth < 768 && $('.slider-wrapper:not(.top-slider-wrapper):not(.st1-slider-wrapper)').length) {
        var AllSlides = $('.slider-wrapper:not(.top-slider-wrapper):not(.st1-slider-wrapper) .swiper-slide .swiper-lazy')
        LazyLoad(AllSlides)
    }

    if ($('.lazy-load').length) {
        var AllLazySlides = $('.lazy-load')
        LazyLoad(AllLazySlides)
    }
    //----------------------//

    // Функционал закрепления верхнего меню при скролле //
    var lastScrollTop = 0,
        FixedMenuPosition
    if (docWidth >= 1200) {
        var FixedMenu = $('.bottom-header-wrapper')
        FixedMenuPosition = FixedMenu.offset().top
    }
    else {
        FixedMenuPosition = 0
    }
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop()
        /* console.log(scrollTop) */
        /*         if (docWidth >= 1200) { */
        if (!$('header').hasClass('sticky') && scrollTop > FixedMenuPosition) {
            $('header').addClass('sticky')
            if (docWidth >= 1200) {
                $('header.sticky').css({
                    'padding-bottom': FixedMenu.innerHeight(),
                })
            }
            else {
                $('main').css({
                    'padding-top': $('header').innerHeight()
                })
            }
        }
        if ($('header').hasClass('sticky') && scrollTop <= FixedMenuPosition && !$('header').hasClass('open')) {
            $('header').removeClass('sticky')
            if (docWidth >= 1200) {
                $('header').css({
                    'padding-bottom': '',
                })
            }
            else {
                $('main').css({
                    'padding-top': '',
                })
            }
        }
    })
    //----------------------//

    // Обработчик клика на открытие меню в адаптиве //
    $('body').on('touchstart', '.header-mob-switcher', function (e) {
        var $Header = $(this).parents('header'),
            $HeaderTop = $Header.find('.top-header-wrapper'),
            $HeaderBottom = $Header.find('.bottom-header-wrapper')
        if (!$Header.hasClass('open')) {
            $Header.addClass('open').css({ 'padding-top': $Header.find('.middle-header-wrapper').innerHeight() + 'px' })
            blockScroll('open')
            $HeaderBottom.fadeIn()
            $HeaderTop.fadeIn({
                start: function () {
                    $Header.attr('state', 'open')
                },
            })
        }
        else {
            $HeaderBottom.fadeOut({
                complete: function () {
                    $(this).attr('style', '')
                },
            })
            $HeaderTop.fadeOut({
                start: function () {
                    $Header.attr('state', 'close')
                    $Header.removeClass('open').css({ 'padding-top': '' })
                },
                complete: function () {
                    blockScroll('close')
                    $(this).attr('style', '')
                },
            })
        }
        return false
    })
    $('body').on('click', '.bottom-header-menu_link .parent > span', function (e) {
        e.preventDefault()
        var $ThisParent = $(this).parent('.parent')
        if ($ThisParent.attr('state') != 'open') {
            $ThisParent.attr('state', 'open')
        }
        else {
            $ThisParent.attr('state', 'close')
        }
        return false
    })
    //----------------------//

    // Функционал работы табов
    $('body').on('click', '.tabs-switchers li:not(.active) a', function (e) {
        e.preventDefault();
        var NowParentLi = $(this).parent('li'),
            NowIndex = NowParentLi.index(),
            NowParents = $(this).parents('.tabs-wrapper')
        console.log('Номер текущей вкладки: ' + NowIndex + 1)

        NowParentLi.siblings('.active').removeClass('active')
        NowParentLi.addClass('active')

        NowParents.find('.tab-pane.active').fadeOut({
            duration: 150,
            complete: function () {
                $(this).removeClass('active')
                NowParents.find('.tab-pane:eq(' + NowIndex + ')').fadeIn({
                    start: function () { $(this).addClass('active') },
                })
            },
        })
    })
    //----------------------//

    // Горизонтальный скролл до активного таба //
    let scrollActiveTabSwitcher = function (docWidth) {
        if ($('.tabs-switchers').length && docWidth < 1200) {
            var offsetLeftType = /* $('.catalog-auto-type.active').offset().left - parseInt($('.new-container').css('padding-left')) */
                $('.tabs-switchers .active').offset().left - ($('.tabs-switchers').width() - $('.tabs-switchers .active').innerWidth()) / 2
            /*  console.log(offsetLeftType)
             console.log(($(window).width() - $('.catalog-auto-type.active').innerWidth()) / 2) */
            $('.tabs-switchers').animate({
                scrollLeft: offsetLeftType
            }, 1500);
        }
    }
    scrollActiveTabSwitcher(docWidth)
    // ------------------------------- //


    // Инициализация календарей //
    if ($('#date-start').length > 0 && $('#date-end').length > 0) {
        let InitDatePicker = function ($this) {
            $this.datetimepicker({
                locale: 'ru',
                /*  icons: {
                     time: "fa fa-clock-o",
                     date: "fa fa-calendar",
                     up: "fa fa-arrow-up",
                     down: "fa fa-arrow-down"
                 }, */
                stepping: 1,
                /* debug: true, */
                defaultDate: 'now',
                format: 'DD.MM.YY',
                ignoreReadonly: true,
                tooltips: {
                    today: 'Сегодня',
                    clear: 'Очистить',
                    close: 'Закрыть',
                    selectMonth: 'Выбрать месяц',
                    prevMonth: 'Пред. месяц',
                    nextMonth: 'След. месяц',
                    selectYear: 'Выбрать год',
                    prevYear: 'Пред. год',
                    nextYear: 'След. год',
                    selectDecade: 'Выбрать декаду',
                    prevDecade: 'Пред. декада',
                    nextDecade: 'След. декада',
                    prevCentury: 'Пред. век',
                    nextCentury: 'След. век'
                }
            });
            /* $this */
            return false
        }
        InitDatePicker($('#date-start'))
        InitDatePicker($('#date-end'))
    }

    /*  $('body').on('click', '.date-input-wrapper', function (e) {
         $(this).data("DateTimePicker").toggle()
     }) */
    $("#date-start").on("dp.change", function (e) {
        $('#date-end').data("DateTimePicker").minDate(e.date);
        // Вывод даты первого календаря
        console.log(e.date)
    });
    $("#date-end").on("dp.change", function (e) {
        $('#date-start').data("DateTimePicker").maxDate(e.date);
        // Вывод даты второго календаря
        console.log(e.date._i)
    });
    //----------------------//


    $('body.program-page').on('click', '.news-release-wrapper .link', function (e) {
        /* console.log($(this)) */
        e.preventDefault()
        var FormSearch = $(this).parent('.link-wrapper').next('.form-news-release')
        if (!FormSearch.hasClass('open')) {
            FormSearch.fadeIn({
                start: function () {
                    $(this).css({
                        'display': 'flex',
                    })
                },
                complete: function () {
                    $(this).addClass('open')
                },
            })
        }
    })
})