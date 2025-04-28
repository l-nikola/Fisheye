// <--- Fonction pour récupérer les photographes --->
async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du fichier JSON");
    }

    const data = await response.json();
    const photographers = data.photographers;

    // Retourne photographes récupérés
    return { photographers };
  } catch (error) {
    console.error("Erreur:", error);

    // En cas d'erreur, retourner un tableau vide
    return { photographers: [] };
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
