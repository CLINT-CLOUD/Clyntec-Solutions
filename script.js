document.addEventListener("DOMContentLoaded", () => {

  // Init EmailJS
  emailjs.init("KBUMf_P5Nr0y8lJxY");

  /* ---- CAROUSEL ---- */
  const slides = document.querySelectorAll(".slide");
  let current = 0;
  let timer;
  const carousel = document.querySelector(".carousel");

  const dotsWrap = document.createElement("div");
  dotsWrap.className = "carousel-dots";
  carousel.appendChild(dotsWrap);

  slides.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => { current = i; show(i); reset(); });
    dotsWrap.appendChild(d);
  });

  const dots = document.querySelectorAll(".dot");

  function show(i) {
    slides.forEach((s, j) => { s.classList.remove("active"); dots[j].classList.remove("active"); });
    slides[i].classList.add("active");
    dots[i].classList.add("active");
  }

  function next() { current = (current + 1) % slides.length; show(current); }
  function reset() { clearInterval(timer); timer = setInterval(next, 6500); }

  timer = setInterval(next, 6500);
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", () => reset());

  /* ---- SCROLL REVEAL ---- */
  const reveals = document.querySelectorAll(".reveal");
  function revealCheck() {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("active");
    });
  }
  window.addEventListener("scroll", revealCheck);
  revealCheck();

  /* ---- HAMBURGER ---- */
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".header nav");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });
  document.querySelectorAll(".header nav a").forEach(a => {
    a.addEventListener("click", () => { nav.classList.remove("active"); hamburger.classList.remove("active"); });
  });

  /* ---- CAREERS ---- */
  document.querySelectorAll(".careers-link").forEach(el => {
    el.addEventListener("click", e => { e.preventDefault(); document.getElementById("careersCard").classList.add("show"); });
  });
  document.getElementById("closeCareersCard").addEventListener("click", () => {
    document.getElementById("careersCard").classList.remove("show");
  });

  /* ---- MODAL ---- */
  const modal = document.getElementById("contactModal");
  const closeModalBtn = document.getElementById("closeModal");

  window.openModal = function(pkg) {
    document.getElementById("modalPackageField").value = pkg || "";
    document.getElementById("modalSubtitle").textContent = pkg
      ? `Requesting: ${pkg} — fill in your details and we'll prepare a custom proposal.`
      : "Fill in your details and we'll prepare a custom proposal for you.";
    modal.classList.add("active");
    document.getElementById("contactSuccess").classList.remove("show");
    document.getElementById("contactForm").style.display = "";
  };

  closeModalBtn.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("active"); });

  function handleFormSubmit(form, successEl) {
    emailjs.sendForm('service_e4ta9ry', 'template_upfau1l', form)
      .then(() => {
        form.reset();
        form.style.display = "none";
        successEl.classList.add("show");
        setTimeout(() => {
          successEl.classList.remove("show");
          form.style.display = "";
          modal.classList.remove("active");
        }, 3500);
      })
      .catch(() => alert("Oops! Something went wrong. Please try WhatsApp instead."));
  }

  document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    handleFormSubmit(e.target, document.getElementById("contactSuccess"));
  });

  /* ---- LEAD FORM ---- */
  document.getElementById("leadForm").addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector(".btn-lead");
    btn.textContent = "Sending...";
    btn.disabled = true;
    emailjs.sendForm('service_e4ta9ry', 'template_upfau1l', form)
      .then(() => {
        form.reset();
        document.getElementById("leadSuccess").classList.add("show");
        btn.textContent = "✅ Sent!";
        setTimeout(() => {
          document.getElementById("leadSuccess").classList.remove("show");
          btn.textContent = "🚀 Get My Free Quote";
          btn.disabled = false;
        }, 4000);
      })
      .catch(() => {
        btn.textContent = "🚀 Get My Free Quote";
        btn.disabled = false;
        alert("Something went wrong. Please WhatsApp us directly on +254 796 615 171");
      });
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });
/* ---- COUNTING NUMBERS ---- */
const counters = document.querySelectorAll(".stat-box .num");

const startCounters = () => {
  counters.forEach(counter => {
    const text = counter.innerText;

    if (!text.includes("+")) return;

    const target = parseInt(text.replace(/\D/g, ""));
    let current = 0;
    const increment = Math.ceil(target / 60);

    const update = () => {
      current += increment;

      if (current >= target) {
        counter.innerText = target + "+";
      } else {
        counter.innerText = current + "+";
        requestAnimationFrame(update);
      }
    };

    update();
  });
};

const statsSection = document.querySelector(".printer-stats");

if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    });
  });

  observer.observe(statsSection);
}
});