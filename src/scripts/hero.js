import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const wave = document.querySelectorAll('.wave');
const nextSection = document.querySelector('.next-section');
const heroSection = document.querySelector('.hero');
const bgEffect = document.querySelector('.hero-bg-effect');
const aboutPhoto = document.querySelector('.photo-frame');

// if (window.lenis) {
//     window.lenis.scrollTo(0);
// }

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

    gsap.fromTo(
        aboutPhoto,
        {
            opacity: 0,
            scale: 0.5,
        },
        {
            opacity: 1,
            scale: 1,
            ease: 'power1.in',
            scrollTrigger: {
                trigger: nextSection,
                start: 'top bottom',
                end: 'top 25%',
                scrub: 1,
            },
        },
    );

    gsap.fromTo(
        ['.about-headline', '.about-bio', '.about-actions'],
        {
            opacity: 0,
            x: 50,
        },
        {
            opacity: 1,
            x: 0,
            ease: 'expo.in',
            scrollTrigger: {
                trigger: nextSection,
                start: 'top bottom',
                end: 'top 25%',
                scrub: 1,
            },
        },
    );
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

    gsap.fromTo(
        aboutPhoto,
        {
            opacity: 0,
            scale: 0.5,
        },
        {
            opacity: 1,
            scale: 1,
            ease: 'power1.in',
            scrollTrigger: {
                trigger: nextSection,
                start: 'top bottom',
                end: 'top 25%',
                scrub: 1,
            },
        },
    );

    gsap.fromTo(
        ['.about-headline', '.about-bio', '.about-actions'],
        {
            opacity: 0,
            x: 50,
        },
        {
            opacity: 1,
            x: 0,
            ease: 'expo.in',
            scrollTrigger: {
                trigger: nextSection,
                start: 'top bottom',
                end: 'top 25%',
                scrub: 1,
            },
        },
    );
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

    gsap.fromTo(
        aboutPhoto,
        {
            opacity: 0,
            scale: 0.5,
        },
        {
            opacity: 1,
            scale: 1,
            ease: 'power1.in',
            scrollTrigger: {
                trigger: nextSection,
                start: 'top 80%',
                end: 'top 25%',
                scrub: 1,
            },
        },
    );

    gsap.fromTo(
        ['.about-headline', '.about-bio', '.about-actions'],
        {
            opacity: 0,
            y: 50,
        },
        {
            opacity: 1,
            y: 0,
            ease: 'expo.in',
            scrollTrigger: {
                trigger: nextSection,
                start: 'top 80%',
                end: 'top 25%',
                scrub: 1,
            },
        },
    );
});

// Floating Mouse Blobl Effect
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

// Photo Blob Animation Logic
const CONFIG = {
    points: 5,
    minSpeed: 1.5,
    maxSpeed: 1.5,
    variance: 0.015,
    radiusFactor: 0.45,
    tension: 0.3,
    rotationSpeed: 0.331,
};
const points = [];
for (let i = 0; i < CONFIG.points; i++) {
    points.push({
        baseAngle: ((Math.PI * 2) / CONFIG.points) * i,
        speed:
            CONFIG.minSpeed +
            Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed),
        offset: Math.random() * Math.PI * 2,
    });
}
function buildSmoothPath(points) {
    let d = '';
    const len = points.length;
    const getPt = (i) => points[(i + len) % len];

    for (let i = 0; i < len; i++) {
        const p0 = getPt(i - 1);
        const p1 = getPt(i);
        const p2 = getPt(i + 1);
        const p3 = getPt(i + 2);

        if (i === 0) d += `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} `;

        const tension = CONFIG.tension;
        const cp1 = {
            x: p1.x + (p2.x - p0.x) * tension,
            y: p1.y + (p2.y - p0.y) * tension,
        };
        const cp2 = {
            x: p2.x - (p3.x - p1.x) * tension,
            y: p2.y - (p3.y - p1.y) * tension,
        };

        d += `C ${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)}, ${cp2.x.toFixed(1)} ${cp2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
    }
    return d + 'Z';
}

if (aboutPhoto) {
    gsap.ticker.add((time) => {
        const rect = aboutPhoto.getBoundingClientRect();

        // Prevent initialization issues on mobile if element is not yet sized
        if (rect.width === 0 || rect.height === 0) return;

        const size = Math.min(rect.width, rect.height);
        const center = size / 2;
        const radius = size * CONFIG.radiusFactor;
        const variance = size * CONFIG.variance;

        const globalRotation = time * CONFIG.rotationSpeed;

        const currentCoords = points.map((pt) => {
            const r = radius + Math.sin(time * pt.speed + pt.offset) * variance;
            const a = pt.baseAngle + globalRotation;
            return {
                x: center + Math.cos(a) * r,
                y: center + Math.sin(a) * r,
            };
        });

        const pathData = buildSmoothPath(currentCoords);
        aboutPhoto.style.setProperty('--blob-path', `path('${pathData}')`);
    });
}
