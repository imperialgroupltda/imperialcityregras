const p = document.getElementById("mobile-menu-toggle")
  , l = document.getElementById("mobile-overlay")
  , f = document.querySelector(".sidebar");
function u() {
    f?.classList.toggle("open"),
    l?.classList.toggle("open")
}
p?.addEventListener("click", u);
l?.addEventListener("click", u);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-toggle]").forEach(s => {
        const c = s.getAttribute("data-toggle")
          , e = document.querySelector(`[data-content="${c}"]`);
        if (!e)
            return;
        s.closest(".nav-section")?.classList.contains("active") && (e.classList.add("open"),
        s.setAttribute("aria-expanded", "true")),
        s.addEventListener("click", () => {
            s.getAttribute("aria-expanded") === "true" ? (e.classList.remove("open"),
            s.setAttribute("aria-expanded", "false")) : (e.classList.add("open"),
            s.setAttribute("aria-expanded", "true"))
        }
        )
    }
    )
}
);
document.addEventListener("DOMContentLoaded", () => {
    const t = document.querySelectorAll(".toc-link")
      , s = document.querySelectorAll("h2[id], h3[id]");
    if (t.length === 0 || s.length === 0)
        return;
    const c = new IntersectionObserver(e => {
        e.forEach(o => {
            if (o.isIntersecting) {
                const d = o.target.getAttribute("id");
                t.forEach(r => {
                    r.classList.remove("active"),
                    r.getAttribute("href") === `#${d}` && r.classList.add("active")
                }
                )
            }
        }
        )
    }
    ,{
        rootMargin: "-64px 0px -80% 0px"
    });
    s.forEach(e => c.observe(e))
}
);
const m = document.getElementById("search-trigger")
  , g = document.getElementById("search-modal")
  , L = document.getElementById("search-backdrop")
  , y = document.getElementById("search-close")
  , a = document.getElementById("search-input")
  , n = document.getElementById("search-results");
let h = [];
function v() {
    g?.setAttribute("aria-hidden", "false"),
    a?.focus(),
    E()
}
function i() {
    g?.setAttribute("aria-hidden", "true"),
    a && (a.value = ""),
    n && (n.innerHTML = '<div class="search-empty"><p>Type to start searching...</p></div>')
}
m?.addEventListener("click", v);
L?.addEventListener("click", i);
y?.addEventListener("click", i);
document.addEventListener("keydown", t => {
    (t.ctrlKey || t.metaKey) && t.key === "k" && (t.preventDefault(),
    v()),
    t.key === "Escape" && i()
}
);
async function E() {
    try {
        const t = await fetch("/search-index.json");
        t.ok && (h = await t.json())
    } catch (t) {
        console.error("Failed to load search index:", t)
    }
}
a?.addEventListener("input", t => {
    const s = t.target.value.toLowerCase().trim();
    if (!s) {
        n && (n.innerHTML = '<div class="search-empty"><p>Type to start searching...</p></div>');
        return
    }
    const c = h.filter(e => e.title.toLowerCase().includes(s) || e.content && e.content.toLowerCase().includes(s)).slice(0, 10);
    if (c.length === 0) {
        n && (n.innerHTML = '<div class="search-no-results"><p>No results found</p></div>');
        return
    }
    n && (n.innerHTML = c.map(e => `
        <a href="${e.url}" class="search-result-item" onclick="closeSearch()">
          <div class="search-result-title">${e.title}</div>
          <div class="search-result-section">${e.section || ""}</div>
          ${e.content ? `<div class="search-result-content">${e.content.slice(0, 100)}...</div>` : ""}
        </a>
      `).join(""))
}
);
