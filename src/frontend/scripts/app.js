/*APP.JS - INTERACTIVE ENGINE (Logik)*/

//HTML Escape Utility (XSS Prevention)
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

document.addEventListener("DOMContentLoaded", () => {

    //Mobile / Touch Detection
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobile = () => window.innerWidth <= 900;

    // ─────────────────────────────────────────────────────────────
    // BURGER NAVIGATION
    // ─────────────────────────────────────────────────────────────
    const burger      = document.getElementById('burgerBtn');
    const mobileNav   = document.getElementById('mobileNav');
    const backdrop    = document.getElementById('navBackdrop');
    const siteHeader  = document.getElementById('siteHeader');

    if (burger && mobileNav) {

        // Overlay-Top dynamisch an Header-Höhe anpassen
        function updateOverlayTop() {
            const headerH = siteHeader ? siteHeader.offsetHeight : 110;
            mobileNav.style.top = headerH + 'px';
        }
        updateOverlayTop();

        function openMenu() {
            burger.classList.add('is-open');
            mobileNav.classList.add('is-open');
            if (backdrop) backdrop.classList.add('is-visible');
            burger.setAttribute('aria-expanded', 'true');
            mobileNav.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            burger.classList.remove('is-open');
            mobileNav.classList.remove('is-open');
            if (backdrop) backdrop.classList.remove('is-visible');
            burger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        // Burger klicken → togglen
        burger.addEventListener('click', () => {
            burger.classList.contains('is-open') ? closeMenu() : openMenu();
        });

        // Klick auf Backdrop → schließen
        if (backdrop) backdrop.addEventListener('click', closeMenu);

        // Escape-Taste → schließen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && burger.classList.contains('is-open')) {
                closeMenu();
                burger.focus();
            }
        });

        // Link-Klick im Overlay → Menü schließen
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Theme-Toggle Mobile → delegiert an Desktop-Button (Logik bleibt in theme.js)
        const desktopThemeBtn = document.getElementById('theme-toggle');
        const mobileThemeBtn  = document.getElementById('theme-toggle-mobile');
        if (mobileThemeBtn && desktopThemeBtn) {
            mobileThemeBtn.addEventListener('click', () => desktopThemeBtn.click());
        }

        // Resize: Overlay-Top aktualisieren + Menü bei Desktop schließen
        window.addEventListener('resize', () => {
            updateOverlayTop();
            if (!isMobile()) closeMenu();
        });
    }

    // ─────────────────────────────────────────────────────────────
    // SCROLL REVEAL OBSERVER
    // ─────────────────────────────────────────────────────────────
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // ─────────────────────────────────────────────────────────────
    // HIDE HEADER ON SCROLL
    // ─────────────────────────────────────────────────────────────
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= 0) {
                header.classList.remove("header-hidden");
                lastScrollY = currentScrollY;
                return;
            }
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add("header-hidden");
            } else {
                header.classList.remove("header-hidden");
            }
            lastScrollY = currentScrollY;
        });
    }

    // ─────────────────────────────────────────────────────────────
    // APPLE-STYLE HORIZONTAL SCROLL LOGIC
    // ─────────────────────────────────────────────────────────────
    const hzWrapper = document.getElementById('hz-wrapper');
    const hzTrack   = document.getElementById('hz-track');

    if (hzWrapper && hzTrack) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 900) {
                hzTrack.style.transform = `translateX(0px)`;
                return;
            }

            const rect = hzWrapper.getBoundingClientRect();
            const scrollProgress = -rect.top / (rect.height - window.innerHeight);
            const clampedProgress = Math.max(0, Math.min(scrollProgress, 1));
            const maxScroll = hzTrack.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);

            hzTrack.style.transform = `translateX(-${clampedProgress * maxScroll}px)`;
        });
    }

    // ─────────────────────────────────────────────────────────────
    // AUTOMATISCHER EVENTS-GENERATOR
    // ─────────────────────────────────────────────────────────────
    const eventsData             = window.eventsData;
    const eventsListContainer    = document.getElementById('events-list-container');
    const eventsVisualsContainer = document.getElementById('events-visuals-container');

    if (eventsListContainer && eventsVisualsContainer && eventsData) {
        let listHtml    = '';
        let visualsHtml = '';

        eventsData.forEach((event, index) => {
            const safeId          = escapeHTML(event.id);
            const safeDate        = escapeHTML(event.date);
            const safeTitle       = escapeHTML(event.title);
            const safeDesc        = escapeHTML(event.description);
            const safeImgDesktop  = escapeHTML(event.imageDesktop);
            const safeImgMobile   = escapeHTML(event.imageMobile);
            const activeClass     = index === 0 ? 'active' : '';

            listHtml += `
                <div class="event-row" data-target="${safeId}">
                    <div class="event-date">${safeDate}</div>
                    <div class="event-info">
                        <h3>${safeTitle}</h3>
                        <p>${safeDesc}</p>
                        <img src="${safeImgMobile}" class="event-mobile-img" alt="Mobile ${safeTitle}">
                    </div>
                </div>
            `;

            visualsHtml += `
                <img src="${safeImgDesktop}" id="${safeId}" class="event-img ${activeClass}" alt="${safeTitle}">
            `;
        });

        eventsListContainer.innerHTML    = listHtml;
        eventsVisualsContainer.innerHTML = visualsHtml;

        // Hover-Effekt erst nach DOM-Generierung binden
        const eventRows   = document.querySelectorAll('.event-row');
        const eventImages = document.querySelectorAll('.event-img');

        eventRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                const targetId = row.getAttribute('data-target');
                eventImages.forEach(img => img.classList.remove('active'));
                const targetImg = document.getElementById(targetId);
                if (targetImg) targetImg.classList.add('active');
            });
        });
    }

    // ─────────────────────────────────────────────────────────────
    // AUTOMATISCHER BENTO-GENERATOR
    // ─────────────────────────────────────────────────────────────
    const bentoProjects  = window.bentoProjects;
    const bentoContainer = document.getElementById('bento-grid-container');

    if (bentoContainer && bentoProjects) {
        let bentoHtml = '';

        bentoProjects.forEach((item, index) => {
            const delayClass = `delay-${(index % 3) + 1}`;
            const safeLink   = escapeHTML(item.link);
            const safeImage  = escapeHTML(item.image);
            const safeTitle  = escapeHTML(item.title);
            const safeTag    = escapeHTML(item.tag);
            const safeDesc   = escapeHTML(item.description);

            bentoHtml += `
                <a href="${safeLink}" class="bento-item ${delayClass}">
                    <img src="${safeImage}" alt="${safeTitle}" class="bento-img">
                    <div class="bento-content">
                        <span class="bento-tag">${safeTag}</span>
                        <h3>${safeTitle}</h3>
                        <p>${safeDesc}</p>
                    </div>
                </a>
            `;
        });

        bentoContainer.innerHTML = bentoHtml;
        updateCursorHoverElements();
    }

    // ─────────────────────────────────────────────────────────────
    // AUTOMATISCHER KARTEN-GENERATOR
    // ─────────────────────────────────────────────────────────────
    const teamMembers  = window.teamMembers;
    const teamContainer = document.getElementById('team-grid-container');

    if (teamContainer && teamMembers) {
        let htmlContent = '';

        teamMembers.forEach((member, index) => {
            const delayClass     = `delay-${(index % 3) + 1}`;
            const safeName       = escapeHTML(member.name);
            const safeImage      = escapeHTML(member.image);
            const safeRoleFront  = escapeHTML(member.roleFront);
            const safeRoleBack   = escapeHTML(member.roleBack);
            const safeAge        = escapeHTML(member.age);
            const safeQuote      = escapeHTML(member.quote);
            const safeInstagram  = escapeHTML(member.instagram);

            htmlContent += `
                <div class="flip-card-scene reveal ${delayClass}">
                    <div class="flip-card-inner">

                        <div class="flip-card-front">
                            <img src="${safeImage}" alt="${safeName}">
                            <div class="flip-card-front-info">
                                <h3>${safeName}</h3>
                                <p>${safeRoleFront}</p>
                            </div>
                        </div>

                        <div class="flip-card-back">
                            <div class="card-back-header">
                                <h3>${safeName}</h3>
                                <div class="card-back-meta">
                                    <p><strong>Alter:</strong> ${safeAge} Jahre</p>
                                    <p><strong>Aufgaben:</strong> ${safeRoleBack}</p>
                                </div>
                            </div>
                            <div class="card-back-quote">
                                "${safeQuote}"
                            </div>
                            <div class="card-back-action">
                                <a href="https://instagram.com/${safeInstagram}" target="_blank" rel="noopener noreferrer">@${safeInstagram}</a>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        });

        teamContainer.innerHTML = htmlContent;

        // Eigener Observer nur für die Karten
        const cardObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        teamContainer.querySelectorAll('.reveal').forEach(el => {
            cardObserver.observe(el);
        });

        if (typeof updateCursorHoverElements === 'function') {
            updateCursorHoverElements();
        }
    }

    // ─────────────────────────────────────────────────────────────
    // PROJEKTE & FILM-ROLL LOGIC
    // ─────────────────────────────────────────────────────────────

    // 1. AUTOMATISCHER PROJEKTE-GENERATOR (Aktuelle Projekte)
    const activeProjects     = window.activeProjects;
    const hzTrackContainer   = document.getElementById('hz-track');

    if (hzTrackContainer && activeProjects) {
        let hzHtml = '';

        activeProjects.forEach(project => {
            const safeTitle = escapeHTML(project.title);
            const safeDesc  = escapeHTML(project.description);

            let carouselSlides = '';
            project.images.forEach((img, index) => {
                carouselSlides += `<img src="${escapeHTML(img)}" class="carousel-slide" alt="${safeTitle} Bild ${index + 1}">`;
            });

            hzHtml += `
                <div class="hz-item">
                    <div class="project-carousel">
                        <button class="carousel-btn prev-btn">❮</button>
                        <button class="carousel-btn next-btn">❯</button>
                        <div class="carousel-track">
                            ${carouselSlides}
                        </div>
                    </div>
                    <div class="hz-info">
                        <h3>${safeTitle}</h3>
                        <p>${safeDesc}</p>
                    </div>
                </div>
            `;
        });

        hzTrackContainer.innerHTML = hzHtml;

        // Carousel-Buttons aktivieren
        document.querySelectorAll('.project-carousel').forEach(carousel => {
            const track   = carousel.querySelector('.carousel-track');
            const prevBtn = carousel.querySelector('.prev-btn');
            const nextBtn = carousel.querySelector('.next-btn');

            if (track && prevBtn && nextBtn) {
                nextBtn.addEventListener('click', () => track.scrollBy({ left:  track.clientWidth, behavior: 'smooth' }));
                prevBtn.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
            }
        });
    }

    // 2. AUTOMATISCHER FILM-ROLL-GENERATOR (Abgeschlossene Projekte)
    const completedProjects        = window.completedProjects;
    const filmRollTrackContainer   = document.getElementById('film-roll-track');

    if (filmRollTrackContainer && completedProjects) {
        let filmHtml = '';

        completedProjects.forEach(project => {
            const safeTitle    = escapeHTML(project.title);
            const safeSubtitle = escapeHTML(project.subtitle);
            const safeImage    = escapeHTML(project.image);

            filmHtml += `
                <div class="film-card">
                    <img src="${safeImage}" alt="${safeTitle}">
                    <div class="film-info">
                        <h3>${safeTitle}</h3>
                        <p>${safeSubtitle}</p>
                    </div>
                </div>
            `;
        });

        filmRollTrackContainer.innerHTML = filmHtml;
    }

    // 3. HORIZONTAL SCROLL LOGIC (Der Sticky-Effekt)
    const filmWrapper = document.querySelector('.film-roll-wrapper');
    const filmTrack   = document.querySelector('.film-roll-track');

    if (filmWrapper && filmTrack) {
        window.addEventListener('scroll', () => {
            if (isMobile()) return;

            const wrapperRect  = filmWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const maxTranslate = filmTrack.scrollWidth - window.innerWidth + 100;

            if (wrapperRect.top < 0 && wrapperRect.bottom > windowHeight) {
                const scrollProgress = Math.abs(wrapperRect.top) / (wrapperRect.height - windowHeight);
                filmTrack.style.transform = `translateX(-${scrollProgress * maxTranslate}px)`;
            } else if (wrapperRect.top >= 0) {
                filmTrack.style.transform = `translateX(0px)`;
            } else if (wrapperRect.bottom <= windowHeight) {
                filmTrack.style.transform = `translateX(-${maxTranslate}px)`;
            }
        });

        if (typeof updateCursorHoverElements === 'function') {
            updateCursorHoverElements();
        }
    }

    // ─────────────────────────────────────────────────────────────
    // MAGNETIC BUTTON LOGIC
    // ─────────────────────────────────────────────────────────────
    const isTouchDevice2   = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const magneticWraps    = document.querySelectorAll('.magnetic-wrap');

    magneticWraps.forEach(wrap => {
        const btn = wrap.querySelector('.btn-magnetic');

        if (!isTouchDevice2) {
            wrap.addEventListener('mousemove', (e) => {
                const position = wrap.getBoundingClientRect();
                const x = e.clientX - position.left - position.width  / 2;
                const y = e.clientY - position.top  - position.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            wrap.addEventListener('mouseleave', () => {
                btn.style.transform  = `translate(0px, 0px)`;
                btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                    btn.style.transition = 'transform 0.1s linear';
                }, 500);
            });
        }
    });

    // ─────────────────────────────────────────────────────────────
    // FORMULAR SUBMIT ANIMATION
    // ─────────────────────────────────────────────────────────────
    const contactForm = document.getElementById('interactive-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn  = contactForm.querySelector('.btn-magnetic');
            const originalText = submitBtn.textContent;

            // Lade-Status
            submitBtn.textContent  = 'Wird gesendet...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled     = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('backend/php/kontakt/send-mail.php', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    submitBtn.classList.add('success');
                    submitBtn.textContent = 'Nachricht gesendet! ✓';
                    contactForm.reset();
                } else {
                    throw new Error('Fehler beim Senden');
                }
            } catch (error) {
                submitBtn.textContent = 'Fehler aufgetreten ✗';
                console.error(error);
            } finally {
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled    = false;
                }, 5000);
            }
        });
    }

}); // End DOMContentLoaded