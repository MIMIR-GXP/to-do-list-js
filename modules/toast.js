/**
 * Displays a toast notification with a specified message and type.
 *
 * @param {Object} options - Configuration options for the toast.
 * @param {string} options.message - The message to display in the toast.
 * @param {string} options.type - The type of toast, e.g., 'success' or 'error'.
 */
export function toast({ message, type }) {
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    return;
  }

  const toastElement = document.createElement("div");
  toastElement.className = `toast ${type}`;
  toastElement.innerText = message;
  document.body.appendChild(toastElement);

  // Show the toast with animation
  requestAnimationFrame(() => {
    toastElement.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    toastElement.style.transform = "translate(-50%, -20px)";
    toastElement.style.opacity = "1";
  });

  // Hide the toast after 5 seconds
  setTimeout(() => {
    toastElement.style.transform = "translate(-50%, 20px)";
    toastElement.style.opacity = "0";

    // Remove the toast element after the animation
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 500);
  }, 5000);
}
