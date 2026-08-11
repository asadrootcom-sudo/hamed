document.addEventListener("DOMContentLoaded", function() {
  const arFeaturedSwiper = new Swiper('#ar-featured-projects-main-swiper', {
    direction: 'rtl',
    loop: true,
    grabCursor: true,
    simulateTouch: true,
    allowTouchMove: true,
    touchAngle: 30, 
    touchRatio: 1,
    threshold: 10,
    shortSwipes: false,
    longSwipesRatio: 0.25,
    followFinger: true,
    speed: 700,
    cssMode: false,
    freeMode: false,
    
    // تشغيل تلقائي صارم (5 ثواني، يتوقف عند التمرير)
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // لوحة المفاتيح
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // التحكم الدقيق في الشاشات
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 1, spaceBetween: 24 },
      992: { slidesPerView: 2, spaceBetween: 24 },
      1200: { slidesPerView: 3, spaceBetween: 32 }
    },

    navigation: {
      nextEl: '#ar-featured-projects-next',
      prevEl: '#ar-featured-projects-prev',
    },
    pagination: {
      el: '.ar-featured-projects__pagination',
      clickable: true,
    },

    a11y: {
      prevSlideMessage: 'السابق',
      nextSlideMessage: 'التالي',
    },
    
    preventInteractionOnTransition: true 
  });

  // أنيميشن الظهور وشريط التقدم
  const arFeaturedSection = document.getElementById('ar-featured-projects-section');
  if (!arFeaturedSection) return;

  const arFeaturedObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fadeElements = arFeaturedSection.querySelectorAll('.ar-featured-projects__anim-fade');
        fadeElements.forEach((el, index) => {
          setTimeout(() => el.classList.add('ar-featured-projects__is-visible'), index * 200);
        });

        setTimeout(() => {
          const progressBars = arFeaturedSection.querySelectorAll('.ar-featured-projects__progress-bar');
          progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          });
        }, 500);

        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  arFeaturedObserver.observe(arFeaturedSection);
});