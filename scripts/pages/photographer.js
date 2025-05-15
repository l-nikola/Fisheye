// <--- Import --->
import { photographerTemplate } from "../templates/photographer.js";
import { getData } from "../utils/dataService.js";
import { getCurrentPhotographer } from "../utils/dataService.js";
import { totalLikeAndPrice } from "../templates/likesAndPrices.js";
import { createFilterSelect } from "../templates/select.js";
import { photographerPicture } from "../templates/photographerPicture.js";
import { sortMedia } from "../templates/select.js";

async function displayDataPhotographer(photographer, photographerMedia) {
  const photographersSection = document.getElementById("main");

  const photographerModel = photographerTemplate(photographer);

  const userCardDOM = photographerModel.getUserBannerDOM();
  photographersSection.appendChild(userCardDOM);

  const selectElement = createFilterSelect();
  photographersSection.appendChild(selectElement);

  const totalLike = totalLikeAndPrice(photographerMedia, photographer.price);
  photographersSection.appendChild(totalLike);

  document
    .getElementById("filter-select")
    .addEventListener("change", (event) => {
      const sortBy = event.target.value;
      sortMedia(sortBy, photographerMedia, photographer.name);
    });
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
