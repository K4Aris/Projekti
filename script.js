function openMenu() {
  document.getElementById("sideMenu").style.width = "250px";
  document.getElementById("overlay").classList.add("active");
}

function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
  document.getElementById("overlay").classList.remove("active");
}
