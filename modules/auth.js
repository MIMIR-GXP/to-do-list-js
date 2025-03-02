import { toast } from "./toast.js";

/**
 * Constants for localStorage keys.
 */
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const REDIRECT_DELAY = 3000;

/**
 * Retrieves the list of users from localStorage.
 * @returns {Array<{ email: string, id: string, name: string, password: string }>} The array of user objects.
 */
const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

/**
 * Saves the list of users to localStorage.
 * @param {Array<{ email: string, id: string, name: string, password: string }>} users - The array of user objects to save.
 */
const setUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/**
 * Removes the current user from localStorage.
 */
const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

/**
 * Sets the current user in localStorage.
 * @param {{email: string, id: string, name: string, password: string}} user - The user object to set.
 */
const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

/**
 * Redirects the user to a specified URL after a delay.
 * @param {string} url - The URL to redirect to.
 */
const redirectTo = (url) => {
  setTimeout(() => {
    window.location.href = url;
  }, REDIRECT_DELAY);
};

/**
 * Handles user sign-up by capturing form data, validating, and storing the new user.
 */
export function signUp() {
  const formSignUp = document.getElementById("sign-up-form");
  if (formSignUp) {
    formSignUp.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(formSignUp);
      const id = crypto.randomUUID();
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const users = getUsers();

      const isEmailUsed = users.some((user) => user.email === email);

      if (isEmailUsed) {
        toast({
          message: "Email is already used. Please choose another.",
          type: "error",
        });
        return;
      }

      const newUser = { id, name, email, password };
      const updatedUsers = [...users, newUser];

      // Save the new user to localStorage and set as current user
      setUsers(updatedUsers);
      setCurrentUser(newUser);

      toast({
        message: "Account created successfully. Redirecting...",
        type: "success",
      });

      // Redirect to the application page
      redirectTo("/app/app.html");
    });
  }
}

/**
 * Handles user sign-in by validating credentials and setting the current user.
 */
export function signIn() {
  const formSignIn = document.getElementById("sign-in-form");
  if (formSignIn) {
    formSignIn.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(formSignIn);
      const email = formData.get("email");
      const password = formData.get("password");

      const users = getUsers();
      const user = users.find((user) => user.email === email);

      if (!user || user.password !== password) {
        toast({
          message: "Invalid email or password.",
          type: "error",
        });
        return;
      }

      setCurrentUser(user);

      toast({
        message: "Signed in successfully. Redirecting...",
        type: "success",
      });

      // Redirect to the application page
      redirectTo("/app/app.html");
    });
  }
}

/**
 * Handles user sign-out by removing the current user and redirecting to the sign-in page.
 */
export function signOut() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      removeCurrentUser();
      toast({
        message: "Signed out successfully. Redirecting...",
        type: "success",
      });
      // Redirect to the sign-in page
      redirectTo("/auth/sign-in.html");
    });
  }
}
