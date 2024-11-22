document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.utils.toArray('.social-item span').forEach(item => {
      gsap.to(item, {
        backgroundPosition: "0% 0",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",   // Adjust to control when animation starts
          end: "top 20%",
          scrub: true,        // Smooth scroll-linked animation
        }
      });
    });
});
function navigateToBlog(url) {
    window.location.href = url;  // Redirect to the specified URL
  }
  
  
  