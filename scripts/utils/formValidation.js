// Affiche un message d'erreur sur l'élément du formulaire
export function setError(condition, message) {
  if (!condition) {
    console.error(message);
    return false;
  } else {
    return true;
  }
}

// Valide le formulaire de contact
export function validateContactForm() {
  let isValid = true;

  // Prénom
  const firstName = document.getElementById("first");
  isValid &= setError(
    firstName.value.trim().length > 0,
    "Veuillez entrer votre prénom."
  );

  // Nom
  const lastName = document.getElementById("last");
  isValid &= setError(
    lastName.value.trim().length > 0,
    "Veuillez entrer votre nom."
  );

  // Email
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValid &= setError(
    emailRegex.test(email.value),
    "Veuillez entrer une adresse email valide."
  );

  // Message
  const message = document.getElementById("message");
  isValid &= setError(
    message.value.trim().length > 0,
    "Veuillez entrer un message."
  );

  return !!isValid;
}
