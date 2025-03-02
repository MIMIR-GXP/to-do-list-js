/**
 * Toggles the visibility of the password input field by switching between show and hide buttons.
 */
export function passwordInputShowButton() {
  const passwordShowBtn = document.getElementById("password-show");
  const passwordHideBtn = document.getElementById("password-hidden");
  const passwordInput = document.getElementById("password");

  if (passwordShowBtn && passwordHideBtn && passwordInput) {
    /**
     * Event handler to show the password.
     */
    const showPassword = () => {
      passwordInput.type = "text";
      passwordShowBtn.style.display = "none";
      passwordHideBtn.style.display = "block";
    };

    /**
     * Event handler to hide the password.
     */
    const hidePassword = () => {
      passwordInput.type = "password";
      passwordShowBtn.style.display = "block";
      passwordHideBtn.style.display = "none";
    };

    passwordShowBtn.addEventListener("click", showPassword);
    passwordHideBtn.addEventListener("click", hidePassword);
  }
}
