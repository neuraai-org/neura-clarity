(() => {
  const track = (eventName, element) => {
    const payload = {
      event: eventName,
      path: window.location.pathname,
      href: element.getAttribute("href") || "",
      ts: new Date().toISOString(),
    };

    // Supports common analytics hooks while still working as a static site.
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
      return;
    }

    console.info("[track]", payload);
  };

  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      track(el.getAttribute("data-track"), el);
    });
  });
})();
