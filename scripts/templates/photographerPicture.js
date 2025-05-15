// <--- Import --->
import { lightbox } from "../utils/lightbox.js";
import { incrementLikes } from "../templates/likesAndPrices.js";

// Fonction pour afficher les médias du photographe
export function photographerPicture(photographerMedia, photographerName) {
  // Crée une section pour les médias
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("media_section");

  const parser = new DOMParser();

  // Crée un tableau des médias pour la navigation
  const mediaArray = photographerMedia.map((media) => ({
    src: `assets/images/${photographerName}/${media.image || media.video}`,
    title: media.title,
  }));

  // Parcourt les médias du photographe courant
  photographerMedia.forEach((media) => {
    // Ajoute le nom du photographe dans le chemin
    const mediaPath = `assets/images/${photographerName}/${
      media.image || media.video
    }`;

    const mediaHTML = `
        <article class="media_card">
          ${
            media.image
              ? `<img src="${mediaPath}" alt="${media.title}, closeup view" class="media_item" tabindex="0">`
              : `<video src="${mediaPath}" alt="${media.title}, closeup view" class="media_item" tabindex="0"></video>`
          }
          <div class="media_info">
            <h1 tabindex="0">${media.title}</h1>
            <span class="likes" tabindex="0">${
              media.likes
            } <i class="fa-solid fa-heart" aria-label=”likes”></i> </span>
          </div>
        </article>
      `;

    // Convertit la chaîne HTML en un élément DOM
    const doc = parser.parseFromString(mediaHTML, "text/html");
    const mediaCard = doc.querySelector(".media_card");

    // Listener sur le bouton like
    mediaCard.querySelector(".likes").addEventListener("click", incrementLikes);
    // Listener pour le like avec la touche Enter
    mediaCard.querySelector(".likes").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        incrementLikes(e);
      }
    });

    // Listener pour ouvrir la lightbox
    const mediaItem = mediaCard.querySelector(".media_item");
    mediaItem.addEventListener("click", () => {
      lightbox(mediaPath, media.title, mediaArray);
    });
    // Ouvrir la lightbox avec la touche Enter
    mediaItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        lightbox(mediaPath, media.title, mediaArray);
      }
    });

    // Ajoute la carte média à la section
    mediaSection.appendChild(mediaCard);
  });

  // Ajoute la section des médias à la page
  const photographersSection = document.getElementById("main");
  photographersSection.appendChild(mediaSection);
}
