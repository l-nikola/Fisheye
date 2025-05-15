// <--- Import --->
import { photographerPicture } from "../templates/photographerPicture.js";

// Fonction pour créer un élément de filtre
export function createFilterSelect() {
  const parser = new DOMParser();

  const select = ` 
    <section class="photographer_select">
      <label for="filter-select" tabindex="0">Trier par</label>
      <select id="filter-select" aria-label="Order by">
        <option value="popularity">Popularité</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
      </select>
    </section>
    `;

  // Convertit la chaîne HTML en un élément DOM
  const doc = parser.parseFromString(select, "text/html");
  return doc.querySelector("section");
}

// Fonction pour trier les médias
export function sortMedia(selectedOtion, mediaArray, photographerName) {
  let sortedMedia;

  switch (selectedOtion) {
    case "popularity":
      sortedMedia = [...mediaArray].sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      sortedMedia = [...mediaArray].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      break;
    case "title":
      sortedMedia = [...mediaArray].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;
    default:
      sortedMedia = mediaArray;
  }

  document.querySelector(".media_section").remove();

  // Réafficher les médias triés
  photographerPicture(sortedMedia, photographerName);
}
