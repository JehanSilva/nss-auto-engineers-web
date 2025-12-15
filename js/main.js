// Simple site interactions: year, smooth scrolling, lightbox gallery, and AJAX contact form
document.addEventListener("DOMContentLoaded", function () {
  // -----------------------------------------------------------------
  // 1. Dynamic Year Update
  // -----------------------------------------------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------------------------------------------------------
  // 2. Smooth Scrolling for Anchor Links
  // -----------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // -----------------------------------------------------------------
  // 3. Gallery Lightbox
  // -----------------------------------------------------------------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  // Open lightbox on image click
  document.querySelectorAll(".gallery-item").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  // Close lightbox on button click
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  // Close lightbox on background click
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === this) closeLightbox();
    });
  }

  // Close lightbox on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // -----------------------------------------------------------------
  // 4. Contact Form Handling (AJAX via FormSubmit.co)
  // -----------------------------------------------------------------
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Basic Validation
      if (!name || !email || !message) {
        status.textContent = "Please fill in name, email and message.";
        status.style.color = "crimson";
        return;
      }

      // Change button state to indicate loading
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      status.textContent = "";

      // Send data to FormSubmit.co using AJAX (no redirect)
      fetch("https://formsubmit.co/ajax/info@nssauto.lk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: formData.get("phone"), // Optional field
          message: message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === "false") {
            throw new Error("Service reported error");
          }
          // Success handling
          status.textContent =
            "Message sent successfully! We will contact you soon.";
          status.style.color = "green";
          form.reset(); // Clear form inputs
        })
        .catch((error) => {
          // Error handling
          console.error("Error:", error);
          status.textContent =
            "Something went wrong. Please try again or email us directly at info@nssauto.lk";
          status.style.color = "crimson";
        })
        .finally(() => {
          // Reset button state
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }

  // Fade-in on scroll observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("fade-in-section");
    observer.observe(section);
  });
});
