const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close-btn, .close-action");
const overlay = document.getElementById("overlay");
const modals = document.querySelectorAll(".modal");

openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const targetModal = document.getElementById(modalId);

        closeAllModals();

        overlay.classList.add("show");
        targetModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", closeAllModals);
});

overlay.addEventListener("click", closeAllModals);

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        closeAllModals();
    }
});

function closeAllModals() {
    modals.forEach(modal => modal.classList.remove("show"));
    overlay.classList.remove("show");
    document.body.style.overflow = "auto";
}

const form = document.querySelector(".modal-form");

form.addEventListener("submit", e => {
    e.preventDefault();

    alert("Message Submitted Successfully!");
    form.reset();
    closeAllModals();
});