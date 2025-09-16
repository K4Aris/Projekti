document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const brandFilter = document.getElementById("brandFilter");
  const sortOptions = document.getElementById("sortOptions");
  const brandGrid = document.querySelector(".brand-grid");
  const carSection = document.getElementById("carSection");
  const carGrid = document.getElementById("carGrid");

  const brandTiles = Array.from(document.querySelectorAll(".brand-tile"));

  // Show/hide brands or search-specific cars
  function updateVisibility() {
    const query = (searchBar?.value || "").toLowerCase().trim();
    const selectedBrand = brandFilter?.value || "all";

    // Always get latest search cards
    const carCards = Array.from(document.querySelectorAll(".search-car-card"));

    if (query === "") {
      // Show brands, hide search cars
      brandGrid.style.display = "flex";
      carSection.style.display = "none";

      brandTiles.forEach(tile => {
        const brand = tile.dataset.brand || "";
        tile.style.display = (selectedBrand === "all" || brand === selectedBrand) ? "flex" : "none";
      });
      return;
    }

    // Show cars, hide brands
    brandGrid.style.display = "none";
    carSection.style.display = "block";

    let anyVisible = false;

    carCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const brand = card.dataset.brand || "";
      const matchesSearch = text.includes(query);
      const matchesBrand = selectedBrand === "all" || brand === selectedBrand;

      const show = matchesSearch && matchesBrand;
      card.style.display = show ? "block" : "none";
      if (show) anyVisible = true;
    });

    // No cars found message
    const noCarsMsg = carGrid.querySelector(".no-cars-message");
    if (!anyVisible) {
      if (!noCarsMsg) {
        const msg = document.createElement("p");
        msg.classList.add("no-cars-message");
        msg.style.color = "white";
        msg.style.textAlign = "center";
        msg.textContent = "No cars found.";
        carGrid.appendChild(msg);
      }
    } else if (noCarsMsg) {
      noCarsMsg.remove();
    }
  }

  // Sort cars
  function sortCars() {
    const carCards = Array.from(document.querySelectorAll(".search-car-card"));
    const val = sortOptions.value;

    carCards.sort((a, b) => {
      if (val === "priceLow") return Number(a.dataset.price) - Number(b.dataset.price);
      if (val === "priceHigh") return Number(b.dataset.price) - Number(a.dataset.price);
      if (val === "newest") return Number(b.dataset.year) - Number(a.dataset.year);
      return 0;
    });

    carCards.forEach(card => carGrid.appendChild(card));
  }

  // Event listeners
  if (searchBar) searchBar.addEventListener("input", updateVisibility);
  if (brandFilter) brandFilter.addEventListener("change", updateVisibility);
  if (sortOptions) sortOptions.addEventListener("change", () => {
    sortCars();
    updateVisibility();
  });

  // Initial display
  updateVisibility();
});
