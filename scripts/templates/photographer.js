// <--- Import --->
import { displayModal, handleFormSubmit } from "../utils/contactForm.js";
import { closeModal } from "../utils/contactForm.js";

export function photographerTemplate(data) {
  const { name, portrait } = data;
  const picture = `assets/images/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const parser = new DOMParser();

    const article = `
      <article>
        <a href="/photographer.html?id=${data.id}">
          <div class="picture-wrapper">
            <img src="${picture}" alt="${name}">
          </div>
          <h2>${name}</h2>
        </a>
        <footer tabindex="0">
          <span class="city">${data.city}, ${data.country}</span>
          <span class="tag">${data.tagline}</span>
          <span class="price">${data.price}€/jour</span>
        </footer>
      </article>
    `;

    // Converti la chaîne HTML en un document DOM.
    const doc = parser.parseFromString(article, "text/html");
    return doc.querySelector("article");
  }

  function getUserBannerDOM() {
    const parser = new DOMParser();

    const article = `
      <article class="photograph_header">
        <section>
          <h1 tabindex="0">${name}</h1>
          <div>
            <span class="city" tabindex="0">${data.city}, ${data.country}</span>
            <p class="tagline" tabindex="0">${data.tagline}</p>
          </div>
        </section>
        <button class="contact_button" aria-label="Contact Me" aria-haspopup="dialog">
          Contactez-moi
        </button>
        <div class="photograph_header-img">
          <img class="review" tabindex="0" src="${picture}" alt="${name}">
        </div>
      </article>
    `;

    // Converti la chaîne HTML en un document DOM.
    const doc = parser.parseFromString(article, "text/html");

    // Gestionnaire d'événements pour le bouton "Contactez-moi"
    doc
      .querySelector(".contact_button")
      .addEventListener("click", () => displayModal(name));

    // Gestionnaire d'événements pour le bouton de fermeture
    const closeButton = document.querySelector("#contact_modal img");
    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    const modalSend = document.querySelector(".modalSend");
    modalSend.addEventListener("click", handleFormSubmit);

    return doc.querySelector("article");
  }

  return { name, picture, getUserCardDOM, getUserBannerDOM };
}
