// Fonction pour créer la section des likes et du prix
export function totalLikeAndPrice(photographerMedia, price) {
  const parser = new DOMParser();

  const div = ` 
      <section class="totalLikeAndPrice">
        <div tabindex="0">
          <span class="totalLikes">${totalLikesCount(photographerMedia)}</span>
          <i class="fa-solid fa-heart"></i>
        </div>
        <span class="totalPrice" tabindex="0">${price}€ /jour</span>
      </section>
      `;

  // Convertit la chaîne HTML en un élément DOM
  const doc = parser.parseFromString(div, "text/html");
  return doc.querySelector("section");
}

// Fonction pour compter le nombre total de likes
function totalLikesCount(photographerMedia) {
  let totalLikes = 0;
  photographerMedia.forEach((media) => {
    totalLikes += media.likes;
  });
  return totalLikes;
}

// Fonction pour incrémenter le nombre de likes
export function incrementLikes(event) {
  const likeCount = event.currentTarget.firstChild;

  // Convertit le texte actuel en nombre
  let currentLikes = parseInt(likeCount.textContent);
  currentLikes += 1;

  // Met à jour le compteur de likes individuel
  likeCount.textContent = `${currentLikes} `;

  // Met à jour le compteur total des likes
  const totalLikesElement = document.querySelector(".totalLikes");
  if (totalLikesElement) {
    let totalLikes = parseInt(totalLikesElement.textContent);
    totalLikes += 1;
    totalLikesElement.textContent = totalLikes;
  }
}
