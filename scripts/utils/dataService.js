import { PhotographerFactory } from "../factories/photographerFactory.js";
import { MediaFactory } from "../factories/mediaFactory.js";

// Fonction pour récupérer les données et instancier via les factories
export async function getData() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du fichier JSON");
    }

    const data = await response.json();

    // Utilisation des factories pour instancier les objets
    const photographers = (data.photographers || []).map((p) =>
      PhotographerFactory.create(p)
    );
    const media = (data.media || []).map((m) => MediaFactory.create(m));

    return {
      photographers,
      media,
    };
  } catch (error) {
    console.error("Erreur:", error);

    // En cas d'erreur, retourner des tableaux vides
    return {
      photographers: [],
      media: [],
    };
  }
}

// Fonction pour extraire l'ID depuis l'URL
export function getCurrentPhotographer() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}
