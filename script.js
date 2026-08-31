// ===== Mobile nav toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
  }

  // ===== Hero slider (home page only) =====
  const slider = document.querySelector(".hero-slider");
  if (slider) {
    const slides = [...slider.querySelectorAll(".hero-slide")];
    const dots = [...slider.querySelectorAll(".hero-dot")];
    let index = 0;
    let timer;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("active", n === index));
      dots.forEach((d, n) => d.classList.toggle("active", n === index));
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 6000);
    }

    slider.querySelector(".hero-arrow.prev")?.addEventListener("click", () => {
      goTo(index - 1);
      restart();
    });
    slider.querySelector(".hero-arrow.next")?.addEventListener("click", () => {
      goTo(index + 1);
      restart();
    });
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        goTo(i);
        restart();
      })
    );

    restart();
  }

  // ===== Contact form (mailto fallback, no backend) =====
  const form = document.querySelector(".contact-form");
  if (form) {
    const textarea = form.querySelector("textarea[name='message']");
    const counter = form.querySelector("[data-char-count]");
    if (textarea && counter) {
      const max = textarea.getAttribute("maxlength") || 180;
      const updateCount = () => {
        counter.textContent = `${textarea.value.length} / ${max}`;
      };
      textarea.addEventListener("input", updateCount);
      updateCount();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("[name='name']").value.trim();
      const email = form.querySelector("[name='email']").value.trim();
      const phone = form.querySelector("[name='phone']").value.trim();
      const message = form.querySelector("[name='message']").value.trim();

      const subject = encodeURIComponent(
        `New enquiry from ${name} - Canada Opportunities website`
      );
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        message || "Not provided",
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = `mailto:info@caopportunities.in?subject=${subject}&body=${body}`;

      const note = form.querySelector(".form-note");
      if (note) {
        note.textContent =
          "Opening your email app with this message pre-filled — just hit send.";
        note.classList.remove("hidden");
      }
    });
  }
});
