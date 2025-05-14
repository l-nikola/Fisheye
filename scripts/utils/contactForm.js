import { trapFocus } from "./trapFocus.js";

export function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  const nameElement = document.getElementById("photographer-name");

  // Met à jour le nom du photographe
  nameElement.textContent = photographerName;

  modal.style.display = "block";

  // Piège le focus dans la modale
  trapFocus(modal);

  // Place le focus sur le premier champ du formulaire
  const firstInput = modal.querySelector("input, textarea, select");
  if (firstInput) {
    firstInput.focus();
  }

  // Fermer la modale en cliquant sur Enter
  const closeIcon = document.getElementById("close-modal");
  closeIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      closeModal();
    }
  });
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
