export function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  const nameElement = document.getElementById("photographer-name");

  // Met à jour le nom du photographe
  nameElement.textContent = photographerName;

  modal.style.display = "block";

  // Fermer la modale en cliquant sur enter
  const closeIcon = document.getElementById("close-modal");
  closeIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      document.getElementById("contact_modal").style.display = "none";
    }
  });

  const firstInput = document.getElementById("modal-title");
  firstInput.focus();
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
