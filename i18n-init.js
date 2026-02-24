// i18n-init.js — Maps HTML elements to translation keys
// This file runs on DOMContentLoaded to tag all translatable elements

document.addEventListener('DOMContentLoaded', function () {

    // Helper: set data-i18n on single el
    function tag(selector, key) {
        var el = document.querySelector(selector);
        if (el) el.setAttribute('data-i18n', key);
    }
    // Helper: set data-i18n-html (for elements containing HTML like <br>, <span>)
    function tagH(selector, key) {
        var el = document.querySelector(selector);
        if (el) el.setAttribute('data-i18n-html', key);
    }
    // Helper: tag by nth-child within parent
    function tagNth(parentSel, childSel, index, key) {
        var parent = document.querySelector(parentSel);
        if (!parent) return;
        var children = parent.querySelectorAll(childSel);
        if (children[index]) children[index].setAttribute('data-i18n', key);
    }
    function tagNthH(parentSel, childSel, index, key) {
        var parent = document.querySelector(parentSel);
        if (!parent) return;
        var children = parent.querySelectorAll(childSel);
        if (children[index]) children[index].setAttribute('data-i18n-html', key);
    }

    // ==========================================
    // SECTION 1: HERO
    // ==========================================
    tag('#section-hero .hero-pre-title', 'hero.preTitle');
    tagH('#section-hero .hero-title', 'hero.title');
    tag('#section-hero .hero-subtitle', 'hero.subtitle');
    tag('#section-hero .hero-desc', 'hero.desc');

    // ==========================================
    // SECTION 2: VIDEO
    // ==========================================
    tag('.video-section .video-caption', 'video.caption');

    // ==========================================
    // SECTION 3: HAKKIMIZDA (About)
    // ==========================================
    tag('#section-about .section-tag', 'about.tag');
    tagH('#section-about h2', 'about.title');
    // about-text paragraphs (2)
    var aboutTexts = document.querySelectorAll('#section-about .about-text');
    if (aboutTexts[0]) aboutTexts[0].setAttribute('data-i18n', 'about.text1');
    if (aboutTexts[1]) aboutTexts[1].setAttribute('data-i18n', 'about.text2');
    // stat labels
    var statLabels = document.querySelectorAll('#section-about .stat-label');
    if (statLabels[0]) statLabels[0].setAttribute('data-i18n', 'about.stat1');
    if (statLabels[1]) statLabels[1].setAttribute('data-i18n', 'about.stat2');
    if (statLabels[2]) statLabels[2].setAttribute('data-i18n', 'about.stat3');
    // value cards (Misyon + Vizyon)
    var valueCards = document.querySelectorAll('#section-about .value-card');
    if (valueCards[0]) {
        var h3 = valueCards[0].querySelector('h3');
        var p = valueCards[0].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'about.mission.title');
        if (p) p.setAttribute('data-i18n', 'about.mission.text');
    }
    if (valueCards[1]) {
        var h3 = valueCards[1].querySelector('h3');
        var p = valueCards[1].querySelector('p');
        if (h3) h3.setAttribute('data-i18n', 'about.vision.title');
        if (p) p.setAttribute('data-i18n', 'about.vision.text');
    }

    // ==========================================
    // SECTION 4: PARÇALAMA MAKİNELERİ
    // ==========================================
    tag('#section-parcalama .section-tag', 'parcalama.tag');
    tagH('#section-parcalama .section-header h2', 'parcalama.title');
    tag('#section-parcalama .section-header .section-desc', 'parcalama.desc');

    // All product-showcase sections inside parcalama
    var parcShowcases = document.querySelectorAll('#section-parcalama .product-showcase');

    // --- CS Serisi (index 0) ---
    if (parcShowcases[0]) {
        var t = parcShowcases[0].querySelector('.showcase-title');
        var d = parcShowcases[0].querySelector('.showcase-desc');
        if (t) t.setAttribute('data-i18n', 'parcalama.cs.title');
        if (d) d.setAttribute('data-i18n', 'parcalama.cs.desc');
        var cards = parcShowcases[0].querySelectorAll('.machine-card');
        var csModels = ['cs20', 'cs40', 'cs60', 'cs80'];
        cards.forEach(function (card, i) {
            if (csModels[i]) {
                var p = card.querySelector('.machine-info p');
                if (p) p.setAttribute('data-i18n', 'parcalama.cs.' + csModels[i]);
            }
        });
    }

    // --- TSH Serisi (index 1) ---
    if (parcShowcases[1]) {
        var t = parcShowcases[1].querySelector('.showcase-title');
        var d = parcShowcases[1].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'parcalama.tsh.title');
        if (d) d.setAttribute('data-i18n', 'parcalama.tsh.desc');
        var cards = parcShowcases[1].querySelectorAll('.machine-card');
        var tshKeys = [
            { h: 'parcalama.tsh.60.h', p: 'parcalama.tsh.60.p' },
            { h: 'parcalama.tsh.80.h', p: 'parcalama.tsh.80.p' },
            { h: 'parcalama.tsh.100.h', p: 'parcalama.tsh.100.p' },
            { h: 'parcalama.tsh.130.h', p: 'parcalama.tsh.130.p' },
            { h: 'parcalama.tsh.160.h', p: 'parcalama.tsh.160.p' },
            { h: 'parcalama.tsh.200.h', p: 'parcalama.tsh.200.p' }
        ];
        cards.forEach(function (card, i) {
            if (tshKeys[i]) {
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (h4) h4.setAttribute('data-i18n', tshKeys[i].h);
                if (p) p.setAttribute('data-i18n', tshKeys[i].p);
            }
        });
    }

    // --- DS (Dört Şaftlı) (index 2) ---
    if (parcShowcases[2]) {
        var t = parcShowcases[2].querySelector('.showcase-title');
        var d = parcShowcases[2].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'parcalama.ds.title');
        if (d) d.setAttribute('data-i18n', 'parcalama.ds.desc');
        var cards = parcShowcases[2].querySelectorAll('.machine-card');
        var dsKeys = [
            { b: 'parcalama.ds.1.badge', h: 'parcalama.ds.1.h', p: 'parcalama.ds.1.p' },
            { b: 'parcalama.ds.2.badge', h: 'parcalama.ds.2.h', p: 'parcalama.ds.2.p' },
            { b: 'parcalama.ds.3.badge', h: 'parcalama.ds.3.h', p: 'parcalama.ds.3.p' },
            { b: 'parcalama.ds.4.badge', h: 'parcalama.ds.4.h', p: 'parcalama.ds.4.p' }
        ];
        cards.forEach(function (card, i) {
            if (dsKeys[i]) {
                var badge = card.querySelector('.model-badge');
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (badge) badge.setAttribute('data-i18n', dsKeys[i].b);
                if (h4) h4.setAttribute('data-i18n', dsKeys[i].h);
                if (p) p.setAttribute('data-i18n', dsKeys[i].p);
            }
        });
    }

    // --- Metal (index 3) ---
    if (parcShowcases[3]) {
        var t = parcShowcases[3].querySelector('.showcase-title');
        var d = parcShowcases[3].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'parcalama.metal.title');
        if (d) d.setAttribute('data-i18n', 'parcalama.metal.desc');
        var cards = parcShowcases[3].querySelectorAll('.machine-card');
        var metalKeys = [
            { b: 'parcalama.metal.1.badge', h: 'parcalama.metal.1.h', p: 'parcalama.metal.1.p' },
            { b: 'parcalama.metal.2.badge', h: 'parcalama.metal.2.h', p: 'parcalama.metal.2.p' },
            { b: 'parcalama.metal.3.badge', h: 'parcalama.metal.3.h', p: 'parcalama.metal.3.p' },
            { b: 'parcalama.metal.4.badge', h: 'parcalama.metal.4.h', p: 'parcalama.metal.4.p' }
        ];
        cards.forEach(function (card, i) {
            if (metalKeys[i]) {
                var badge = card.querySelector('.model-badge');
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (badge) badge.setAttribute('data-i18n', metalKeys[i].b);
                if (h4) h4.setAttribute('data-i18n', metalKeys[i].h);
                if (p) p.setAttribute('data-i18n', metalKeys[i].p);
            }
        });
    }

    // --- Mobil (index 4) ---
    if (parcShowcases[4]) {
        var t = parcShowcases[4].querySelector('.showcase-title');
        var d = parcShowcases[4].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'parcalama.mobil.title');
        if (d) d.setAttribute('data-i18n', 'parcalama.mobil.desc');
        var cards = parcShowcases[4].querySelectorAll('.machine-card');
        var mobilKeys = [
            { h: 'parcalama.mobil.1.h', p: 'parcalama.mobil.1.p' },
            { h: 'parcalama.mobil.2.h', p: 'parcalama.mobil.2.p' },
            { h: 'parcalama.mobil.3.h', p: 'parcalama.mobil.3.p' },
            { h: 'parcalama.mobil.4.h', p: 'parcalama.mobil.4.p' }
        ];
        cards.forEach(function (card, i) {
            if (mobilKeys[i]) {
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (h4) h4.setAttribute('data-i18n', mobilKeys[i].h);
                if (p) p.setAttribute('data-i18n', mobilKeys[i].p);
            }
        });
    }

    // ==========================================
    // SECTION 5: YAKMA FIRINLARI
    // ==========================================
    tag('#section-yakma .section-tag', 'yakma.tag');
    tagH('#section-yakma .section-header h2', 'yakma.title');
    tag('#section-yakma .section-header .product-long-desc', 'yakma.desc');
    var yakmaCards = document.querySelectorAll('#section-yakma .machine-card');
    var yakmaKeys = [
        { b: 'yakma.1.badge', h: 'yakma.1.h', p: 'yakma.1.p' },
        { b: 'yakma.2.badge', h: 'yakma.2.h', p: 'yakma.2.p' },
        { b: 'yakma.3.badge', h: 'yakma.3.h', p: 'yakma.3.p' },
        { b: 'yakma.4.badge', h: 'yakma.4.h', p: 'yakma.4.p' },
        { b: 'yakma.5.badge', h: 'yakma.5.h', p: 'yakma.5.p' },
        { b: 'yakma.6.badge', h: 'yakma.6.h', p: 'yakma.6.p' }
    ];
    yakmaCards.forEach(function (card, i) {
        if (yakmaKeys[i]) {
            var badge = card.querySelector('.model-badge');
            var h4 = card.querySelector('h4');
            var p = card.querySelector('.machine-info p');
            if (badge) badge.setAttribute('data-i18n', yakmaKeys[i].b);
            if (h4) h4.setAttribute('data-i18n', yakmaKeys[i].h);
            if (p) p.setAttribute('data-i18n', yakmaKeys[i].p);
        }
    });
    // Feature items in yakma
    var yakmaFeatures = document.querySelectorAll('#section-yakma .feature-item span');
    var yakmaFeatKeys = ['yakma.feat.1', 'yakma.feat.2', 'yakma.feat.3', 'yakma.feat.4', 'yakma.feat.5', 'yakma.feat.6'];
    yakmaFeatures.forEach(function (el, i) {
        if (yakmaFeatKeys[i]) el.setAttribute('data-i18n', yakmaFeatKeys[i]);
    });

    // ==========================================
    // SECTION 6: AYRIŞTIRMA SİSTEMLERİ
    // ==========================================
    tag('#section-ayristirma .section-tag', 'ayristirma.tag');
    tagH('#section-ayristirma .section-header h2', 'ayristirma.title');
    tag('#section-ayristirma .section-header .product-long-desc', 'ayristirma.desc');

    var ayristirmaShowcases = document.querySelectorAll('#section-ayristirma .product-showcase');

    // Tromel Elek (index 0)
    if (ayristirmaShowcases[0]) {
        var t = ayristirmaShowcases[0].querySelector('.showcase-title');
        var d = ayristirmaShowcases[0].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'ayristirma.tromel.title');
        if (d) d.setAttribute('data-i18n', 'ayristirma.tromel.desc');
        var cards = ayristirmaShowcases[0].querySelectorAll('.machine-card');
        var tromelKeys = [
            { b: 'ayristirma.tromel.1.badge', h: 'ayristirma.tromel.1.h', p: 'ayristirma.tromel.1.p' },
            { b: 'ayristirma.tromel.2.badge', h: 'ayristirma.tromel.2.h', p: 'ayristirma.tromel.2.p' },
            { b: 'ayristirma.tromel.3.badge', h: 'ayristirma.tromel.3.h', p: 'ayristirma.tromel.3.p' }
        ];
        cards.forEach(function (card, i) {
            if (tromelKeys[i]) {
                var badge = card.querySelector('.model-badge');
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (badge) badge.setAttribute('data-i18n', tromelKeys[i].b);
                if (h4) h4.setAttribute('data-i18n', tromelKeys[i].h);
                if (p) p.setAttribute('data-i18n', tromelKeys[i].p);
            }
        });
    }

    // Mobil Tromel (index 1)
    if (ayristirmaShowcases[1]) {
        var t = ayristirmaShowcases[1].querySelector('.showcase-title');
        var d = ayristirmaShowcases[1].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'ayristirma.mobilTromel.title');
        if (d) d.setAttribute('data-i18n', 'ayristirma.mobilTromel.desc');
        var cards = ayristirmaShowcases[1].querySelectorAll('.machine-card');
        var mtKeys = [
            { b: 'ayristirma.mobilTromel.1.badge', h: 'ayristirma.mobilTromel.1.h', p: 'ayristirma.mobilTromel.1.p' },
            { b: 'ayristirma.mobilTromel.2.badge', h: 'ayristirma.mobilTromel.2.h', p: 'ayristirma.mobilTromel.2.p' },
            { b: 'ayristirma.mobilTromel.3.badge', h: 'ayristirma.mobilTromel.3.h', p: 'ayristirma.mobilTromel.3.p' }
        ];
        cards.forEach(function (card, i) {
            if (mtKeys[i]) {
                var badge = card.querySelector('.model-badge');
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (badge) badge.setAttribute('data-i18n', mtKeys[i].b);
                if (h4) h4.setAttribute('data-i18n', mtKeys[i].h);
                if (p) p.setAttribute('data-i18n', mtKeys[i].p);
            }
        });
    }

    // Manyetik Konveyor (index 2)
    if (ayristirmaShowcases[2]) {
        var t = ayristirmaShowcases[2].querySelector('.showcase-title');
        var d = ayristirmaShowcases[2].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'ayristirma.manyetik.title');
        if (d) d.setAttribute('data-i18n', 'ayristirma.manyetik.desc');
        var cards = ayristirmaShowcases[2].querySelectorAll('.machine-card');
        var manyKeys = [
            { b: 'ayristirma.manyetik.1.badge', h: 'ayristirma.manyetik.1.h', p: 'ayristirma.manyetik.1.p' },
            { b: 'ayristirma.manyetik.2.badge', h: 'ayristirma.manyetik.2.h', p: 'ayristirma.manyetik.2.p' }
        ];
        cards.forEach(function (card, i) {
            if (manyKeys[i]) {
                var badge = card.querySelector('.model-badge');
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (badge) badge.setAttribute('data-i18n', manyKeys[i].b);
                if (h4) h4.setAttribute('data-i18n', manyKeys[i].h);
                if (p) p.setAttribute('data-i18n', manyKeys[i].p);
            }
        });
    }

    // Metal Seperatör (index 3)
    if (ayristirmaShowcases[3]) {
        var t = ayristirmaShowcases[3].querySelector('.showcase-title');
        var d = ayristirmaShowcases[3].querySelector('.product-long-desc');
        if (t) t.setAttribute('data-i18n', 'ayristirma.metalSep.title');
        if (d) d.setAttribute('data-i18n', 'ayristirma.metalSep.desc');
        var cards = ayristirmaShowcases[3].querySelectorAll('.machine-card');
        var msKeys = [
            { b: 'ayristirma.metalSep.1.badge', h: 'ayristirma.metalSep.1.h', p: 'ayristirma.metalSep.1.p' },
            { b: 'ayristirma.metalSep.2.badge', h: 'ayristirma.metalSep.2.h', p: 'ayristirma.metalSep.2.p' },
            { b: 'ayristirma.metalSep.3.badge', h: 'ayristirma.metalSep.3.h', p: 'ayristirma.metalSep.3.p' }
        ];
        cards.forEach(function (card, i) {
            if (msKeys[i]) {
                var badge = card.querySelector('.model-badge');
                var h4 = card.querySelector('h4');
                var p = card.querySelector('.machine-info p');
                if (badge) badge.setAttribute('data-i18n', msKeys[i].b);
                if (h4) h4.setAttribute('data-i18n', msKeys[i].h);
                if (p) p.setAttribute('data-i18n', msKeys[i].p);
            }
        });
    }

    // Feature items in ayristirma
    var ayristirmaFeatures = document.querySelectorAll('#section-ayristirma .feature-item span');
    var ayristirmaFeatKeys = ['ayristirma.feat.1', 'ayristirma.feat.2', 'ayristirma.feat.3', 'ayristirma.feat.4'];
    ayristirmaFeatures.forEach(function (el, i) {
        if (ayristirmaFeatKeys[i]) el.setAttribute('data-i18n', ayristirmaFeatKeys[i]);
    });

    // ==========================================
    // SECTION 7: BALYA PRESLERİ
    // ==========================================
    tag('#section-balya .section-tag', 'balya.tag');
    tagH('#section-balya .section-header h2', 'balya.title');
    tag('#section-balya .section-header .product-long-desc', 'balya.desc');
    var balyaCards = document.querySelectorAll('#section-balya .machine-card');
    var balyaKeys = [
        { b: 'balya.1.badge', h: 'balya.1.h', p: 'balya.1.p' },
        { b: 'balya.2.badge', h: 'balya.2.h', p: 'balya.2.p' },
        { b: 'balya.3.badge', h: 'balya.3.h', p: 'balya.3.p' },
        { b: 'balya.4.badge', h: 'balya.4.h', p: 'balya.4.p' }
    ];
    balyaCards.forEach(function (card, i) {
        if (balyaKeys[i]) {
            var badge = card.querySelector('.model-badge');
            var h4 = card.querySelector('h4');
            var p = card.querySelector('.machine-info p');
            if (badge) badge.setAttribute('data-i18n', balyaKeys[i].b);
            if (h4) h4.setAttribute('data-i18n', balyaKeys[i].h);
            if (p) p.setAttribute('data-i18n', balyaKeys[i].p);
        }
    });
    // Feature items in balya
    var balyaFeatures = document.querySelectorAll('#section-balya .feature-item span');
    var balyaFeatKeys = ['balya.feat.1', 'balya.feat.2', 'balya.feat.3', 'balya.feat.4'];
    balyaFeatures.forEach(function (el, i) {
        if (balyaFeatKeys[i]) el.setAttribute('data-i18n', balyaFeatKeys[i]);
    });

    // ==========================================
    // SECTION 8: TESİSLER
    // ==========================================
    tag('#section-tesisler .section-tag', 'tesisler.tag');
    tagH('#section-tesisler .section-header h2', 'tesisler.title');
    tag('#section-tesisler .section-header .product-long-desc', 'tesisler.desc');
    var facilityCards = document.querySelectorAll('#section-tesisler .facility-card');
    var tesisKeys = [
        { h: 'tesisler.1.h', p: 'tesisler.1.p' },
        { h: 'tesisler.2.h', p: 'tesisler.2.p' },
        { h: 'tesisler.3.h', p: 'tesisler.3.p' },
        { h: 'tesisler.4.h', p: 'tesisler.4.p' },
        { h: 'tesisler.5.h', p: 'tesisler.5.p' },
        { h: 'tesisler.6.h', p: 'tesisler.6.p' }
    ];
    facilityCards.forEach(function (card, i) {
        if (tesisKeys[i]) {
            var h4 = card.querySelector('h4');
            var p = card.querySelector('p');
            if (h4) h4.setAttribute('data-i18n', tesisKeys[i].h);
            if (p) p.setAttribute('data-i18n', tesisKeys[i].p);
        }
    });

    // ==========================================
    // SECTION 9: REFERANSLAR
    // ==========================================
    tag('#section-references .section-tag', 'ref.tag');
    tagH('#section-references .section-header h2', 'ref.title');
    tag('#section-references .section-header .section-desc', 'ref.desc');
    var rowTitles = document.querySelectorAll('#section-references .row-title');
    var rowKeys = ['ref.row1', 'ref.row2', 'ref.row3', 'ref.row4', 'ref.row5', 'ref.row6'];
    rowTitles.forEach(function (el, i) {
        if (rowKeys[i]) el.setAttribute('data-i18n', rowKeys[i]);
    });

    // ==========================================
    // SECTION 10: NEDEN BİZ
    // ==========================================
    tag('#section-why-us .section-tag', 'why.tag');
    tagH('#section-why-us .section-header h2', 'why.title');
    var whyCards = document.querySelectorAll('#section-why-us .why-card');
    var whyKeys = [
        { h: 'why.1.h', p: 'why.1.p' },
        { h: 'why.2.h', p: 'why.2.p' },
        { h: 'why.3.h', p: 'why.3.p' },
        { h: 'why.4.h', p: 'why.4.p' },
        { h: 'why.5.h', p: 'why.5.p' },
        { h: 'why.6.h', p: 'why.6.p' }
    ];
    whyCards.forEach(function (card, i) {
        if (whyKeys[i]) {
            var h3 = card.querySelector('h3');
            var p = card.querySelector('p');
            if (h3) h3.setAttribute('data-i18n', whyKeys[i].h);
            if (p) p.setAttribute('data-i18n', whyKeys[i].p);
        }
    });
    // Key stats
    var keyLabels = document.querySelectorAll('#section-why-us .key-label');
    var keyLabelKeys = ['why.stat1', 'why.stat2', 'why.stat3', 'why.stat4'];
    keyLabels.forEach(function (el, i) {
        if (keyLabelKeys[i]) el.setAttribute('data-i18n', keyLabelKeys[i]);
    });
    var keySuffixes = document.querySelectorAll('#section-why-us .key-suffix');
    var keySuffixKeys = ['why.suf1', 'why.suf2', 'why.suf3', 'why.suf4'];
    keySuffixes.forEach(function (el, i) {
        if (keySuffixKeys[i]) el.setAttribute('data-i18n', keySuffixKeys[i]);
    });

    // ==========================================
    // SECTION 11: İLETİŞİM (Contact)
    // ==========================================
    tag('#section-contact .section-tag', 'contact.tag');
    tagH('#section-contact .contact-header h2', 'contact.title');
    tag('#section-contact .contact-intro', 'contact.intro');
    var contactCards = document.querySelectorAll('#section-contact .contact-card');
    var contactKeys = ['contact.phone', 'contact.whatsapp', 'contact.email', 'contact.address'];
    contactCards.forEach(function (card, i) {
        if (contactKeys[i]) {
            var h3 = card.querySelector('h3');
            if (h3) h3.setAttribute('data-i18n', contactKeys[i]);
        }
    });
    // CTA buttons
    var ctaBtns = document.querySelectorAll('#section-contact .cta-button');
    if (ctaBtns[0]) ctaBtns[0].setAttribute('data-i18n', 'contact.cta1');
    if (ctaBtns[1]) ctaBtns[1].setAttribute('data-i18n', 'contact.cta2');

    // ==========================================
    // CLOSING
    // ==========================================
    tagH('.closing-section .closing-message', 'closing.message');
    tag('.closing-section .closing-submessage', 'closing.submessage');
    tag('.closing-section .closing-tagline', 'closing.tagline');

    // ======== INITIALIZE LANGUAGE ========
    if (typeof initLanguage === 'function') {
        initLanguage();
    }

    console.log('i18n-init: Tagged all elements and initialized language.');
});
