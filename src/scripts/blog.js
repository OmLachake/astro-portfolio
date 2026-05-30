import gsap from 'gsap';

// Heading always animates
gsap.to('.blogs-page-container .heading .page-title', {
    opacity: 1,
    duration: 1,
    ease: 'expo.inOut',
    letterSpacing: '0rem',
});

gsap.to('.blogs-page-container .heading .page-subtitle', {
    opacity: 1,
    duration: 1,
    ease: 'expo.inOut',
    delay: 0.15,
});

// Empty state
const emptyTitle = document.querySelector('.empty-state .empty-title');
const emptySub = document.querySelector('.empty-state .empty-sub');
const linkHome = document.querySelector('.empty-state .link-button');

if (emptySub) {
    gsap.fromTo(
        [emptyTitle, emptySub, linkHome],
        { opacity: 0, y: 12 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
            delay: 0.75,
            stagger: 0.1,
        },
    );
}

// Blog cards — only when posts exist
const latestBlog = document.querySelector('.latest-blog .blog-card');
const blogCards = document.querySelectorAll('.blog-grid .blog-card');

if (latestBlog) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.latest-blog',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
    });

    timeline
        .fromTo(
            latestBlog,
            { yPercent: 50, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.5, ease: 'expo.inOut' },
        )
        .fromTo(
            blogCards,
            { yPercent: 50, opacity: 0 },
            {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'expo.out',
            },
            '-=.7',
        );
}
