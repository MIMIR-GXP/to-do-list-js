import { app } from "./modules/app.js";
import { signIn, signOut, signUp } from "./modules/auth.js";
import { passwordInputShowButton } from "./modules/password-input.js";

/*
  Initialization of authentication functions and password visualization.
*/
signUp();
signIn();
passwordInputShowButton();
signOut();

/*
  Management of redirections based on the user's state and the current path.
*/
const currentUser = localStorage.getItem("currentUser");
const path = window.location.pathname;

// Define access paths
const appPath = "/app/app.html";
const homePath = "/";
const signInPath = "/auth/sign-in.html";
const signUpPath = "/auth/sign-up.html";

// If the user is logged in
if (currentUser) {
  // Redirect away from home and authentication pages to the application
  if ([homePath, signInPath, signUpPath].includes(path)) {
    window.location.href = appPath;
  }
  // Initialize the application if on the application page
  else if (path === appPath) {
    app();
  }
} else {
  // If the user is not logged in, prevent access to the application
  if (path === appPath) {
    window.location.href = homePath;
  }
}
