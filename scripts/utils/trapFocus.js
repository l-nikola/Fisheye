export function trapFocus(containerElement) {
  const focusableElements = Array.from(
    containerElement.querySelectorAll("button, input, textarea, [tabindex]")
  );

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  containerElement.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const isShiftPressed = e.shiftKey;

      if (isShiftPressed && document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      } else if (
        !isShiftPressed &&
        document.activeElement === lastFocusableElement
      ) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  });
}
