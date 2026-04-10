/* =========================================
   APP.JS - INTERACTIVE ENGINE (Logik)
   ========================================= */

// --- HTML Escape Utility (XSS Prevention) ---
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

    // --- Mobile / Touch Detection ---
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobile = () => window.innerWidth <= 900;
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.getElementById("cursor-dot");
    const hoverSelector = "a, button, .card, .events-visuals, .hz-item, .form-control, .artistic-portrait, .team-member, .flip-card-scene";

    // Re-attach cursor hover events to dynamically generated elements
    window.updateCursorHoverElements = function() {
        if (!cursorDot || isTouchDevice) return;
        document.querySelectorAll(hoverSelector).forEach(function(el) {
            if (el._cursorBound) return;
            el._cursorBound = true;
            el.addEventListener("mouseenter", function() { cursorDot.classList.add("hovered"); });
            el.addEventListener("mouseleave", function() { cursorDot.classList.remove("hovered"); });
        });
    };

    if (cursorDot && !isTouchDevice) {
        window.addEventListener("mousemove", (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        updateCursorHoverElements();
    } else if (cursorDot) {
        // Hide cursor dot on touch devices
        cursorDot.style.display = 'none';
    }

    // --- 2. Apple-Style Scroll Reveal Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // --- 3. Hide Header on Scroll ---
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

    // --- 4. Apple-Style Horizontal Scroll Logic ---
    const hzWrapper = document.getElementById('hz-wrapper');
    const hzTrack = document.getElementById('hz-track');

    if (hzWrapper && hzTrack) {
        window.addEventListener('scroll', () => {
            // Check if we are on mobile (where we disabled the horizontal scroll in CSS)
            if (window.innerWidth <= 900) {
                hzTrack.style.transform = `translateX(0px)`;
                return;
            }

            const rect = hzWrapper.getBoundingClientRect();
            // Calculate progress (0 to 1) based on scroll position inside the wrapper
            const scrollProgress = -rect.top / (rect.height - window.innerHeight);
            
            // Limit the progress strictly between 0 and 1
            const clampedProgress = Math.max(0, Math.min(scrollProgress, 1));
            
            // Calculate maximum translation (width of all items minus the screen width)
            const maxScroll = hzTrack.scrollWidth - window.innerWidth + (window.innerWidth * 0.1); 
            // The + 10vw (0.1) accounts for the right padding
            
            // Apply translation directly to the GPU
            hzTrack.style.transform = `translateX(-${clampedProgress * maxScroll}px)`;
        });
    }

    // --- 5. (Removed dead code: #bzr-form handler – no HTML uses that ID) ---

    // --- 6. Event Portal Image Reveal Logic ---
    const eventRows = document.querySelectorAll('.event-row');
    const eventImages = document.querySelectorAll('.event-img');

    if (eventRows.length > 0 && eventImages.length > 0) {
        eventRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                // Hole die ID des Ziel-Bildes
                const targetId = row.getAttribute('data-target');
                
                // Alle Bilder unsichtbar machen
                eventImages.forEach(img => img.classList.remove('active'));
                
                // Das passende Bild aktivieren
                const targetImg = document.getElementById(targetId);
                if (targetImg) {
                    targetImg.classList.add('active');
                }
            });
        });
    }

    // --- AUTOMATISCHER BENTO-GENERATOR ---
    // Greift auf window.bentoProjects aus data.js zu
    const bentoProjects = window.bentoProjects;
    const bentoContainer = document.getElementById('bento-grid-container');
    
    if (bentoContainer && bentoProjects) {
        let bentoHtml = '';
        
        bentoProjects.forEach((item, index) => {
            const delayClass = `delay-${(index % 3) + 1}`;
            const safeLink = escapeHTML(item.link);
            const safeImage = escapeHTML(item.image);
            const safeTitle = escapeHTML(item.title);
            const safeTag = escapeHTML(item.tag);
            const safeDesc = escapeHTML(item.description);
            
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

    // --- AUTOMATISCHER KARTEN-GENERATOR ---
    // Greift auf window.teamMembers aus data.js zu
    const teamMembers = window.teamMembers;
    const teamContainer = document.getElementById('team-grid-container');
    
    if (teamContainer && teamMembers) {
        let htmlContent = '';
        
        teamMembers.forEach((member, index) => {
            // Berechnet dynamisch den Delay (1, 2, 3) für die Einblend-Animation
            const delayClass = `delay-${(index % 3) + 1}`;
            const safeName = escapeHTML(member.name);
            const safeImage = escapeHTML(member.image);
            const safeRoleFront = escapeHTML(member.roleFront);
            const safeRoleBack = escapeHTML(member.roleBack);
            const safeAge = escapeHTML(member.age);
            const safeQuote = escapeHTML(member.quote);
            const safeInstagram = escapeHTML(member.instagram);
            
            htmlContent += `
                <div class="flip-card-scene ${delayClass}">
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
                                    <p><strong>Ressort:</strong> ${safeRoleBack}</p>
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
        
        // Fügt das generierte HTML in die Seite ein
        teamContainer.innerHTML = htmlContent;
        
        // Cursor-Hover-Events auf die neuen Elemente anwenden
        updateCursorHoverElements();
    }

    // --- HORIZONTAL FILM ROLL LOGIC (Projekte) ---
    const filmWrapper = document.querySelector('.film-roll-wrapper');
    const filmTrack = document.querySelector('.film-roll-track');

    if (filmWrapper && filmTrack) {
        window.addEventListener('scroll', () => {
            // Auf mobilen Geräten die JS-Scroll-Logik ignorieren (CSS scroll-snap übernimmt)
            if (isMobile()) return;

            // Holt die Position des Wrappers
            const wrapperRect = filmWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Wenn der obere Rand des Wrappers den oberen Bildschirmrand erreicht hat
            if (wrapperRect.top < 0 && wrapperRect.bottom > windowHeight) {
                // Berechne, wie viel Prozent wir schon durch den Wrapper gescrollt sind (0 bis 1)
                const scrollProgress = Math.abs(wrapperRect.top) / (wrapperRect.height - windowHeight);
                
                // Berechne die maximale Verschiebung nach links
                // (Gesamtbreite der Rolle minus Bildschirmbreite + etwas Puffer)
                const maxTranslate = filmTrack.scrollWidth - window.innerWidth + 100;
                
                // Wende die Verschiebung an
                filmTrack.style.transform = `translateX(-${scrollProgress * maxTranslate}px)`;
            } else if (wrapperRect.top >= 0) {
                // Setze zurück, wenn wir oben drüber sind
                filmTrack.style.transform = `translateX(0px)`;
            }
        });
        
        // Cursor-Hover für die Film-Karten aktivieren
        updateCursorHoverElements();
    }

});

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile / Touch Detection (second listener scope) ---
    const isTouchDevice2 = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // --- MAGNETIC BUTTON LOGIC ---
    const magneticWraps = document.querySelectorAll('.magnetic-wrap');

    magneticWraps.forEach(wrap => {
        const btn = wrap.querySelector('.btn-magnetic');
        
        // Magnetic effect nur auf Nicht-Touch-Geräten aktivieren
        if (!isTouchDevice2) {
            // Magnet zieht an
            wrap.addEventListener('mousemove', (e) => {
                const position = wrap.getBoundingClientRect();
                // Berechnet die Mausposition relativ zur Mitte des Buttons
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                // Bewegt den Button sanft zur Maus (Faktor 0.3 für einen subtilen Effekt)
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            // Magnet lässt los
            wrap.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
                // Kurze Transition für das "Zurückschnappen" hinzufügen
                btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                    btn.style.transition = 'transform 0.1s linear'; // Zurücksetzen für flüssige Mausbewegung
                }, 500);
            });
        }
    });

    // --- FORMULAR SUBMIT ANIMATION ---
    const contactForm = document.getElementById('interactive-contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Verhindert das Neuladen der Seite
            
            const submitBtn = contactForm.querySelector('.btn-magnetic');
            const originalText = submitBtn.textContent;
            
            // 1. Lade-Status
            submitBtn.textContent = 'Wird gesendet... ⏳';
            submitBtn.style.opacity = '0.8';
            
            // 2. Fake-Server-Delay (tut so, als würde er senden)
            setTimeout(() => {
                // 3. Erfolgs-Status
                submitBtn.classList.add('success');
                submitBtn.textContent = 'Nachricht gesendet! 🚀';
                submitBtn.style.opacity = '1';
                
                // Formular leeren
                contactForm.reset();
                
                // Optional: Button nach 5 Sekunden wieder normalisieren
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.textContent = originalText;
                }, 5000);
                
            }, 1500); // 1.5 Sekunden "Ladezeit"
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- PROJECT IMAGE CAROUSEL LOGIC ---
    const carousels = document.querySelectorAll('.project-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');

        if (track && prevBtn && nextBtn) {
            // Klick auf den rechten Pfeil
            nextBtn.addEventListener('click', () => {
                // Scrollt exakt um die Breite eines Bildes nach rechts
                track.scrollBy({ 
                    left: track.clientWidth, 
                    behavior: 'smooth' 
                });
            });

            // Klick auf den linken Pfeil
            prevBtn.addEventListener('click', () => {
                // Scrollt exakt um die Breite eines Bildes nach links
                track.scrollBy({ 
                    left: -track.clientWidth, 
                    behavior: 'smooth' 
                });
            });
        }
    });
});
