/* ==============================================
   AI CATALOG — Renderer & UI
   Reads TOOLS + CATEGORY_ORDER from config.js
   and populates the page dynamically.
   ============================================== */
(function () {
  "use strict";

  /* ── Helpers ─────────────────────────────── */

  /** Escape HTML to prevent XSS from config data */
  function esc(str) {
    var d = document.createElement("div");
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

  /** Render a price badge */
  function priceBadge(price) {
    return '<span class="price">' + esc(price) + "</span>";
  }

  /** Render tag badges */
  function tagBadges(tags) {
    if (!tags || tags.length === 0) return "";
    return tags.map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");
  }

  /* ── Render Top Picks ────────────────────── */

  function renderTopPicks() {
    var container = document.getElementById("picks-container");
    if (!container) return;

    var picks = TOOLS.filter(function (t) {
      return t.categories && t.categories.indexOf("top_picks") !== -1;
    });
    if (picks.length === 0) return;

    var grid = document.createElement("div");
    grid.className = "picks-grid";

    picks.forEach(function (tool) {
      // Show the first non-top_picks category as label
      var catLabel = "";
      for (var i = 0; i < tool.categories.length; i++) {
        if (tool.categories[i] !== "top_picks") { catLabel = tool.categories[i]; break; }
      }

      var card = document.createElement("article");
      card.className = "pick-card";
      card.innerHTML =
        '<div class="pick-header">' +
          (catLabel ? '<span class="pick-category">' + esc(catLabel) + "</span>" : "") +
          priceBadge(tool.price) +
        "</div>" +
        '<h3 class="pick-name">' + esc(tool.name) + "</h3>" +
        '<p class="pick-desc">' + esc(tool.description) + "</p>" +
        '<div class="pick-footer">' +
          '<div class="tags">' + tagBadges(tool.tags) + "</div>" +
          '<a href="' + esc(tool.link) + '" class="btn btn-sm" target="_blank" rel="noopener noreferrer">visit &rarr;</a>' +
        "</div>";
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  /* ── Render Categories ───────────────────── */

  function renderCategories() {
    var container = document.getElementById("categories-container");
    if (!container) return;

    // Collect all categories except top_picks
    var catMap = {};
    TOOLS.forEach(function (tool) {
      if (!tool.categories) return;
      tool.categories.forEach(function (cat) {
        if (cat === "top_picks") return;
        if (!catMap[cat]) catMap[cat] = [];
        catMap[cat].push(tool);
      });
    });

    // Build ordered list: CATEGORY_ORDER first, then remaining alphabetically
    var order = (typeof CATEGORY_ORDER !== "undefined") ? CATEGORY_ORDER : [];
    var ordered = [];
    order.forEach(function (cat) {
      if (catMap[cat]) ordered.push(cat);
    });
    Object.keys(catMap).sort().forEach(function (cat) {
      if (ordered.indexOf(cat) === -1) ordered.push(cat);
    });

    // Render each category block
    ordered.forEach(function (cat) {
      var tools = catMap[cat];
      if (!tools || tools.length === 0) return;

      var block = document.createElement("div");
      block.className = "cat-block";
      block.id = "cat-" + cat;

      var heading = document.createElement("h3");
      heading.className = "cat-name";
      heading.innerHTML = '<span class="cat-prefix">./</span>' + esc(cat);
      block.appendChild(heading);

      var grid = document.createElement("div");
      grid.className = "tools-grid";

      tools.forEach(function (tool) {
        var card = document.createElement("article");
        card.className = "tool-card";
        card.innerHTML =
          '<div class="tool-top">' +
            '<h4 class="tool-name">' + esc(tool.name) + "</h4>" +
            priceBadge(tool.price) +
          "</div>" +
          '<p class="tool-desc">' + esc(tool.description) + "</p>" +
          '<div class="tool-footer">' +
            '<div class="tags">' + tagBadges(tool.tags) + "</div>" +
            '<a href="' + esc(tool.link) + '" class="btn btn-xs" target="_blank" rel="noopener noreferrer">visit &rarr;</a>' +
          "</div>";
        grid.appendChild(card);
      });

      block.appendChild(grid);
      container.appendChild(block);
    });
  }

  /* ── Mobile nav toggle ───────────────────── */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");
    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("active");
      toggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Smooth scroll fallback ──────────────── */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var t = document.querySelector(this.getAttribute("href"));
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: "smooth", block: "start" });
          if (history.pushState) history.pushState(null, null, this.getAttribute("href"));
        }
      });
    });
  }

  /* ── Fade-in on scroll ───────────────────── */

  function initFadeIn() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    document.querySelectorAll(".pick-card, .tool-card, .about-item, .disclosure-box").forEach(function (el) {
      el.classList.add("fi");
      obs.observe(el);
    });

    var s = document.createElement("style");
    s.textContent = ".fi{opacity:0;transform:translateY(10px);transition:opacity .35s ease,transform .35s ease}.fi.vis{opacity:1;transform:translateY(0)}";
    document.head.appendChild(s);
  }

  /* ── Footer email from config ──────────────── */

  function renderEmail() {
    var el = document.getElementById("footer-email");
    if (!el || typeof SITE_EMAIL === "undefined") return;
    var email = esc(SITE_EMAIL);
    el.innerHTML = '<p><a href="mailto:' + email + '">' + email + "</a></p>";
  }

  /* ── Boot ─────────────────────────────────── */

  renderTopPicks();
  renderCategories();
  renderEmail();
  initNav();
  initSmoothScroll();
  initFadeIn();

})();
