import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const wave = document.querySelectorAll('.wave');
const nextSection = document.querySelector('.next-section');
const heroSection = document.querySelector('.hero');
const bgEffect = document.querySelector('.hero-bg-effect');

if (window.lenis) {
    window.lenis.scrollTo(0);
}

let mm = gsap.matchMedia();

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 150);
});

mm.add('(min-width: 1200px)', () => {
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

mm.add('(min-width: 800px) and (max-width: 1200px)', () => {
    gsap.from(wave, {
        duration: 1,
        opacity: 0,
        y: (i) => 500 + i * 100,
        stagger: 0.05,
        ease: 'expo.out',
    });

    wave.forEach((w, i) => {
        console.log('hi');
        gsap.to(w, {
            y: `-=${(1 / (i + 1)) * 180}`,
            scrollTrigger: {
                trigger: nextSection,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 1.2 + i * 0.2,
                invalidateOnRefresh: true,
            },
            ease: 'none',
            immediateRender: false,
        });
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

const mouseBlobSpeed = 0.04;

const updateDimensions = () => {
    const rect = heroSection.getBoundingClientRect();
    if (mouseX === 0 && mouseY === 0) {
        mouseX = rect.width / 2;
        mouseY = rect.height / 2;
        currentX = mouseX;
        currentY = mouseY;
    }
};

heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

window.addEventListener('resize', updateDimensions);

function animate() {
    currentX += (mouseX - currentX) * mouseBlobSpeed;
    currentY += (mouseY - currentY) * mouseBlobSpeed;

    if (window.innerWidth > 800) {
        bgEffect.style.setProperty('--mouse-x', `${currentX}px`);
        bgEffect.style.setProperty('--mouse-y', `${currentY}px`);
    }

    requestAnimationFrame(animate);
}

updateDimensions();
animate();
