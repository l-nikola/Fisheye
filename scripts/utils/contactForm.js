// <--- Import --->
import { trapFocus } from "./trapFocus.js";
import { validateContactForm } from "./formValidation.js";

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

// Fonction pour gérer l'envoi du formulaire
export function handleFormSubmit(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Vérifie si le formulaire est valide
  if (!validateContactForm()) {
    return;
  }

  // Récupération des données du formulaire
  const form = document.querySelector("#contact_modal form");
  let formData = {
    firstName: form.first.value,
    lastName: form.last.value,
    email: form.email.value,
    message: form.message.value,
  };

  // Affiche les données dans la console
  console.log("Données du formulaire :", formData);

  closeModal();

  // Reset le formulaire
  document.querySelector("#contact_modal form").reset();
}
