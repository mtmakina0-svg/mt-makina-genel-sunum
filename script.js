/**
 * MT MAKINA B2B PRESENTATION
 * Premium Scrollytelling JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    initScrollAnimations();
    initNavigationDots();
    initVideoPlayers();
    initCounterAnimations();
    initCastrolGallery();
    initScrollIndicator();
    initPresentationMode();
});

/**
 * Video Players - YouTube autoplay on scroll
 */
function initVideoPlayers() {
    const videoSection = document.getElementById('section-video');
    const videoIframe = document.getElementById('ytPlayer');

    if (!videoSection || !videoIframe) return;

    let player = null;

    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('ytPlayer', {
            events: {
                'onReady': function (event) {
                    // Create intersection observer for autoplay
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                                // Section is visible - play video
                                event.target.playVideo();
                            } else {
                                // Section is not visible - pause video
                                event.target.pauseVideo();
                            }
                        });
                    }, {
                        threshold: 0.5
                    });

                    observer.observe(videoSection);
                }
            }
        });
    };
}



/**
 * Presentation Mode - Timer, Controls, Section Menu
 */
function initPresentationMode() {
    // Initialize Timer
    initPresentationTimer();

    // Initialize Controls
    initPresentationControls();

    // Initialize Section Menu
    initSectionMenu();

    // Initialize Keyboard Shortcuts
    initKeyboardShortcuts();
}

/**
 * Presentation Timer
 */
function initPresentationTimer() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (!timerDisplay) return;

    let seconds = 0;

    setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

/**
 * Presentation Controls (Buttons) - Menu and Fullscreen only
 * Prev/Next navigation is handled in initKeyboardShortcuts with debouncing
 */
function initPresentationControls() {
    const btnMenu = document.getElementById('btnMenu');
    const btnFullscreen = document.getElementById('btnFullscreen');

    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            toggleSectionMenu();
        });
    }

    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            toggleFullscreen();
        });
    }
}

/**
 * Section Menu
 */
function initSectionMenu() {
    const overlay = document.getElementById('sectionMenuOverlay');
    if (!overlay) return;

    const menuItems = overlay.querySelectorAll('.section-list li');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                toggleSectionMenu();
            }
        });
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            toggleSectionMenu();
        }
    });
}

function toggleSectionMenu() {
    const overlay = document.getElementById('sectionMenuOverlay');
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

/**
 * Fullscreen Toggle
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * Keyboard Shortcuts for Presentation
 */
let lastNavigationTime = 0;
const NAVIGATION_COOLDOWN = 500; // ms - prevents excessive scrolling

function initKeyboardShortcuts() {
    const sections = [
        document.getElementById('section-hero'),
        document.getElementById('section-about'),
        document.getElementById('section-parcalama'),
        document.getElementById('section-yakma'),
        document.getElementById('section-ayristirma'),
        document.getElementById('section-balya'),
        document.getElementById('section-tesisler'),
        document.getElementById('section-references'),
        document.getElementById('section-why-us'),
        document.getElementById('section-contact')
    ].filter(Boolean);

    function getCurrentSectionIndex() {
        let current = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                current = index;
            }
        });
        return current;
    }

    function navigateToSection(index) {
        const now = Date.now();
        if (now - lastNavigationTime < NAVIGATION_COOLDOWN) return;
        lastNavigationTime = now;

        if (index >= 0 && index < sections.length && sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    function goToPreviousSection() {
        const current = getCurrentSectionIndex();
        if (current > 0) {
            navigateToSection(current - 1);
        }
    }

    function goToNextSection() {
        const current = getCurrentSectionIndex();
        if (current < sections.length - 1) {
            navigateToSection(current + 1);
        }
    }

    document.addEventListener('keydown', (e) => {
        const overlay = document.getElementById('sectionMenuOverlay');
        const isMenuOpen = overlay && overlay.classList.contains('active');
        const isInputFocused = document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA';

        if (isInputFocused) return;

        // M key - Toggle menu
        if (e.key === 'm' || e.key === 'M') {
            e.preventDefault();
            toggleSectionMenu();
            return;
        }

        // ESC key - Close menu
        if (e.key === 'Escape' && isMenuOpen) {
            toggleSectionMenu();
            return;
        }

        // F key - Fullscreen
        if ((e.key === 'f' || e.key === 'F') && !isMenuOpen) {
            e.preventDefault();
            toggleFullscreen();
            return;
        }

        // Arrow Keys + Page Up/Down for section navigation
        if (!isMenuOpen) {
            // Up Arrow, Page Up - Previous Section
            if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                goToPreviousSection();
                return;
            }

            // Down Arrow, Page Down, Space - Next Section
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                goToNextSection();
                return;
            }

            // Home - First Section
            if (e.key === 'Home') {
                e.preventDefault();
                navigateToSection(0);
                return;
            }

            // End - Last Section
            if (e.key === 'End') {
                e.preventDefault();
                navigateToSection(sections.length - 1);
                return;
            }

            // Left Arrow - Previous Section (alternative)
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPreviousSection();
                return;
            }

            // Right Arrow - Next Section (alternative)
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToNextSection();
                return;
            }

            // Number keys 1-9 and 0 for direct section navigation
            if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e.key)) {
                e.preventDefault();
                const index = e.key === '0' ? 9 : parseInt(e.key) - 1;
                navigateToSection(index);
                return;
            }
        }
    });

    // Also update button click handlers to use debouncing
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');

    if (btnPrev) {
        btnPrev.onclick = (e) => {
            e.preventDefault();
            goToPreviousSection();
        };
    }

    if (btnNext) {
        btnNext.onclick = (e) => {
            e.preventDefault();
            goToNextSection();
        };
    }
}

/**
 * Scroll Indicator - Hide on scroll
 */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });
}

/**
 * Progress Bar
 */
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Navigation Dots
 */
function initNavigationDots() {
    const dots = document.querySelectorAll('.dot');
    const sections = [
        document.getElementById('section-hero'),
        document.getElementById('section-about'),
        document.getElementById('section-parcalama'),
        document.getElementById('section-yakma'),
        document.getElementById('section-ayristirma'),
        document.getElementById('section-balya'),
        document.getElementById('section-tesisler'),
        document.getElementById('section-references'),
        document.getElementById('section-why-us'),
        document.getElementById('section-contact')
    ];

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (sections[index]) {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = sections.indexOf(entry.target);
                if (sectionIndex !== -1) {
                    dots.forEach(d => d.classList.remove('active'));
                    dots[sectionIndex].classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section) observer.observe(section);
    });
}

/**
 * Video Players
 */
function initVideoPlayers() {
    const playButtons = document.querySelectorAll('.play-button');

    playButtons.forEach(button => {
        const videoId = button.dataset.video;
        const video = document.getElementById(videoId);

        if (!video) return;

        button.addEventListener('click', () => {
            if (video.paused) {
                document.querySelectorAll('.showcase-video').forEach(v => {
                    if (v !== video) {
                        v.pause();
                        const otherBtn = document.querySelector(`[data-video="${v.id}"]`);
                        if (otherBtn) otherBtn.classList.remove('playing');
                    }
                });

                video.play();
                button.classList.add('playing');
            } else {
                video.pause();
                button.classList.remove('playing');
            }
        });

        video.addEventListener('ended', () => {
            button.classList.remove('playing');
        });

        video.addEventListener('pause', () => {
            button.classList.remove('playing');
        });

        video.addEventListener('click', () => {
            button.click();
        });
    });
}

/**
 * Counter Animations
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2500; // Longer duration for smoother animation
    const startTime = performance.now();
    const startValue = 0;
    let lastUpdateTime = 0;
    const updateInterval = 50; // Update every 50ms to reduce jitter

    const isDecimal = target % 1 !== 0;
    const decimalPlaces = isDecimal ? (target.toString().split('.')[1]?.length || 1) : 0;

    // Set initial width to prevent layout shift
    const finalText = isDecimal ? target.toFixed(decimalPlaces) : target.toLocaleString('tr-TR');
    element.style.minWidth = `${finalText.length * 0.6}em`;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smoother easing function (ease-out-quart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentValue = startValue + (target - startValue) * easeOutQuart;

        // Throttle updates to prevent jitter
        if (currentTime - lastUpdateTime >= updateInterval || progress >= 1) {
            lastUpdateTime = currentTime;

            if (isDecimal) {
                element.textContent = currentValue.toFixed(decimalPlaces);
            } else {
                element.textContent = Math.floor(currentValue).toLocaleString('tr-TR');
            }
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(decimalPlaces);
            } else {
                element.textContent = target.toLocaleString('tr-TR');
            }
        }
    }

    requestAnimationFrame(updateCounter);
}

/**
 * Castrol Gallery Slider
 */
function initCastrolGallery() {
    const track = document.querySelector('.gallery-track');
    const prevBtn = document.getElementById('castrolPrev');
    const nextBtn = document.getElementById('castrolNext');

    if (!track || !prevBtn || !nextBtn) return;

    const slides = track.querySelectorAll('.gallery-slide');
    let currentIndex = 0;
    const slidesToShow = window.innerWidth > 992 ? 2 : 1;
    const maxIndex = Math.max(0, slides.length - slidesToShow);

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + 20; // Including gap
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateSlider();
    });

    // Auto-play
    let autoplayInterval = setInterval(() => {
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    }, 4000);

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateSlider();
        }, 4000);
    });

    // Resize handler
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlider();
    });
}

/**
 * Smooth Scroll
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/**
 * Keyboard Navigation (with debounce)
 */
let isNavigating = false;

document.addEventListener('keydown', (e) => {
    // Skip if menu is open
    const overlay = document.getElementById('sectionMenuOverlay');
    if (overlay && overlay.classList.contains('active')) return;

    // Skip if already navigating (debounce)
    if (isNavigating) return;

    const sections = [
        document.getElementById('section-hero'),
        document.getElementById('section-about'),
        document.getElementById('section-parcalama'),
        document.getElementById('section-yakma'),
        document.getElementById('section-ayristirma'),
        document.getElementById('section-balya'),
        document.getElementById('section-tesisler'),
        document.getElementById('section-references'),
        document.getElementById('section-why-us'),
        document.getElementById('section-contact')
    ];

    const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
    });

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextSection = sections[currentSection + 1];
        if (nextSection) {
            isNavigating = true;
            nextSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isNavigating = false; }, 800);
        }
    }

    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const targetIndex = currentSection <= 0 ? 0 : currentSection - 1;
        const prevSection = sections[targetIndex];
        if (prevSection) {
            isNavigating = true;
            prevSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isNavigating = false; }, 800);
        }
    }
});

/**
 * Lazy load images
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
