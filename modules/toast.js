export function toast({ message, type }) {
  let existingToast = document.querySelector(".toast");
  if (existingToast) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    toast.style.transform = "translate(-50%, -20px)";
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.transform = "translate(-50%, 20px)";
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 5000);
}
