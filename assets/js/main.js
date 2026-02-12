(function () {
  const data = window.SITE_CONTENT;
  if (!data) return;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  const setHref = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.href = value;
  };

  const phoneForTel = (value) => (value || "").replace(/\s+/g, "");

  setText("hero-name", data.tutorName);
  setText("hero-line", data.heroLine);
  setText("contact-email", data.email);
  setText("contact-phone", data.phone);

  setHref("book-btn", data.bookingUrl);
  setHref("contact-book-link", data.bookingUrl);
  setHref("contact-form-link", data.contactFormUrl || data.bookingUrl);
  setHref("linkedin-btn", data.linkedinUrl);
  setHref("contact-linkedin-link", data.linkedinUrl);
  setHref("email-btn", `mailto:${data.email}`);
  setHref("contact-email-link", `mailto:${data.email}`);
  setHref("contact-phone-link", `tel:${phoneForTel(data.phone)}`);

  const aboutEl = document.getElementById("about-content");
  if (aboutEl && Array.isArray(data.about)) {
    aboutEl.innerHTML = data.about
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");
  }

  const pricingEl = document.getElementById("pricing-grid");
  if (pricingEl && Array.isArray(data.pricing)) {
    pricingEl.innerHTML = data.pricing
      .map(
        (item) => `
        <article class="card">
          <h3>${item.level}</h3>
          <p class="price">${item.rate}</p>
          <p>${item.details}</p>
        </article>
      `
      )
      .join("");
  }

  const timelineEl = document.getElementById("timeline");
  if (timelineEl && Array.isArray(data.timeline)) {
    timelineEl.innerHTML = data.timeline
      .map(
        (entry) => `
        <article class="timeline-item">
          <span class="tag">${entry.type}</span>
          <h3>${entry.title}</h3>
          <p class="meta-line">${entry.organisation} | ${entry.period}</p>
          <p>${entry.summary}</p>
        </article>
      `
      )
      .join("");
  }

  const testimonialEl = document.getElementById("testimonials-grid");
  if (testimonialEl && Array.isArray(data.testimonials)) {
    testimonialEl.innerHTML = data.testimonials
      .map(
        (item) => `
        <article class="testimonial">
          <blockquote>${item.quote}</blockquote>
          <footer>${item.name} - ${item.role}</footer>
        </article>
      `
      )
      .join("");
  }
})();
