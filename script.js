import { signIn, signUp } from "./modules/auth.js";
import { passwordInputShowButton } from "./modules/password-input.js";

/*
  Appel de la fonction signUp
  pour faire fonctionner le formulaire d'inscription.
*/
signUp();

/*
  Appel de la fonction signIn
  pour faire fonctionner le formulaire de connexion.
*/
signIn();

/*
  Appel de la fonction passwordInputShowButton
  pour faire fonctionner le bouton de visualisation du mot de passe sur le 
  champ de mot de passe dans le formulaire de connexion et d'inscription.
*/
passwordInputShowButton();
