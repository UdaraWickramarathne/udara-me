document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".social-item span").forEach((item) => {
    gsap.to(item, {
      backgroundPosition: "0% 0",
      scrollTrigger: {
        trigger: item,
        start: "top 80%", // Adjust to control when animation starts
        end: "top 20%",
        scrub: true, // Smooth scroll-linked animation
      },
    });
  });
});
function navigateToBlog(url) {
  window.location.href = url; // Redirect to the specified URL
}

new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".left-section, .right-section, .card, .main-img, .about-button, .skills-tags span, .skills-column p, .education-item, .card-list .card-item, .swiper-button-prev, .swiper-button-next,.contact-title, .contact-section p, .input-field, .textarea-field, .submit-button"
  );

  const observerOptions = {
    root: null, // Viewport as root
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the visible class when in view
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once triggered
      }
    });
  }, observerOptions);

  elements.forEach((element) => observer.observe(element));
});

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const anchor = document.getElementById("anchor");
  const rekt = anchor.getBoundingClientRect();
  const anchorX = rekt.x + rekt.width / 2;
  const anchorY = rekt.y + rekt.height / 2;
  const eyes = document.querySelectorAll(".eye");
  const angleDeg = angle(anchorX, anchorY, mouseX, mouseY);

  eyes.forEach((eye) => {
    eye.style.transform = `rotate(${90 + angleDeg}deg)`;
  });
});

function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return theta;
}

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "gknOInN7wlEKmFCOQ",
  });
})();

const my_form = document.getElementById("form-contact");
const loading = document.getElementById("loadingOverlay");

my_form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validateInputs()) {
    return;
  }
  loading.style.display = "flex";
  emailjs.sendForm("service_talrs7n", "template_cx90pfm", "#form-contact").then(
    () => {
      console.log("SUCCESS!");
      loading.style.display = "none";
      my_form.reset();
      showPopup("✅ Your message has been sent successfully! ");
    },
    (error) => {
      console.log("FAILED...", error);
      loading.style.display = "none";
      showPopup("🚫 Your message has not been sent! ");
    }
  );
});

function validateInputs() {
  const name = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name === "") {
    showPopup("❌ Please fill in the name field!");
    return false;
  }

  if (email === "") {
    showPopup("❌ Please fill in the email field!");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showPopup("❌ Please enter a valid email address!");
    return false;
  }

  if (message === "") {
    showPopup("❌ Please fill in the message field!");
    return false;
  }

  return true;
}

function showPopup(message) {
  const popup = document.getElementById("popupMessage");
  popup.textContent = message; // Set custom message
  popup.classList.remove("hidden");
  popup.classList.add("visible");

  // Automatically hide after 3 seconds
  setTimeout(() => {
    popup.classList.remove("visible");
    popup.classList.add("hidden");
  }, 3000);
}
