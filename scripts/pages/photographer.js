async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du fichier JSON");
    }

    const data = await response.json();
    const photographers = data.photographers;

    // Retourne les photographes récupérés
    return { photographers };
  } catch (error) {
    console.error("Erreur:", error);

    // En cas d'erreur, retourner un tableau vide
    return { photographers: [] };
  }
}

async function getMedia() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du fichier JSON");
    }

    const data = await response.json();
    const media = data.media;

    // Retourne les medias récupérés
    return { media };
  } catch (error) {
    console.error("Erreur:", error);

    // En cas d'erreur, retourner un tableau vide
    return { media: [] };
  }
}

// Fonction pour extraire l'ID depuis l'URL
function getCurrentPhotographer() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

async function displayDataPhotographer(photographer) {
  const photographersSection = document.getElementById("main");

  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserBannerDOM();
  photographersSection.appendChild(userCardDOM);
}

async function init() {
  // Récupère les datas des photographes et des médias
  const { photographers } = await getPhotographers();
  const { media } = await getMedia();
  const photographerId = getCurrentPhotographer();

  // Trouve le photographe correspondant
  const currentPhotographer = photographers.find(
    (photographer) => photographer.id === photographerId
  );

  // Filtre les médias pour ne garder que ceux du current photographe
  const photographerMedia = media.filter(
    (item) => item.photographerId === photographerId
  );

  displayDataPhotographer(currentPhotographer);

  console.log("Photographe sélectionné :", currentPhotographer);
  console.log("Médias du photographe :", photographerMedia);
}

init();
