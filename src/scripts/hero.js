import gsap from 'gsap';
const wave = document.querySelectorAll('.wave');
const nextSection = document.querySelectorAll('.next-section');

if (window.lenis) {
    window.lenis.scrollTo(0);
}

let mm = gsap.matchMedia();

mm.add('(min-width: 800px)', () => {
    gsap.from(wave, {
        duration: 1,
        opacity: 0,
        y: (i) => 500 + i * 200,
        stagger: 0.05,
        ease: 'expo.out',
    });

    wave.forEach((w, i) => {
        gsap.fromTo(
            w,
            { y: 0 },
            {
                y: `-=${(1 / (i + 1)) * 200} `,
                scrollTrigger: {
                    trigger: nextSection,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: (1 + i) * 0.05,
                },
                immediateRender: false,
                ease: 'none',
            },
        );
    });

    gsap.from('.hero-sub-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.25,
    });

    gsap.from('.title.left', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.15,
    });

    gsap.from('.title.right', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.15,
    });
});

mm.add('(max-width: 800px)', () => {
    gsap.from(wave, {
        duration: 1,
        opacity: 0,
        y: (i) => 500 + i * 200,
        stagger: 0.05,
        ease: 'expo.out',
    });

    wave.forEach((w, i) => {
        gsap.fromTo(
            w,
            { y: 0 },
            {
                y: `-=${(1 / (i + 1)) * 200} `,
                scrollTrigger: {
                    trigger: nextSection,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: (1 + i) * 0.5,
                },
                immediateRender: false,
                ease: 'none',
            },
        );
    });

    gsap.from('.hero-sub-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.25,
    });

    gsap.from('.title.left', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.15,
    });

    gsap.from('.title.right', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.15,
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const glow = document.querySelector('.hero-bg-effect::before'); // Note: You can't select pseudo-elements directly in JS

    // Alternative: We apply variables to the parent container
    const bgEffect = document.querySelector('.hero-bg-effect');

    if (!heroSection || !bgEffect) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Configuration
    const speed = 0.08; // Lower = smoother/slower, Higher = faster/snappier

    // Track mouse position relative to the hero section
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Animation Loop
    function animate() {
        // Linear Interpolation (Lerp) for smooth movement
        // Moves 'current' 8% of the way to 'target' every frame
        currentX += (mouseX - currentX) * speed;
        currentY += (mouseY - currentY) * speed;

        // Apply visual updates via CSS Variables
        // (We change the SCSS slightly to use these variables)
        bgEffect.style.setProperty('--mouse-x', `${currentX}px`);
        bgEffect.style.setProperty('--mouse-y', `${currentY}px`);

        requestAnimationFrame(animate);
    }

    // Initialize center position
    const rect = heroSection.getBoundingClientRect();
    mouseX = rect.width / 2;
    mouseY = rect.height / 2;
    currentX = mouseX;
    currentY = mouseY;

    animate();
});
