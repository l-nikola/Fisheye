export function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  const nameElement = document.getElementById("photographer-name");

  // Met à jour le nom du photographe
  nameElement.textContent = photographerName;

  modal.style.display = "block";
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
