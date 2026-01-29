import gsap from 'gsap';
const wave = document.querySelectorAll('.wave');
const nextSection = document.querySelectorAll('.next-section');
const heroSection = document.querySelector('.hero');
const bgEffect = document.querySelector('.hero-bg-effect');

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

    gsap.from(bgEffect, {
        y: 50,
        scale: 1.15,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.0,
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

    gsap.from(bgEffect, {
        y: 50,
        scale: 1.15,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0,
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
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Lower speed = more "weight" and smoother lag (Graceful)
// Higher speed = snappier/responsive
const mouseBlobSpeed = 0.04;

// Initial center position
const updateDimensions = () => {
    const rect = heroSection.getBoundingClientRect();
    // Default to center if mouse hasn't moved yet
    if (mouseX === 0 && mouseY === 0) {
        mouseX = rect.width / 2;
        mouseY = rect.height / 2;
        currentX = mouseX;
        currentY = mouseY;
    }
};

heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    // Calculate X/Y relative to the hero section
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

// Update dimensions on resize to keep coordinate math accurate
window.addEventListener('resize', updateDimensions);

function animate() {
    // The "Lerp" formula: Current + (Target - Current) * Speed
    currentX += (mouseX - currentX) * mouseBlobSpeed;
    currentY += (mouseY - currentY) * mouseBlobSpeed;

    // Only update DOM if width is > 800px (Performance check)
    if (window.innerWidth > 800) {
        // We use translate(-50%, -50%) in CSS, so we just pass the raw coordinates
        bgEffect.style.setProperty('--mouse-x', `${currentX}px`);
        bgEffect.style.setProperty('--mouse-y', `${currentY}px`);
    }

    requestAnimationFrame(animate);
}

// Initialize
updateDimensions();
animate();
