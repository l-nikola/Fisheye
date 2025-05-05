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

// Fonction pour extraire l'ID depuis l'URL
function getCurrentPhotographer() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();

  // Trouve le photographe correspondant
  const currentPhotographer = photographers.find(
    (photographer) => photographer.id === getCurrentPhotographer()
  );

  console.log("Photographe sélectionné :", currentPhotographer);
}

init();
