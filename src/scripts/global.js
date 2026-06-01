import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

// Initialize GSAP and Lenis
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    scrollRestoration: 'manual',
});
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

window.lenis = lenis;

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// Setup Complete

// Runs fn after the loader fires site:ready, or immediately at window.load if no loader is present
function onSiteReady(fn) {
    if (document.getElementById('site-loader')) {
        document.addEventListener('site:ready', fn, { once: true });
    } else {
        if (document.readyState === 'complete') {
            fn();
        } else {
            window.addEventListener('load', fn, { once: true });
        }
    }
}

//////////////////////////////////////// MENU - NAVITATION ANIMATION
const ANIMATION_DURATION = 1.2;

const NAV = document.querySelector('.main-nav');
const HamburgerMenuButton = document.querySelector('.burger');
const overlay = document.querySelector('.nav-overlay');

const MenuTimeline = gsap.timeline({ paused: true });
let isHamburgerMenuOpen = false;

const toggleMenuFunction = () => {
    HamburgerMenuButton.classList.toggle('active');

    if (!isHamburgerMenuOpen) {
        MenuTimeline.timeScale(1).play();
    } else {
        MenuTimeline.timeScale(2).reverse();
    }
    isHamburgerMenuOpen = !isHamburgerMenuOpen;
};

// Handle Navigation Bar and Hamburger Menu
onSiteReady(() => {
    if (NAV) {
        gsap.fromTo(
            NAV,
            {
                yPercent: -50,
                opacity: 0,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power4.out',
                delay: 0.2,
            },
        );
    }
});

if (HamburgerMenuButton) {
    gsap.set('.dropdown-container', {
        clipPath: 'inset(0 0 100% 0)',
    });

    MenuTimeline.to('.dropdown-container', {
        duration: ANIMATION_DURATION,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'expo.inOut',
    });

    MenuTimeline.to(
        '.menu-item p',
        {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
        },
        '-=0.8',
    );

    MenuTimeline.to(
        '.menu-secondary p',
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
        },
        '<',
    );

    MenuTimeline.to(
        overlay,
        {
            opacity: 1,
            duration: 0.7,
            display: 'block',
            pointerEvents: 'all',
        },
        0,
    );

    HamburgerMenuButton.addEventListener('click', toggleMenuFunction);
    overlay?.addEventListener('click', toggleMenuFunction);
}

// Handle <a> Link Clicks
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const origin = window.location.origin;

    // Let the browser handle external links and _blank targets natively
    if (anchor.target === '_blank') return;
    if (!href.startsWith('/') && !href.startsWith('#') && new URL(href, origin).origin !== origin) return;

    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(href, origin);

    const currentPath = currentUrl.pathname.replace(/\/$/, '') || '/';
    const targetPath = targetUrl.pathname.replace(/\/$/, '') || '/';

    if (href === '#') {
        e.preventDefault();
        if (isHamburgerMenuOpen) {
            toggleMenuFunction();
        }
        lenis.scrollTo(0, { duration: 1.5 });
        return;
    }

    if (targetPath === currentPath && !href.includes('#')) {
        e.preventDefault();

        if (targetPath === '/') {
            lenis.scrollTo(0, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }

        if (isHamburgerMenuOpen) {
            toggleMenuFunction();
        }
        return;
    }

    if (
        targetUrl.origin === origin &&
        isHamburgerMenuOpen &&
        !href.includes('#')
    ) {
        e.preventDefault();
        toggleMenuFunction();

        setTimeout(() => {
            window.location.href = href;
        }, 900);
        return;
    }

    if (href === '/') {
        if (window.location.pathname === '/') {
            e.preventDefault();
            if (isHamburgerMenuOpen) {
                toggleMenuFunction();
            }
            lenis.scrollTo(0, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
        return;
    }

    if (href.includes('#')) {
        const [path, hash] = href.split(/(?=#)/);

        if (!hash || hash === '#') return;

        const isCurrentPage =
            path === '' || path === '/' || path === window.location.pathname;

        if (isCurrentPage) {
            try {
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    e.preventDefault();
                    if (isHamburgerMenuOpen) {
                        toggleMenuFunction();
                    }

                    const footer = document.querySelector('footer.footer');
                    const isFooterLink =
                        footer &&
                        (footer === targetElement ||
                            footer.contains(targetElement));

                    if (isFooterLink) {
                        const footerStyle = window.getComputedStyle(footer);
                        const isFixedFooter = footerStyle.position === 'fixed';

                        if (isFixedFooter) {
                            lenis.scrollTo(document.documentElement.scrollHeight - window.innerHeight, {
                                duration: 1.5,
                                immediate: false,
                            });
                        } else {
                            const elementHeight = targetElement.offsetHeight;
                            const windowHeight = window.innerHeight;

                            let offset = -(windowHeight - elementHeight) / 2;

                            lenis.scrollTo(targetElement, {
                                offset: offset,
                                duration: 1.5,
                                immediate: false,
                            });
                        }
                    } else {
                        lenis.scrollTo(targetElement, {
                            offset: -120,
                            duration: 1.5,
                            immediate: false,
                        });
                    }
                }
            } catch (err) {
                console.warn('Lenis scroll error:', err);
            }
        }
    }
});

//////////////////////////////////////// MENU - NAVITATION ANIMATION

let mm = gsap.matchMedia();

// --- DESKTOP ANIMATION (The "Reveal") ---
mm.add('(min-width: 801px)', () => {
    gsap.fromTo(
        '.footer-container',
        {
            yPercent: -50,
            scale: 0.8,
        },
        {
            yPercent: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.website-content',
                start: 'bottom bottom',
                end: '+=90%',
                scrub: true,
            },
        },
    );

    const items = gsap.utils.toArray('.footer-details, .footer-contact');

    gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.website-content',
                start: 'bottom bottom',
                end: '+=50%', // Finish fading in halfway through the reveal
                scrub: true,
            },
        },
    );
});

mm.add('(max-width: 800px)', () => {
    gsap.from('.footer-container', {
        y: 150,
        scale: 0.8,
        opacity: 0.5,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 75%',
            end: '+=80%',
            // toggleActions: 'play none none reverse',
            scrub: true,
        },
    });

    const items = gsap.utils.toArray('.footer-details, .footer-contact');

    gsap.fromTo(
        items,
        { opacity: 0.5, y: 50 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.website-content',
                start: 'bottom bottom',
                end: '+=90%',
                scrub: true,
            },
        },
    );
});
