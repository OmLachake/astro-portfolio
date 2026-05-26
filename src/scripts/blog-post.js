import gsap from 'gsap';

gsap.to('.reading-progress', {
    scaleX: 1,
    ease: 'none',
    transformOrigin: 'left',
    scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
    },
});

gsap.set(['.post-back', '.post-tags', '.post-description', '.post-meta'], {
    y: 24,
});
gsap.set('.post-title', {
    letterSpacing: '0.8rem',
});

const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

heroTl
    .to('.post-back', { opacity: 0.55, y: 0, duration: 0.7 })
    .to('.post-tags', { opacity: 1, y: 0, duration: 0.7 }, '-=0.45')
    .to(
        '.post-title',
        {
            opacity: 1,
            letterSpacing: '0rem',
            duration: 1.2,
            ease: 'expo.inOut',
        },
        '-=0.4',
    )
    .to('.post-description', { opacity: 1, y: 0, duration: 0.9 }, '-=0.75')
    .to('.post-meta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
    .to(
        '.post-hero-img-wrapper',
        { opacity: 1, duration: 1, ease: 'expo.out' },
        '-=0.9',
    );

const mm = gsap.matchMedia();

mm.add('(min-width: 801px)', () => {
    gsap.fromTo(
        '.post-hero-img',
        { y: 0 },
        {
            y: -70,
            ease: 'none',
            scrollTrigger: {
                trigger: '.post-hero-img-wrapper',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        },
    );
});
