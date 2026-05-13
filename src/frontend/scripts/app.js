/* =====================================================================
 * app.js – Interactive Engine (Jugendrat Baselland)
 * ---------------------------------------------------------------------
 * Verantwortlichkeiten:
 *   1. Burger-Menü / Mobile-Navigation
 *   2. Scroll-Reveal-Animationen
 *   3. Header automatisch beim Scrollen verstecken
 *   4. Apple-Style Horizontal-Scroll (Projekte)
 *   5. Dynamische Generatoren (Events, Bento, Team, Projekte, Film-Roll)
 *   6. Magnetische Buttons (Desktop)
 *   7. Kontaktformular-Submit (mit fetch zur PHP-API)
 * ===================================================================== */

'use strict';

/* ---------- Hilfsfunktionen ------------------------------------------ */

/** XSS-sichere HTML-Escape-Funktion (für dynamisch generiertes Markup). */
function escapeHTML(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Drosselung per requestAnimationFrame: stellt sicher, dass eine Callback
 * höchstens einmal pro Frame ausgeführt wird.
 */
function rafThrottle(fn) {
    let ticking = false;
    return function throttled(...args) {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            fn.apply(this, args);
            ticking = false;
        });
    };
}

document.addEventListener('DOMContentLoaded', () => {

    /* Touch- / Mobile-Erkennung */
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobile = () => window.innerWidth <= 900;

    /* =================================================================
     * 1. BURGER-NAVIGATION
     * ================================================================= */
    const burger     = document.getElementById('burgerBtn');
    const mobileNav  = document.getElementById('mobileNav');
    const backdrop   = document.getElementById('navBackdrop');
    const siteHeader = document.getElementById('siteheader'); // FIX: HTML-ID ist klein geschrieben

    if (burger && mobileNav) {

        const updateOverlayTop = () => {
            const headerH = siteHeader ? siteHeader.offsetHeight : 110;
            mobileNav.style.top = `${headerH}px`;
        };
        updateOverlayTop();

        const openMenu = () => {
            burger.classList.add('is-open');
            mobileNav.classList.add('is-open');
            if (backdrop) backdrop.classList.add('is-visible');
            burger.setAttribute('aria-expanded', 'true');
            mobileNav.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            burger.classList.remove('is-open');
            mobileNav.classList.remove('is-open');
            if (backdrop) backdrop.classList.remove('is-visible');
            burger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        burger.addEventListener('click', () => {
            burger.classList.contains('is-open') ? closeMenu() : openMenu();
        });

        if (backdrop) backdrop.addEventListener('click', closeMenu);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && burger.classList.contains('is-open')) {
                closeMenu();
                burger.focus();
            }
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        /* Menü schließen beim Scrollen nach unten */
        let lastScrollY = 0;
        window.addEventListener('scroll', rafThrottle(() => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY && burger.classList.contains('is-open')) {
                closeMenu();
            }
            lastScrollY = currentY;
        }), { passive: true });

        window.addEventListener('resize', rafThrottle(() => {
            updateOverlayTop();
            if (!isMobile()) closeMenu();
        }));
    }

    /* =================================================================
     * 2. SCROLL-REVEAL OBSERVER
     * ================================================================= */
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0 });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    /* =================================================================
     * 3. HEADER BEIM SCROLLEN VERSTECKEN
     * ================================================================= */
    const header = document.querySelector('header');
    if (header) {
        let lastScrollY = window.scrollY;

        const onHeaderScroll = rafThrottle(() => {
            const currentY = window.scrollY;

            if (currentY <= 0) {
                header.classList.remove('header-hidden');
            } else if (currentY > lastScrollY && currentY > 100) {
                header.classList.add('header-hidden');
            } else if (currentY < lastScrollY) {
                header.classList.remove('header-hidden');
            }
            lastScrollY = currentY;
        });

        window.addEventListener('scroll', onHeaderScroll, { passive: true });
    }

    /* =================================================================
     * 4. APPLE-STYLE HORIZONTAL SCROLL (Projekte-Seite)
     * ================================================================= */
    const hzWrapper = document.getElementById('hz-wrapper');
    const hzTrack   = document.getElementById('hz-track');

    if (hzWrapper && hzTrack) {
        const onHzScroll = rafThrottle(() => {
            if (isMobile()) {
                hzTrack.style.transform = 'translateX(0px)';
                return;
            }

            const rect = hzWrapper.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            if (scrollable <= 0) return;

            const progress = Math.max(0, Math.min(-rect.top / scrollable, 1));
            const maxScroll = hzTrack.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
            hzTrack.style.transform = `translateX(-${progress * maxScroll}px)`;
        });

        window.addEventListener('scroll', onHzScroll, { passive: true });
    }

    /* =================================================================
     * 5. AUTOMATISCHE EVENTS-GENERIERUNG (Events-Seite)
     * ================================================================= */
    const eventsData             = Array.isArray(window.eventsData) ? window.eventsData : null;
    const eventsListContainer    = document.getElementById('events-list-container');
    const eventsVisualsContainer = document.getElementById('events-visuals-container');

    if (eventsData && eventsListContainer && eventsVisualsContainer) {
        const listParts    = [];
        const visualsParts = [];

        eventsData.forEach((event, index) => {
            const id           = escapeHTML(event.id);
            const date         = escapeHTML(event.date);
            const title        = escapeHTML(event.title);
            const description  = escapeHTML(event.description);
            const imgDesktop   = escapeHTML(event.imageDesktop);
            const imgMobile    = escapeHTML(event.imageMobile);
            const activeClass  = index === 0 ? 'active' : '';

            listParts.push(`
                <div class="event-row" data-target="${id}">
                    <div class="event-date">${date}</div>
                    <div class="event-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <img src="${imgMobile}" class="event-mobile-img" alt="Mobile ${title}" loading="lazy">
                    </div>
                </div>
            `);

            visualsParts.push(
                `<img src="${imgDesktop}" id="${id}" class="event-img ${activeClass}" alt="${title}" loading="lazy">`
            );
        });

        eventsListContainer.innerHTML    = listParts.join('');
        eventsVisualsContainer.innerHTML = visualsParts.join('');

        const eventImages = eventsVisualsContainer.querySelectorAll('.event-img');
        eventsListContainer.querySelectorAll('.event-row').forEach((row) => {
            row.addEventListener('mouseenter', () => {
                const targetId = row.getAttribute('data-target');
                eventImages.forEach((img) => img.classList.remove('active'));
                const targetImg = targetId ? document.getElementById(targetId) : null;
                if (targetImg) targetImg.classList.add('active');
            });
        });
    }

    /* =================================================================
     * 6. AUTOMATISCHE BENTO-GENERIERUNG (Startseite)
     * ================================================================= */
    const bentoProjects  = Array.isArray(window.bentoProjects) ? window.bentoProjects : null;
    const bentoContainer = document.getElementById('bento-grid-container');

    if (bentoContainer && bentoProjects) {
        const bentoHtml = bentoProjects.map((item, index) => {
            const delayClass = `delay-${(index % 3) + 1}`;
            return `
                <a href="${escapeHTML(item.link)}" class="bento-item ${delayClass}">
                    <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" class="bento-img" loading="lazy">
                    <div class="bento-content">
                        <span class="bento-tag">${escapeHTML(item.tag)}</span>
                        <h3>${escapeHTML(item.title)}</h3>
                        <p>${escapeHTML(item.description)}</p>
                    </div>
                </a>
            `;
        }).join('');

        bentoContainer.innerHTML = bentoHtml;
        // FIX: updateCursorHoverElements() existiert nicht → Aufruf entfernt.
    }

    /* =================================================================
     * 7. AUTOMATISCHE TEAM-GENERIERUNG (Team-Seite)
     * ================================================================= */
    const teamMembers   = Array.isArray(window.teamMembers) ? window.teamMembers : null;
    const teamContainer = document.getElementById('team-grid-container');

    if (teamContainer && teamMembers) {
        const teamHtml = teamMembers.map((member, index) => {
            const delayClass = `delay-${(index % 3) + 1}`;
            const name       = escapeHTML(member.name);
            const image      = escapeHTML(member.image);
            const roleFront  = escapeHTML(member.roleFront);
            const roleBack   = escapeHTML(member.roleBack);
            const age        = escapeHTML(member.age);
            const quote      = escapeHTML(member.quote);
            const instagram  = escapeHTML(member.instagram);

            return `
                <div class="flip-card-scene reveal ${delayClass}">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${image}" alt="${name}" loading="lazy">
                            <div class="flip-card-front-info">
                                <h3>${name}</h3>
                                <p>${roleFront}</p>
                            </div>
                        </div>
                        <div class="flip-card-back">
                            <div class="card-back-header">
                                <h3>${name}</h3>
                                <div class="card-back-meta">
                                    <p><strong>Alter:</strong> ${age} Jahre</p>
                                    <p><strong>Aufgaben:</strong> ${roleBack}</p>
                                </div>
                            </div>
                            <div class="card-back-quote">"${quote}"</div>
                            <div class="card-back-action">
                                <a href="https://instagram.com/${instagram}" target="_blank" rel="noopener noreferrer">@${instagram}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        teamContainer.innerHTML = teamHtml;

        const cardObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        teamContainer.querySelectorAll('.reveal').forEach((el) => cardObserver.observe(el));
    }

    /* =================================================================
     * 8. AKTUELLE PROJEKTE – Horizontal Scroll (Projekte-Seite)
     * ================================================================= */
    const activeProjects   = Array.isArray(window.activeProjects) ? window.activeProjects : null;
    const hzTrackContainer = document.getElementById('hz-track');

    if (hzTrackContainer && activeProjects) {
        const hzHtml = activeProjects.map((project) => {
            const title       = escapeHTML(project.title);
            const description = escapeHTML(project.description);
            const images      = Array.isArray(project.images) ? project.images : [];

            const slides = images.map((src, idx) =>
                `<img src="${escapeHTML(src)}" class="carousel-slide" alt="${title} Bild ${idx + 1}" loading="lazy">`
            ).join('');

            return `
                <div class="hz-item">
                    <div class="project-carousel">
                        <button type="button" class="carousel-btn prev-btn" aria-label="Vorheriges Bild">❮</button>
                        <button type="button" class="carousel-btn next-btn" aria-label="Nächstes Bild">❯</button>
                        <div class="carousel-track">${slides}</div>
                    </div>
                    <div class="hz-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
        }).join('');

        hzTrackContainer.innerHTML = hzHtml;

        hzTrackContainer.querySelectorAll('.project-carousel').forEach((carousel) => {
            const track   = carousel.querySelector('.carousel-track');
            const prevBtn = carousel.querySelector('.prev-btn');
            const nextBtn = carousel.querySelector('.next-btn');
            if (!track || !prevBtn || !nextBtn) return;

            nextBtn.addEventListener('click', () => track.scrollBy({ left:  track.clientWidth, behavior: 'smooth' }));
            prevBtn.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
        });
    }

    /* =================================================================
     * 9. ABGESCHLOSSENE PROJEKTE – Film-Roll (Projekte-Seite)
     * ================================================================= */
    const completedProjects      = Array.isArray(window.completedProjects) ? window.completedProjects : null;
    const filmRollTrackContainer = document.getElementById('film-roll-track');

    if (filmRollTrackContainer && completedProjects) {
        const filmHtml = completedProjects.map((project) => {
            const title    = escapeHTML(project.title);
            const subtitle = escapeHTML(project.subtitle);
            const image    = escapeHTML(project.image);

            return `
                <div class="film-card">
                    <img src="${image}" alt="${title}" loading="lazy">
                    <div class="film-info">
                        <h3>${title}</h3>
                        <p>${subtitle}</p>
                    </div>
                </div>
            `;
        }).join('');

        filmRollTrackContainer.innerHTML = filmHtml;
    }

    /* =================================================================
     * 10. FILM-ROLL Horizontal Scroll
     * ================================================================= */
    const filmWrapper = document.querySelector('.film-roll-wrapper');
    const filmTrack   = document.querySelector('.film-roll-track');

    if (filmWrapper && filmTrack) {
        const onFilmScroll = rafThrottle(() => {
            if (isMobile()) return;

            const rect         = filmWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollable   = rect.height - windowHeight;
            if (scrollable <= 0) return;

            const maxTranslate = filmTrack.scrollWidth - window.innerWidth + 100;

            if (rect.top < 0 && rect.bottom > windowHeight) {
                const progress = Math.abs(rect.top) / scrollable;
                filmTrack.style.transform = `translateX(-${progress * maxTranslate}px)`;
            } else if (rect.top >= 0) {
                filmTrack.style.transform = 'translateX(0px)';
            } else if (rect.bottom <= windowHeight) {
                filmTrack.style.transform = `translateX(-${maxTranslate}px)`;
            }
        });

        window.addEventListener('scroll', onFilmScroll, { passive: true });
    }

    /* =================================================================
     * 11. MAGNETISCHE BUTTONS (nur Desktop, kein Touch)
     * ================================================================= */
    if (!isTouchDevice) {
        document.querySelectorAll('.magnetic-wrap').forEach((wrap) => {
            const btn = wrap.querySelector('.btn-magnetic');
            if (!btn) return; // FIX: Null-Check ergänzt

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width  / 2;
                const y = e.clientY - rect.top  - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            wrap.addEventListener('mouseleave', () => {
                btn.style.transform  = 'translate(0px, 0px)';
                btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                    btn.style.transition = 'transform 0.1s linear';
                }, 500);
            });
        });
    }

    /* =================================================================
     * 12. KONTAKTFORMULAR – fetch zum PHP-Endpoint
     * ================================================================= */
    const contactForm = document.getElementById('interactive-contact-form');

    if (contactForm) {
        // FIX: Pfad muss relativ zum aktuellen Dokument (kontakt.html liegt in
        //      /src/frontend/pages/) auf /src/backend/php/kontakt/send-mail.php
        //      verweisen → zwei Ebenen hoch.
        const ENDPOINT = '../../backend/php/kontakt/send-mail.php';
        const RESET_AFTER_MS = 5000;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-magnetic, button[type="submit"]');
            if (!submitBtn) return; // FIX: Null-Check ergänzt

            const originalText = submitBtn.textContent;

            submitBtn.textContent   = 'Wird gesendet…';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled      = true;

            try {
                const response = await fetch(ENDPOINT, {
                    method: 'POST',
                    body: new FormData(contactForm),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                submitBtn.classList.add('success');
                submitBtn.textContent = 'Nachricht gesendet ✓';
                contactForm.reset();
            } catch (error) {
                submitBtn.classList.remove('success');
                submitBtn.textContent = 'Fehler aufgetreten ✗';
                // eslint-disable-next-line no-console
                console.error('[Kontaktformular]', error);
            } finally {
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled    = false;
                }, RESET_AFTER_MS);
            }
        });
    }
});
