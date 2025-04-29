function photographerTemplate(data) {
  const { name, portrait } = data;
  const picture = `assets/images/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const parser = new DOMParser();

    const article = `
      <article>
        <img src="${picture}" alt="${name}">
        <h2>${name}</h2>
        <span>${data.city}, ${data.country}</span>
        <span>${data.tagline}</span>
        <span>${data.price}€/jour</span>
      </article>
    `;

    // Converti la chaîne HTML en un document DOM.
    const doc = parser.parseFromString(article, "text/html");
    return doc.querySelector("article");
  }
  return { name, picture, getUserCardDOM };
}
