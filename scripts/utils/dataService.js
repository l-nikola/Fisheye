// <--- Fonction pour récupérer les données des photographes et des médias --->
export async function getData() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du fichier JSON");
    }

    const data = await response.json();

    // Retourne les photographes et les médias
    return {
      photographers: data.photographers || [],
      media: data.media || [],
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
