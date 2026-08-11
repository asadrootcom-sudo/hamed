
    // === Loading Screen ===
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
      }, 600);
    });

    // === Navigation Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
      if (currentScroll > 500) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
      lastScroll = currentScroll;
    }, { passive: true });

    // === Active nav link ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

    // === Mobile Menu ===
    function toggleMobile() {
      document.getElementById('mobileMenu').classList.toggle('open');
      document.querySelector('.hamburger').classList.toggle('active');
      document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
    }
    function closeMobile() {
      document.getElementById('mobileMenu').classList.remove('open');
      document.querySelector('.hamburger').classList.remove('active');
      document.body.style.overflow = '';
    }

    // === Modal ===
    function openModal() {
      document.getElementById('quoteModal').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      document.getElementById('quoteModal').classList.add('hidden');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // === FAQ Accordion ===
    function toggleFaq(btn) {
      const item = btn.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      // Close all
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.querySelector('.faq-content').classList.add('hidden');
        faq.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
        faq.querySelector('.faq-icon').innerHTML = '<path d="M12 5v14M5 12h14"/>';
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(45deg)';
        icon.innerHTML = '<path d="M12 5v14M5 12h14"/>';
      }
    }

    // === Scroll Reveal (Intersection Observer) ===
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-right, .reveal-left, .reveal-scale').forEach(el => {
      revealObserver.observe(el);
    });

    // === Animated Counters ===
    let countersStarted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          document.querySelectorAll('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(eased * target);
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            }
            requestAnimationFrame(updateCounter);
          });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // === Hero Parallax ===
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
        }
      }, { passive: true });
    }

    // === Toast Notification ===
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // === Form Handlers ===
    function handleQuoteForm(e) {
      e.preventDefault();
      closeModal();
      showToast('تم إرسال طلب عرض السعر بنجاح! سيتواصل معك فريقنا قريباً.');
      e.target.reset();
    }

    function handleContactForm(e) {
      e.preventDefault();
      showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      e.target.reset();
    }

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
