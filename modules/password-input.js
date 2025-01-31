export function passwordInputShowButton() {
  const passwordShow = document.getElementById("password-show");
  const passwordHidden = document.getElementById("password-hidden");
  const passwordInput = document.getElementById("password-input");

  if (passwordShow) {
    passwordShow.addEventListener("click", () => {
      passwordInput.type = "text";
      passwordShow.style.display = "none";
      passwordHidden.style.display = "block";
    });
  }
  if (passwordHidden) {
    passwordHidden.addEventListener("click", () => {
      passwordInput.type = "password";
      passwordShow.style.display = "block";
      passwordHidden.style.display = "none";
    });
  }
}
