document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const brandFilter = document.getElementById("brandFilter");
  const sortOptions = document.getElementById("sortOptions");
  const brandGrid = document.querySelector(".brand-grid");

  let brandTiles = Array.from(document.querySelectorAll(".brand-tile"));

  function normalizeBrandKey(displayName) {
    if (!displayName) return "";
    const tokens = displayName.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/);
    return tokens.length ? tokens[0] : displayName.toLowerCase();
  }

  brandTiles.forEach(tile => {
    const displayName = tile.querySelector("p")?.innerText || "";
    const brandKey = normalizeBrandKey(displayName);
    tile.dataset.brand = brandKey;

    if (brandKey === "bmw") { tile.dataset.price = 85000; tile.dataset.year = 2023; }
    else if (brandKey === "mercedes") { tile.dataset.price = 75000; tile.dataset.year = 2022; }
    else if (brandKey === "porsche") { tile.dataset.price = 120000; tile.dataset.year = 2024; }
    else if (brandKey === "toyota") { tile.dataset.price = 50000; tile.dataset.year = 2021; }
    else { tile.dataset.price = 60000; tile.dataset.year = 2020; }
  });

  function updateVisibility() {
    const q = (searchBar?.value || "").toLowerCase().trim();
    const selectedBrand = brandFilter?.value || "all";

    brandTiles.forEach(tile => {
      const name = (tile.querySelector("p")?.innerText || "").toLowerCase();
      const brand = tile.dataset.brand || "";
      const matchesSearch = q === "" || name.includes(q);
      const matchesBrand = selectedBrand === "all" || brand === selectedBrand;

      tile.style.display = (matchesSearch && matchesBrand) ? "flex" : "none";
    });
  }

  if (searchBar) {
    searchBar.addEventListener("input", () => {
      updateVisibility();
    });
  }

  if (brandFilter) {
    brandFilter.addEventListener("change", () => {
      updateVisibility();
    });
  }

  if (sortOptions) {
    sortOptions.addEventListener("change", () => {
      brandTiles = Array.from(document.querySelectorAll(".brand-tile"));

      const val = sortOptions.value;
      if (val === "priceLow") {
        brandTiles.sort((a, b) => Number(a.dataset.price || 0) - Number(b.dataset.price || 0));
      } else if (val === "priceHigh") {
        brandTiles.sort((a, b) => Number(b.dataset.price || 0) - Number(a.dataset.price || 0));
      } else if (val === "newest") {
        brandTiles.sort((a, b) => Number(b.dataset.year || 0) - Number(a.dataset.year || 0));
      }
      brandGrid.innerHTML = "";
      brandTiles.forEach(t => brandGrid.appendChild(t));
      updateVisibility();
    });
  }

  updateVisibility();
});
