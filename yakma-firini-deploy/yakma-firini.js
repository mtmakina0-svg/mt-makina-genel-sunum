/**
 * MT MAKİNA — YAKMA FIRINI SUNUM JS
 * Language switching, scroll animations, presentation mode
 */
let currentLang = 'tr';

// ---- Language Switching ----
function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
    });
    const t = YF_TRANSLATIONS[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });
    document.documentElement.lang = lang === 'tr' ? 'tr' : lang === 'fr' ? 'fr' : 'en';
}

// ---- Init on DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initScrollAnimations();
    initNavigationDots();
    initCounterAnimations();
    initPresentationControls();
    initTimer();
    initParticles();
    initLightbox();
    initKeyboardNav();
});

// ---- Progress Bar ----
function initProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
    }, { passive: true });
}

// ---- Scroll Animations ----
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ---- Navigation Dots ----
function initNavigationDots() {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.section);
            if (sections[idx]) sections[idx].scrollIntoView({ behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const idx = Array.from(sections).indexOf(e.target);
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(s => observer.observe(s));
}

// ---- Counter Animations ----
function initCounterAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number, .key-number').forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target) || parseInt(el.textContent) || 0;
    if (target === 0) return;
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(update);
        else el.textContent = target;
    };
    requestAnimationFrame(update);
}

// ---- Presentation Controls ----
function initPresentationControls() {
    const sections = document.querySelectorAll('.section');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnFs = document.getElementById('btnFullscreen');

    function getCurrent() {
        let idx = 0, minDist = Infinity;
        sections.forEach((s, i) => {
            const d = Math.abs(s.getBoundingClientRect().top);
            if (d < minDist) { minDist = d; idx = i; }
        });
        return idx;
    }

    if (btnPrev) btnPrev.onclick = () => {
        const i = getCurrent();
        if (i > 0) sections[i - 1].scrollIntoView({ behavior: 'smooth' });
    };
    if (btnNext) btnNext.onclick = () => {
        const i = getCurrent();
        if (i < sections.length - 1) sections[i + 1].scrollIntoView({ behavior: 'smooth' });
    };
    if (btnFs) btnFs.onclick = () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
    };
}

// ---- Timer ----
function initTimer() {
    const el = document.getElementById('timerText');
    if (!el) return;
    const start = Date.now();
    setInterval(() => {
        const s = Math.floor((Date.now() - start) / 1000);
        const m = Math.floor(s / 60);
        el.textContent = String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    }, 1000);
}

// ---- Hero Particles ----
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        container.appendChild(p);
    }
}

// ---- Lightbox ----
function initLightbox() {
    const overlay = document.getElementById('lightbox');
    if (!overlay) return;
    const lbImg = overlay.querySelector('img');
    const close = overlay.querySelector('.lightbox-close');

    document.querySelectorAll('.model-gallery img, .model-image img, .gif-card img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lbImg.src = img.src;
            overlay.classList.add('active');
        });
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === close) {
            overlay.classList.remove('active');
            lbImg.src = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            lbImg.src = '';
        }
    });
}

// ---- Keyboard Navigation ----
function initKeyboardNav() {
    const sections = document.querySelectorAll('.section');
    let navigating = false;

    function getCurrent() {
        let idx = 0, minDist = Infinity;
        sections.forEach((s, i) => {
            const d = Math.abs(s.getBoundingClientRect().top);
            if (d < minDist) { minDist = d; idx = i; }
        });
        return idx;
    }

    document.addEventListener('keydown', (e) => {
        if (navigating) return;
        const cur = getCurrent();
        let target = -1;

        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            target = Math.min(cur + 1, sections.length - 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            target = Math.max(cur - 1, 0);
        } else if (e.key === 'Home') {
            e.preventDefault();
            target = 0;
        } else if (e.key === 'End') {
            e.preventDefault();
            target = sections.length - 1;
        }

        if (target >= 0 && target !== cur) {
            navigating = true;
            sections[target].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => navigating = false, 800);
        }
    });
}

// ---- Lazy Load Images ----
if ('IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const img = e.target;
                if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
                imgObs.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imgObs.observe(img));
}

// ---- Global Fire Particle System (Cross-Browser Optimized) ----
(function initFireParticles() {
    // requestAnimationFrame polyfill
    var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
              function(cb) { return setTimeout(cb, 16); };

    var canvas = document.createElement('canvas');
    canvas.id = 'fireCanvas';
    var s = canvas.style;
    s.position = 'fixed'; s.top = '0'; s.left = '0';
    s.width = '100%'; s.height = '100%';
    s.pointerEvents = 'none'; s.zIndex = '9999';
    s.opacity = '0.6';
    // Hardware acceleration hints
    s.webkitTransform = 'translateZ(0)';
    s.transform = 'translateZ(0)';
    s.willChange = 'contents';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for perf
    var W = 0, H = 0;
    var isVisible = true;

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', function() {
        isVisible = !document.hidden;
        if (isVisible) rAF(loop);
    }, false);

    var particles = [];
    var MAX = 50; // Balanced for perf

    var COLORS = [
        [245, 158, 11],  // amber
        [249, 115, 22],  // orange
        [239, 68, 68],   // red
        [251, 191, 36],  // yellow
        [217, 119, 6],   // dark amber
        [255, 200, 60],  // bright spark
    ];

    function create() {
        var c = COLORS[(Math.random() * COLORS.length) | 0];
        var side = Math.random();
        var x, y;

        if (side < 0.4) {
            x = Math.random() * W;
            y = H + 10;
        } else if (side < 0.6) {
            x = -5;
            y = H * 0.5 + Math.random() * H * 0.5;
        } else if (side < 0.8) {
            x = W + 5;
            y = H * 0.5 + Math.random() * H * 0.5;
        } else {
            x = Math.random() * W;
            y = Math.random() * H;
        }

        return {
            x: x, y: y,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -(0.5 + Math.random() * 2),
            sz: 1 + Math.random() * 3,
            life: 1,
            decay: 0.003 + Math.random() * 0.008,
            c: c,
            glow: 4 + Math.random() * 8,
            fl: Math.random() * 6.28,
            fs: 0.02 + Math.random() * 0.05,
            wb: Math.random() * 0.3,
        };
    }

    function update() {
        while (particles.length < MAX) {
            particles.push(create());
        }

        var i = particles.length;
        while (i--) {
            var p = particles[i];
            p.x += p.vx + Math.sin(p.fl) * p.wb;
            p.y += p.vy;
            p.vx += (Math.random() - 0.5) * 0.05;
            p.life -= p.decay;
            p.fl += p.fs;

            if (p.life <= 0 || p.y < -20 || p.x < -30 || p.x > W + 30) {
                particles.splice(i, 1);
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (var i = 0, n = particles.length; i < n; i++) {
            var p = particles[i];
            var alpha = p.life * (0.6 + 0.4 * Math.sin(p.fl));
            var r = p.c[0], g = p.c[1], b = p.c[2];

            // Outer glow
            var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow * p.life);
            grad.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.3) + ')');
            grad.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b + ',0)');
            ctx.beginPath();
            ctx.fillStyle = grad;
            ctx.arc(p.x, p.y, p.glow * p.life, 0, 6.2832);
            ctx.fill();

            // Core spark
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.sz * p.life, 0, 6.2832);
            var cr = Math.min(r + 40, 255), cg = Math.min(g + 40, 255);
            ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + b + ',' + alpha + ')';
            ctx.fill();
        }
    }

    function loop() {
        if (!isVisible) return;
        update();
        draw();
        rAF(loop);
    }

    rAF(loop);
})();

