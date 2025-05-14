let mediaList = [];
let currentIndex = 0;

export function lightbox(src, mediaTitle, mediaArray) {
  // Stocke les médias et trouve l'index actuel
  mediaList = mediaArray;
  currentIndex = mediaArray.findIndex((media) => media.src === src);

  const parser = new DOMParser();

  const div = `
      <div class="lightbox">
          <button class="lightboxCloseButton" aria-label="Close lightbox">
              <i class="fa-solid fa-xmark"></i>
          </button>
          ${
            src.endsWith(".mp4")
              ? `<video class="lightbox__media" src="${src}" controls autoplay></video>`
              : `<img class="lightbox__media" src="${src}" alt="Lightbox media">`
          }
          <div class="lightbox__controls lightboxChevronContainer">
            <button class="lightbox__prev lightboxChevron" aria-label="Previous media">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="lightbox__next lightboxChevron" aria-label="Next media">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <span>${mediaTitle}</span>
      </div>
  `;

  const doc = parser.parseFromString(div, "text/html");
  const lightboxElement = doc.querySelector(".lightbox");

  // Ajoute un gestionnaire pour fermer la lightbox
  lightboxElement
    .querySelector(".lightboxCloseButton")
    .addEventListener("click", () => {
      lightboxElement.remove();
    });

  // Ajoute un gestionnaire pour le bouton précédent
  lightboxElement
    .querySelector(".lightbox__prev")
    .addEventListener("click", () => navigateMedia(-1));

  // Ajoute un gestionnaire pour le bouton suivant
  lightboxElement
    .querySelector(".lightbox__next")
    .addEventListener("click", () => navigateMedia(1));

  // Ajoute la lightbox au body
  document.body.appendChild(lightboxElement);
}

// Fonction pour naviguer entre les médias (précédent ou suivant)
function navigateMedia(direction) {
  currentIndex =
    (currentIndex + direction + mediaList.length) % mediaList.length;
  updateLightboxContent();
}

// Fonction pour mettre à jour le contenu de la lightbox
function updateLightboxContent() {
  const lightboxElement = document.querySelector(".lightbox");
  const media = mediaList[currentIndex];

  const mediaElement = media.src.endsWith(".mp4")
    ? `<video class="lightbox__media" src="${media.src}" controls autoplay></video>`
    : `<img class="lightbox__media" src="${media.src}" alt="Lightbox media">`;

  lightboxElement.querySelector(".lightbox__media").outerHTML = mediaElement;
  lightboxElement.querySelector("span").textContent = media.title;
}
