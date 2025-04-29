function photographerTemplate(data) {
  const { name, portrait } = data;
  const picture = `assets/images/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const parser = new DOMParser();

    const article = `
      <article>
        <div class="picture-wrapper">
          <img src="${picture}" alt="${name}">
        </div>
        <h2>${name}</h2>
        <span class="city">${data.city}, ${data.country}</span>
        <span class="tag">${data.tagline}</span>
        <span class="price">${data.price}€/jour</span>
      </article>
    `;

    // Converti la chaîne HTML en un document DOM.
    const doc = parser.parseFromString(article, "text/html");
    return doc.querySelector("article");
  }
  return { name, picture, getUserCardDOM };
}
