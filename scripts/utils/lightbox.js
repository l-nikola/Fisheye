export function lightbox(src, mediaTitle) {
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
            <div class="lightbox__controls">
              <button class="lightbox__prev" aria-label="Previous media">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <button class="lightbox__next" aria-label="Next media">
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

  // Ajoute la lightbox au body
  document.body.appendChild(lightboxElement);
}
