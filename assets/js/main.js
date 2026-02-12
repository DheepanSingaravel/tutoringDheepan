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

  const renderTimeline = (containerId, entries) => {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(entries)) return;
    container.innerHTML = entries
      .map(
        (entry) => `
        <article class="timeline-item">
          <h3>${entry.title}</h3>
          <p class="meta-line">${entry.organisation} | ${entry.period}</p>
          <p>${entry.summary}</p>
        </article>
      `
      )
      .join("");
  };

  renderTimeline("education-list", data.education);
  renderTimeline("experience-list", data.experience);

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

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    let id = null;

    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);

    if (watchMatch) id = watchMatch[1];
    if (!id && shortMatch) id = shortMatch[1];
    if (!id && embedMatch) id = embedMatch[1];
    if (!id && shortsMatch) id = shortsMatch[1];

    return id ? `https://www.youtube.com/embed/${id}` : null;
  };

  const videosEl = document.getElementById("videos-grid");
  if (videosEl && Array.isArray(data.videos)) {
    videosEl.innerHTML = data.videos
      .map((video) => {
        const embedUrl = getYouTubeEmbedUrl(video.url);
        const frame = embedUrl
          ? `<iframe src="${embedUrl}" title="${video.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
          : `<div class="video-placeholder">Add a valid YouTube link in content.js</div>`;

        const link = video.url
          ? `<a href="${video.url}" target="_blank" rel="noreferrer">Open on YouTube</a>`
          : "";

        return `
        <article class="video-card">
          <div class="video-frame">${frame}</div>
          <h3>${video.title}</h3>
          <p>${video.description || ""}</p>
          ${link}
        </article>
      `;
      })
      .join("");
  }
})();
