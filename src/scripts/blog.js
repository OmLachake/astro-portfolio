import gsap from 'gsap';

const latestBlog = document.querySelector('.latest-blog');
const blogCards = document.querySelectorAll('.blog-grid .blog-card');

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.latest-blog',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
    },
});
gsap.set(latestBlog, {
    opacity: 0,
    yPercent: 50,
});

gsap.set(blogCards, {
    opacity: 0,
    yPercent: 50,
});

timeline
    .to(latestBlog, {
        opacity: 1,
        yPercent: 0,
        duration: 1.5,
        ease: 'expo.out',
    })
    .to(
        blogCards,
        {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.out',
        },
        '-=1.0',
    );
