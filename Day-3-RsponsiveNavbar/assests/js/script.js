const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

openMenu.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("show");
});

closeMenu.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
});

window.addEventListener("resize", () => {
    if(window.innerWidth > 1200){
        sidebar.classList.remove("active");
        overlay.classList.remove("show");
    }
});