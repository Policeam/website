/* ==========================================================================
   دانشنامهٔ خوراک ایرانی — منطق برنامه
   جستجو، فیلتر، نقشهٔ تعاملی، پنجرهٔ جزئیات، تم و انیمیشن‌ها
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------- ابزار کمکی ------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const provinceName = (id) => (PROVINCES.find((p) => p.id === id) || {}).name || id;
  const categoryOf = (id) => CATEGORIES.find((c) => c.id === id) || { name: id, icon: "🍽" };

  // تبدیل اعداد انگلیسی به فارسی
  const faNum = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  /* ------------------------- مدیریت تم ------------------------- */
  const themeToggle = $("#themeToggle");
  const root = document.body;
  const savedTheme = localStorage.getItem("ic-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("ic-theme", next);
    document.querySelector('meta[name="theme-color"]')
      .setAttribute("content", next === "dark" ? "#0f0a07" : "#fbf6ef");
  });

  /* ------------------------- سربرگ و پیمایش ------------------------- */
  const header = $("#siteHeader");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // منوی موبایل
  const burger = $("#navBurger");
  const navLinks = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ------------------------- انیمیشن آشکارسازی ------------------------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

  /* ------------------------- شمارندهٔ آماری ------------------------- */
  const animateCount = (el) => {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = faNum(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animateCount(e.target); statObserver.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  $$(".stat b[data-count]").forEach((el) => statObserver.observe(el));

  /* ------------------------- غذاهای منتخب ------------------------- */
  const featuredGrid = $("#featuredGrid");
  DISHES.filter((d) => d.featured).slice(0, 6).forEach((d) => {
    const el = document.createElement("article");
    el.className = "fcard reveal";
    el.innerHTML = `
      <div class="fcard__img" style="background-image:url('${d.image}')"></div>
      <div class="fcard__body">
        <span class="fcard__tag">${categoryOf(d.type).icon} ${categoryOf(d.type).name}</span>
        <h3 class="fcard__name">${d.name}</h3>
        <p class="fcard__meta">📍 <b>${d.city}</b> — ${provinceName(d.province)}</p>
      </div>`;
    el.addEventListener("click", () => openModal(d.id));
    featuredGrid.appendChild(el);
  });

  /* ------------------------- دسته‌بندی‌ها ------------------------- */
  const categoryGrid = $("#categoryGrid");
  CATEGORIES.forEach((c) => {
    const count = DISHES.filter((d) => d.type === c.id).length;
    if (!count) return;
    const el = document.createElement("button");
    el.className = "cat-card reveal";
    el.innerHTML = `
      <span class="cat-card__icon">${c.icon}</span>
      <span class="cat-card__name">${c.name}</span>
      <span class="cat-card__count">${faNum(count)} غذا</span>`;
    el.addEventListener("click", () => {
      filterCategory.value = c.id;
      applyFilters();
      $("#explore").scrollIntoView({ behavior: "smooth" });
    });
    categoryGrid.appendChild(el);
  });

  /* ------------------------- نقشهٔ تعاملی ------------------------- */
  const pinsGroup = $("#mapPins");
  const mapPanelTitle = $("#mapPanelTitle");
  const mapPanelSub = $("#mapPanelSub");
  const mapPanelList = $("#mapPanelList");
  const SVGNS = "http://www.w3.org/2000/svg";

  const provincesWithFood = PROVINCES.filter((p) =>
    DISHES.some((d) => d.province === p.id)
  );

  provincesWithFood.forEach((p) => {
    const count = DISHES.filter((d) => d.province === p.id).length;
    const g = document.createElementNS(SVGNS, "g");
    g.setAttribute("class", "map-pin");
    g.dataset.province = p.id;
    g.innerHTML = `
      <circle class="map-pin__halo" cx="${p.x}" cy="${p.y}" r="9"></circle>
      <circle class="map-pin__dot" cx="${p.x}" cy="${p.y}" r="7"></circle>
      <text class="map-pin__label" x="${p.x}" y="${p.y - 16}">${p.name} (${faNum(count)})</text>`;
    g.addEventListener("click", () => selectProvince(p.id));
    pinsGroup.appendChild(g);
  });

  function selectProvince(id) {
    $$(".map-pin").forEach((pin) =>
      pin.classList.toggle("is-active", pin.dataset.province === id)
    );
    const dishes = DISHES.filter((d) => d.province === id);
    mapPanelTitle.textContent = provinceName(id);
    mapPanelSub.textContent = `${faNum(dishes.length)} غذای ثبت‌شده در این استان`;
    mapPanelList.innerHTML = "";
    dishes.forEach((d) => {
      const item = document.createElement("div");
      item.className = "map-item";
      item.innerHTML = `
        <div class="map-item__img" style="background-image:url('${d.image}')"></div>
        <div>
          <div class="map-item__name">${d.name}</div>
          <div class="map-item__cat">${categoryOf(d.type).icon} ${categoryOf(d.type).name} — ${d.city}</div>
        </div>`;
      item.addEventListener("click", () => openModal(d.id));
      mapPanelList.appendChild(item);
    });
  }

  /* ------------------------- فیلترها و جستجو ------------------------- */
  const searchInput = $("#searchInput");
  const filterProvince = $("#filterProvince");
  const filterCategory = $("#filterCategory");
  const resetBtn = $("#resetFilters");
  const dishGrid = $("#dishGrid");
  const resultCount = $("#resultCount");
  const emptyState = $("#emptyState");

  // پرکردن گزینه‌های فیلتر
  filterProvince.innerHTML =
    `<option value="">همهٔ استان‌ها</option>` +
    provincesWithFood.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
  filterCategory.innerHTML =
    `<option value="">همهٔ دسته‌ها</option>` +
    CATEGORIES.filter((c) => DISHES.some((d) => d.type === c.id))
      .map((c) => `<option value="${c.id}">${c.icon} ${c.name}</option>`)
      .join("");

  function dishCard(d) {
    const el = document.createElement("article");
    el.className = "dcard";
    el.innerHTML = `
      <div class="dcard__media">
        <div class="dcard__img" style="background-image:url('${d.image}')"></div>
        <span class="dcard__cat">${categoryOf(d.type).icon} ${categoryOf(d.type).name}</span>
      </div>
      <div class="dcard__body">
        <h3 class="dcard__name">${d.name}</h3>
        <span class="dcard__loc">📍 ${d.city} — ${provinceName(d.province)}</span>
        <p class="dcard__desc">${d.description}</p>
        <span class="dcard__more">مشاهدهٔ کامل ←</span>
      </div>`;
    el.addEventListener("click", () => openModal(d.id));
    return el;
  }

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const prov = filterProvince.value;
    const cat = filterCategory.value;

    const filtered = DISHES.filter((d) => {
      if (prov && d.province !== prov) return false;
      if (cat && d.type !== cat) return false;
      if (q) {
        const haystack = [
          d.name, d.city, provinceName(d.province), categoryOf(d.type).name,
          d.description, d.ingredients.join(" "),
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    dishGrid.innerHTML = "";
    filtered.forEach((d, i) => {
      const card = dishCard(d);
      card.style.animationDelay = Math.min(i * 0.05, 0.5) + "s";
      dishGrid.appendChild(card);
    });
    resultCount.textContent = `${faNum(filtered.length)} غذا یافت شد`;
    emptyState.hidden = filtered.length !== 0;
  }

  searchInput.addEventListener("input", applyFilters);
  filterProvince.addEventListener("change", applyFilters);
  filterCategory.addEventListener("change", applyFilters);
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterProvince.value = "";
    filterCategory.value = "";
    applyFilters();
  });

  // پیوندهای پاورقی به دسته‌ها
  $$("[data-jump-cat]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      filterCategory.value = a.dataset.jumpCat;
      applyFilters();
      $("#explore").scrollIntoView({ behavior: "smooth" });
    })
  );

  /* ------------------------- پنجرهٔ جزئیات ------------------------- */
  const modal = $("#dishModal");
  const modalBody = $("#modalBody");

  function openModal(id) {
    const d = DISHES.find((x) => x.id === id);
    if (!d) return;
    modalBody.innerHTML = `
      <div class="modal__hero">
        <div class="modal__hero-img" style="background-image:url('${d.image}')"></div>
        <div class="modal__titlewrap">
          <span class="fcard__tag">${categoryOf(d.type).icon} ${categoryOf(d.type).name}</span>
          <h2 class="modal__title" id="modalTitle">${d.name}</h2>
          <p class="modal__loc">📍 ${d.city} — استان ${provinceName(d.province)}</p>
        </div>
      </div>
      <div class="modal__content">
        <p class="modal__lead">${d.description}</p>

        <div class="modal__section">
          <h4>🥘 مواد اصلی</h4>
          <div class="chips">${d.ingredients.map((i) => `<span class="chip">${i}</span>`).join("")}</div>
        </div>

        <div class="modal__grid">
          <div class="modal__section">
            <h4>📜 پیشینهٔ تاریخی</h4>
            <p>${d.history}</p>
          </div>
          <div class="modal__section">
            <h4>🎭 اهمیت فرهنگی</h4>
            <p>${d.culture}</p>
          </div>
        </div>

        <div class="modal__section">
          <h4>💡 نکات جالب</h4>
          <div class="facts">
            ${d.facts.map((f) => `<div class="fact"><span class="fact__icon">✦</span><span>${f}</span></div>`).join("")}
          </div>
        </div>
      </div>`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__dialog").scrollTop = 0;
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  $$("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ------------------------- راه‌اندازی اولیه ------------------------- */
  applyFilters();
  if (provincesWithFood.length) selectProvince("gilan");
  observeReveals();
})();
