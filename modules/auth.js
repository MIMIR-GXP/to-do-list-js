import { toast } from "./toast.js";

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

      const users = JSON.parse(localStorage.getItem("users")) || [];

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

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      toast({
        message: "Account created successfully.",
        type: "success",
      });
    });
  }
}

export function signIn() {
  const formSignIn = document.getElementById("sign-in-form");
  if (formSignIn) {
    formSignIn.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(formSignIn);
      const email = formData.get("email");
      const password = formData.get("password");
      console.log("Sign in form is available", email, password);
      // Implement sign in logic here
    });
  }
}
