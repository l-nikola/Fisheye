// <--- Import --->
import { photographerTemplate } from "../templates/photographer.js";
import { getData } from "../utils/dataService.js";

// Fonction pour incrémenter le nombre de likes
function incrementLikes(event) {
  const likeCount = event.currentTarget.firstChild;

  // Convertit le texte actuel en nombre
  let currentLikes = parseInt(likeCount.textContent);
  currentLikes += 1;

  likeCount.textContent = `${currentLikes} `;
}

// Fonction pour extraire l'ID depuis l'URL
function getCurrentPhotographer() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

// Fonction pour compter le nombre total de likes
function totalLikesCount(photographerMedia) {
  let totalLikes = 0;
  photographerMedia.forEach((media) => {
    totalLikes += media.likes;
  });
  return totalLikes;
}

// Fonction pour créer la section des likes et du prix
function totalLikeAndPrice(photographerMedia, price) {
  const parser = new DOMParser();

  const div = ` 
  <section class="totalLikeAndPrice">
    <div>
      <span class="totalLikes">${totalLikesCount(photographerMedia)}</span>
      <i class="fa-solid fa-heart"></i>
    </div>
    <span class="totalPrice">${price}€ /jour</span>
  </section>
  `;

  // Convertit la chaîne HTML en un élément DOM
  const doc = parser.parseFromString(div, "text/html");
  return doc.querySelector("section");
}

// Fonction pour créer un élément de filtre
function createFilterSelect() {
  const parser = new DOMParser();

  const select = ` 
  <section class="photographer_select">
    <label for="filter-select">Trier par</label>
    <select id="filter-select">
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

// Fonction pour afficher les médias du photographe
function photographerPicture(photographerMedia, photographerName) {
  // Crée une section pour les médias
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("media_section");

  const parser = new DOMParser();

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
            ? `<img src="${mediaPath}" alt="${media.title}">`
            : `<video controls src="${mediaPath}"></video>`
        }
        <div class="media_info">
          <h1>${media.title}</h1>
          <span class="likes">${
            media.likes
          } <i class="fa-solid fa-heart"></i> </span>
        </div>
      </article>
    `;

    // Convertit la chaîne HTML en un élément DOM
    const doc = parser.parseFromString(mediaHTML, "text/html");
    const mediaCard = doc.querySelector(".media_card");

    // Listener sur le bouton like
    mediaCard.querySelector(".likes").addEventListener("click", incrementLikes);

    // Ajoute la carte média à la section
    mediaSection.appendChild(mediaCard);
  });

  // Ajoute la section des médias à la page
  const photographersSection = document.getElementById("main");
  photographersSection.appendChild(mediaSection);
}

async function displayDataPhotographer(photographer, photographerMedia) {
  const photographersSection = document.getElementById("main");

  const photographerModel = photographerTemplate(photographer);

  const userCardDOM = photographerModel.getUserBannerDOM();
  photographersSection.appendChild(userCardDOM);

  const selectElement = createFilterSelect();
  photographersSection.appendChild(selectElement);

  const totalLike = totalLikeAndPrice(photographerMedia, photographer.price);
  photographersSection.appendChild(totalLike);
}

async function init() {
  // Récupère les datas des photographes et des médias
  const { photographers } = await getData();
  const { media } = await getData();
  const photographerId = getCurrentPhotographer();

  // Trouve le photographe correspondant
  const currentPhotographer = photographers.find(
    (photographer) => photographer.id === photographerId
  );

  // Filtre les médias pour ne garder que ceux du current photographe
  const photographerMedia = media.filter(
    (item) => item.photographerId === photographerId
  );

  displayDataPhotographer(currentPhotographer, photographerMedia);
  photographerPicture(photographerMedia, currentPhotographer.name);
}

init();
