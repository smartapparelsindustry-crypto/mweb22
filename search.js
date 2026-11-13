/**
 * Luxe Lane - Search Engine
 * Live dropdown suggestions + search results page via shop.html?search=query
 */
(function () {
  // ── Product Catalog ──
  const PRODUCTS = [
    {
      title: 'Noor Chanderi Silk Three-Piece Suite',
      price: '₨ 32,500', priceNum: 32500,
      category: 'eastern', tags: ['silk', 'chanderi', 'pret', 'three-piece', 'eastern wear', 'kurta', 'dupatta'],
      fabric: 'Chanderi Silk',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFKFCQHIBjL7KbdhQ8W8dpmy9aWULwMniMdz2BGnvj1PGWuu6GtUeehG94kD4v8YuiWTijL5gkQQgib2IA6GEOcRd-3iDmrDxVZHwwH0L59ngGiUEHT6Jm9I-jv8ysKyHP196oORflxZ037uWxEnIzIPCfzugVF0GLSKt6XQF5BhTJKH5aY3FXeZdx_P_2vWY8NAl6FW9Y1Pbx0iIC1jO6AAM1qISOF888e083dm0r1PwzDi0BUGyd'
    },
    {
      title: 'Sovereign Tailored Peak-Lapel Blazer',
      price: '₨ 36,000', priceNum: 36000,
      category: 'western', tags: ['blazer', 'tailored', 'western wear', 'formal', 'wool', 'men', 'suit'],
      fabric: 'Premium Wool Blend',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiVId0YFTnx2E2ohikC92mNMo6sxW_ukH65mBf6F5_3D7Or_qF1-FTJq8iciy_B7xiz8wkf1znbZel3Mj4cNC08qMWAbETOAsTOzBvlIrrcgeMUsRUWZnKCxJV2Ruz1rNSOsRK9jj-TTl0R7rzyRi8EWEC5exuHXD9QFsxBf3tT6BFfEQVcRRAsWnm4pfS-g66iEqYqLdRqoVQXO8rnitQMFzL0ev5hDCO8sPpZb6Md_xGCjzcPfRS'
    },
    {
      title: 'Gulnar Hand-Tilla Embellished Kurta',
      price: '₨ 26,900', priceNum: 26900,
      category: 'eastern', tags: ['kurta', 'tilla', 'embellished', 'hand-embroidered', 'eastern wear', 'pret', 'festive'],
      fabric: 'Raw Silk with Tilla Work',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5gW0WAJkL4a-R4S8Ocwnc1XXWZwymgXpIFRlehEe0c_zJatTY_MzrXQICocNa2k6Z3cKflBeSTIvdPEIX2looEjA-R5mW45aD7YNiXUqruvdxw86cts5TTmy6k56_0R8WahEipVqUEfxSrgJnaYEuzWdtNhjx5fGQ8sRz_18D53hZjkhcVtQ1klIwk-iM3dOmsu8v6SQO6iF8KjkoSYWUUap8hP_v07pyXN2_1fLdz82-hicx2CiT'
    },
    {
      title: 'Elysian Silk Wide-Leg Trouser Set',
      price: '₨ 19,500', priceNum: 19500,
      category: 'western', tags: ['silk', 'trouser', 'wide-leg', 'western wear', 'modern', 'pret', 'set'],
      fabric: 'Pure Silk',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx-ctGdn5uPX64hNVVm2VTr3pv8YOxQPEZAXyLy1i1p81kjTiAdtUmnl-rpxYPsyZk6o750sYEDxUTptEZLPyTk4pWaZGfk3Ej2jagCZq3ByYpmflgwqTyetu_lvlQPc2wPrqzukbqhDHDjdBQ8c_xUx69J8FHzIsRfhXFSAa6V8nwc09MLusWQ1mHLoM9IMUGAdYX77JBAaCz2Ye_TU2BJK2kVW7u5_j0JPPTF_Q6WmoOtREU-yF7'
    },
    {
      title: 'Sheesh Mahal Organza Dupatta & Kalidar',
      price: '₨ 48,000', priceNum: 48000,
      category: 'eastern', tags: ['organza', 'dupatta', 'kalidar', 'bridal', 'festive', 'eastern wear', 'embroidered', 'luxury'],
      fabric: 'Pure Organza',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaTtgSgSzwVED1QkvAGCIKmgd7YlJYjt2-OejEFWzech8mr51H21gFaUU6_fMUgX6pdd10rIsXoOVPZFscmTlaA3ivZPySNqnFwUdTh7ShNSuBbbUUFfMr5uniTmVfHLNUuJSswHU_cxY99fhCN-Z1xK7BNQ-mK3OAIAZANhBxpzh33GHP2pYUJjAaM9BNAdTBIsKNFUD1vGNMcsbsVL2aaBjW5ybSOg_NvkmohrrfO4HMdHiUcK9W'
    },
    {
      title: 'Sahara Linen Belted Kimono Wrap',
      price: '₨ 21,000', priceNum: 21000,
      category: 'western', tags: ['linen', 'kimono', 'wrap', 'western wear', 'casual', 'modern', 'summer'],
      fabric: 'Pure French Linen',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFGaBrBqByX3XaC7tOZ71txTN15huHbKaUbeRnd-hrq65KnYNGmsrXcgqZSeQ1T86Z-nWX9d8GeKEr2yrxS9bjYzjSL5G1dvo0RlWmrWZcTPBidBiapmBniSUXz3ZN-wkpMizBfjglOavrUz05Ok8IaPYdeCu-d7mHazUNSf3q3QNo69Xr0VEc5-Es_RKgmXLEz-nPAQXKH3Rgl0km3o6cGPm_BV3me8IEmll6_YT5gCStr6AtKNh0'
    },
    {
      title: 'Dusk Velvet Embroidered Kaftan',
      price: '₨ 38,500', priceNum: 38500,
      category: 'eastern', tags: ['velvet', 'kaftan', 'embroidered', 'eastern wear', 'festive', 'bridal', 'luxury', 'winter'],
      fabric: 'Micro Velvet',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0gTyVr345VR_mJSpePu7TymWTtk4psDTjynuxRqqc_6I3pZ_oE-ZUhRrHSzYJQU8wyZETR6WH0B8aEbTky7wFdj11NfmXt22s7utW-JrXHRfzoaH-uWdBdkCHEkQM6q3NPQwa2dvd9kmwtz7awUmbKO6hgs-r1m9AfCfQTo7DYeCINaxRdtX15r8IflBhylN02jae0XKgrh7vIz_f9aXfnY6WMaBEANw4EhqXQkN6NA5F6P8fW6w-'
    },
    {
      title: 'Minimalist Ivory Poplin Pleated Tunic',
      price: '₨ 16,500', priceNum: 16500,
      category: 'western', tags: ['poplin', 'tunic', 'pleated', 'ivory', 'western wear', 'casual', 'cotton', 'minimalist'],
      fabric: 'Cotton Poplin',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb6RPhhT5GeP8UB8KZOPB7D6AezhoE0lRBw6tvDcnyUmT0i6-sAer6EfahLH_KBsBFN-6jRsb_BmpMtE0wutm3Ajcx9hcMv_nhzOp-JOI2n_I_Un9StGqInbTB51imjrV_Q2MAsChE86Gur-wIi5Z9gotUmuiIxhUr5s6Xhevl7lp_e9jrnb5o-A-JP_D3pp8SbafAYvNtbJFaL-HvYp9fGcKXrsm5Y4v8BOt9m1t6qHNKrFM497eH'
    },
    {
      title: 'Marquise Embroidered Kurta Set',
      price: '₨ 28,500', priceNum: 28500,
      category: 'eastern', tags: ['kurta', 'embroidered', 'eastern wear', 'pret', 'set', 'festive', 'new arrivals'],
      fabric: 'Raw Silk',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvYvdnyZv064aG58cGQD8mPMqma3-RLOXQJ1eeCNOBpaWLCuxNHr7I7DEAxmkul-U8JBYG2_mUyjpTsSkA7-dsa2R9DtPNBuSdOZNG3rVL39zI8ET-0M_bdyCo1uhI5LKWPiZdPRLrqDUFpDz3LOg3qSxrhfZ_soP4OuGyBCsOTfpVVLi7agY-fX1w_7gm3BoAoW8NeKHcGwQIvbD-Y9ldEUgZnISXIkfizauUpE6DiqU76KOrEce_'
    },
    {
      title: 'Relaxed Double-Breasted Wool Blazer',
      price: '₨ 34,000', priceNum: 34000,
      category: 'western', tags: ['blazer', 'wool', 'double-breasted', 'western wear', 'formal', 'men', 'tailored'],
      fabric: 'Premium Wool',
      img: 'images/blazer.jpg'
    },
    {
      title: 'Zellige Embellished Organza Ensemble',
      price: '₨ 42,500', priceNum: 42500,
      category: 'eastern', tags: ['organza', 'embellished', 'ensemble', 'bridal', 'festive', 'eastern wear', 'luxury', 'new arrivals'],
      fabric: 'Pure Organza',
      img: 'images/organza.jpg'
    },
    {
      title: 'Contemporary Linen Trench Coat',
      price: '₨ 22,000', priceNum: 22000,
      category: 'western', tags: ['linen', 'trench', 'coat', 'western wear', 'modern', 'outerwear', 'casual'],
      fabric: 'French Linen',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX8923U_-5TEGgvI0-e9JGh6XEQSQY79ToF0rbsE7ViYaLqnXB8o52JBl7JSqM69UTJckdI1yVqh4BpDdHSXdA4EueJKSO4gPla7Yv46a6TU0tc7dk--O2DknwH0nITN5Cx1fVxSK52c1lqD8X1Xnxy-VcaGKihv_JpNB0GL4AilIiWn-ZpVE-Qd3Ic6wOUs7CPIJ4YjV3NZfhZtDQpn3ejUU2BP-31QofkpvgSBi-IuXB2Ge7eI_u'
    }
  ];

  // ── Search Logic ──
  function searchProducts(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);

    return PRODUCTS.map(p => {
      const haystack = [
        p.title, p.category, p.fabric, ...p.tags
      ].join(' ').toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (haystack.includes(term)) score++;
      }
      // Boost exact title match
      if (p.title.toLowerCase().includes(q)) score += 3;
      return { ...p, score };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score);
  }

  function getProductURL(p) {
    return `product.html?title=${encodeURIComponent(p.title)}&price=${encodeURIComponent(p.price)}&img=${encodeURIComponent(p.img)}`;
  }

  // ── Dropdown Suggestions UI ──
  let dropdownEl = null;

  function createDropdown(inputEl) {
    if (dropdownEl) { dropdownEl.remove(); dropdownEl = null; }
    const dd = document.createElement('div');
    dd.id = 'luxelane-search-dropdown';
    dd.className = 'absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-[#ccc5bd]/40 z-[9999] max-h-[420px] overflow-y-auto';
    dd.style.minWidth = '320px';

    // Position relative to input
    const parent = inputEl.closest('.relative') || inputEl.parentElement;
    if (parent) {
      parent.style.position = 'relative';
      parent.appendChild(dd);
    } else {
      document.body.appendChild(dd);
    }
    dropdownEl = dd;
    return dd;
  }

  function renderDropdown(inputEl, results, query) {
    if (!results.length) {
      if (dropdownEl) dropdownEl.remove();
      dropdownEl = null;
      // Show "no results" mini dropdown
      if (query && query.length >= 2) {
        const dd = createDropdown(inputEl);
        dd.innerHTML = `
          <div class="p-6 text-center">
            <span class="material-symbols-outlined text-[36px] text-[#ccc5bd] block mb-2">search_off</span>
            <p class="text-sm font-semibold text-[#1b1c1a] mb-1">No products found for "${escapeHtml(query)}"</p>
            <p class="text-xs text-[#4a4640]">Try silk, bridal, blazer, organza, linen...</p>
          </div>`;
      }
      return;
    }

    const dd = createDropdown(inputEl);
    const shown = results.slice(0, 5);

    dd.innerHTML = `
      <div class="px-3 pt-3 pb-1">
        <span class="text-[10px] font-semibold uppercase tracking-widest text-[#8A6D4B]">
          ${results.length} result${results.length !== 1 ? 's' : ''} for "${escapeHtml(query)}"
        </span>
      </div>
      ${shown.map(p => `
        <a href="${getProductURL(p)}" class="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f5f3ef] transition-colors cursor-pointer border-b border-[#ccc5bd]/15 last:border-b-0">
          <div class="w-12 h-14 rounded-lg overflow-hidden bg-[#efeeea] shrink-0 border border-[#ccc5bd]/20">
            <img src="${p.img}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover object-top" onerror="this.style.display='none'"/>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-[#1b1c1a] truncate leading-tight">${highlightMatch(p.title, query)}</p>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-xs font-semibold text-[#8A6D4B]">${p.price}</span>
              <span class="text-[10px] text-[#4a4640] uppercase">${p.fabric}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-[16px] text-[#ccc5bd] shrink-0">arrow_forward</span>
        </a>
      `).join('')}
      ${results.length > 5 ? `
        <a href="shop.html?search=${encodeURIComponent(query)}" class="block text-center py-3 text-xs font-semibold uppercase tracking-wider text-[#8A6D4B] hover:bg-[#f5f3ef] transition-colors border-t border-[#ccc5bd]/20">
          View all ${results.length} results →
        </a>
      ` : `
        <a href="shop.html?search=${encodeURIComponent(query)}" class="block text-center py-3 text-xs font-semibold uppercase tracking-wider text-[#8A6D4B] hover:bg-[#f5f3ef] transition-colors border-t border-[#ccc5bd]/20">
          View on Shop Page →
        </a>
      `}
    `;
  }

  function closeDropdown() {
    if (dropdownEl) { dropdownEl.remove(); dropdownEl = null; }
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length >= 2);
    let result = escaped;
    for (const term of terms) {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(regex, '<mark class="bg-[#fedeb2]/60 text-[#1b1c1a] rounded px-0.5">$1</mark>');
    }
    return result;
  }

  // ── Search Results Page (injected into shop.html) ──
  function renderSearchResultsPage(query) {
    const results = searchProducts(query);
    const mainContent = document.querySelector('main') || document.querySelector('.flex.flex-col.w-full');
    if (!mainContent) return;

    // Build results HTML
    const resultsHTML = `
      <section id="searchResultsSection" class="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        <div class="mb-8">
          <nav class="flex items-center gap-2 text-[#4a4640] mb-3">
            <a class="text-[10px] font-semibold uppercase tracking-widest hover:text-[#1b1c1a] transition-colors" href="index.html">Home</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <a class="text-[10px] font-semibold uppercase tracking-widest hover:text-[#1b1c1a] transition-colors" href="shop.html">Shop</a>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="text-[10px] font-semibold uppercase tracking-widest text-[#8A6D4B]">Search Results</span>
          </nav>
          <h1 class="font-display-hero text-3xl sm:text-4xl text-[#1b1c1a] tracking-tight mb-2" style="font-family:'Cormorant Garamond',serif">
            Results for '<span class="italic">${escapeHtml(query)}</span>'
          </h1>
          <p class="text-sm text-[#4a4640]" style="font-family:'Jost',sans-serif">
            ${results.length > 0 ? `Found <strong>${results.length}</strong> matching product${results.length !== 1 ? 's' : ''} in our collection.` : ''}
          </p>
        </div>

        ${results.length === 0 ? `
          <div class="text-center py-20">
            <span class="material-symbols-outlined text-[72px] text-[#ccc5bd] block mb-4">search_off</span>
            <h2 class="text-2xl font-semibold text-[#1b1c1a] mb-2" style="font-family:'Cormorant Garamond',serif">No Products Found</h2>
            <p class="text-sm text-[#4a4640] max-w-md mx-auto mb-6" style="font-family:'Jost',sans-serif">
              We couldn't find any products matching "<strong>${escapeHtml(query)}</strong>". Try searching for silk, bridal, blazer, organza, linen, velvet, kurta, or trouser.
            </p>
            <a href="shop.html" class="inline-block px-8 py-3 bg-[#000] text-white text-[11px] font-semibold uppercase tracking-[0.18em] rounded shadow hover:bg-[#4a4640] transition-colors" style="font-family:'Jost',sans-serif">
              Browse Full Collection
            </a>
          </div>
        ` : `
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            ${results.map(p => `
              <a href="${getProductURL(p)}" class="group bg-white rounded-xl overflow-hidden border border-[#ccc5bd]/30 shadow-sm hover:shadow-lg transition-all duration-300">
                <div class="aspect-[3/4] overflow-hidden bg-[#efeeea]">
                  <img src="${p.img}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-[#ccc5bd]\\' ><span class=\\'material-symbols-outlined text-[48px]\\'>image</span></div>'"/>
                </div>
                <div class="p-4">
                  <p class="text-[10px] font-semibold uppercase tracking-widest text-[#8A6D4B] mb-1" style="font-family:'Jost',sans-serif">${p.fabric}</p>
                  <h3 class="text-sm font-medium text-[#1b1c1a] leading-snug mb-2 group-hover:text-[#8A6D4B] transition-colors" style="font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:500">
                    ${escapeHtml(p.title)}
                  </h3>
                  <span class="text-sm font-semibold text-[#8A6D4B]" style="font-family:'Jost',sans-serif">${p.price}</span>
                </div>
              </a>
            `).join('')}
          </div>
        `}
      </section>
    `;

    // Clear main content and inject results
    mainContent.innerHTML = resultsHTML;
  }

  // ── Wire up search inputs ──
  function wireSearchInput(input) {
    if (!input || input.dataset.searchWired) return;
    input.dataset.searchWired = 'true';

    // Make parent container position:relative for dropdown
    const wrapper = input.closest('div');
    if (wrapper) wrapper.style.position = 'relative';

    let debounceTimer = null;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      const q = this.value.trim();
      if (q.length < 2) { closeDropdown(); return; }
      debounceTimer = setTimeout(() => {
        const results = searchProducts(q);
        renderDropdown(this, results, q);
      }, 200);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = this.value.trim();
        if (q.length >= 1) {
          closeDropdown();
          window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
        }
      }
      if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    input.addEventListener('focus', function () {
      const q = this.value.trim();
      if (q.length >= 2) {
        const results = searchProducts(q);
        renderDropdown(this, results, q);
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (dropdownEl && !dropdownEl.contains(e.target) && e.target.id !== 'headerSearchInput' && e.target.id !== 'mobileSearchInput') {
      closeDropdown();
    }
  });

  // ── Init on DOMContentLoaded ──
  document.addEventListener('DOMContentLoaded', function () {
    // Wire desktop & mobile search bars
    const headerSearch = document.getElementById('headerSearchInput');
    const mobileSearch = document.getElementById('mobileSearchInput');
    wireSearchInput(headerSearch);
    wireSearchInput(mobileSearch);

    // If on shop.html with ?search= param, render results
    const url = new URL(window.location.href);
    const searchQuery = url.searchParams.get('search');
    if (searchQuery && (window.location.pathname.includes('shop.html') || window.location.pathname.endsWith('shop'))) {
      // Pre-fill search bar
      if (headerSearch) headerSearch.value = searchQuery;
      if (mobileSearch) mobileSearch.value = searchQuery;
      // Render search results page
      setTimeout(() => renderSearchResultsPage(searchQuery), 100);
    }
  });

  // Expose for external use
  window.luxeLaneSearch = searchProducts;
})();
