import gsap from 'gsap';

const latestBlog = document.querySelector('.latest-blog .blog-card');
const blogCards = document.querySelectorAll('.blog-grid .blog-card');

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.latest-blog',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
    },
});

gsap.to('.blogs-page-container .heading .page-title', {
    opacity: 1,
    duration: 1,
    ease: 'expo.inOut',
});

gsap.to('.blogs-page-container .heading .page-subtitle', {
    opacity: 1,
    duration: 1,
    ease: 'expo.inOut',
    delay: 0.15,
});
timeline
    .fromTo(
        latestBlog,
        {
            yPercent: 50,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'expo.inOut',
        },
    )
    .fromTo(
        blogCards,
        {
            yPercent: 50,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.out',
        },
        '-=.7',
    );
