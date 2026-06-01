import gsap from 'gsap';

// Heading title (letter-spacing collapse like blog page)
gsap.to('.page-title', {
    opacity: 1,
    letterSpacing: '0rem',
    duration: 1,
    ease: 'expo.inOut',
});

gsap.to('.page-subtitle', {
    opacity: 1,
    duration: 1,
    ease: 'expo.inOut',
    delay: 0.15,
});

// Tags index — chips stagger in
const chips = document.querySelectorAll('.tag-chip');
if (chips.length) {
    gsap.to(chips, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: 'expo.out',
        delay: 0.3,
    });
}

// Tag detail — blog cards stagger in
const cards = document.querySelectorAll('.tag-page-container .blog-card');
if (cards.length) {
    gsap.fromTo(
        cards,
        { yPercent: 30, opacity: 0 },
        {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'expo.out',
            delay: 0.3,
        },
    );
}
