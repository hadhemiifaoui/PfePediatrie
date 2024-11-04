import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {

      //accueil  
      "textA1" : "Welcome to the PediHelp Application", 
       "textA2" : "Helping pediatricians make better diagnoses in emergencies.",
       "textA3" : " Get Started",
      "textA4" : "Helping pediatricians make better diagnoses in emergencies.",
      
       //header (nav bar)
      "PediHelp": "PediHelp",

        "home" : "Home",


        //hedhi login page
      "loginTitle": "Log in to PediHelp",
      "emailLabel": "Email",
      "passwordLabel": "Password",
      "loginButton": "Log In",
      "noAccountText": "Don't have an account?",
      "signupText": "Sign Up",
      "orSignupUsing": "Or sign up using",
      "enterEmailError": "Enter your email",
      "enterPasswordError": "Enter your password",

      //hedhi sighup page
       "signupTilte" : "Ctreate Your Account" ,
       "phoneNumberLabel" :"Phone Number",
       "firstNameLabel" :"First Name",
       "lastNameLabel" :"Last Name",
       "DOBLabel" : "DOB (dd/mm/yyyy)",
       "RoleLabel" : "Role",
       "createPassLabel" : "Create Password",
       "confirmPassLabel" : "Confirm Password",       
       "CheckBoxLabel" : "I have read and agree the Terms and conditions.",
       "buttonLabel" : "SIGN UP",
       "HaveAccountText" : "Already have a patient account?",
       "SignInText" : "Sign in" ,
       "nameerror" : "the name is required",
       "lastnameerror" : "the last name is required",
       "emailerror" : "the email is required",
       "emailInvalid" : "Invalid Email",
       "passwordLenghterror" : "The password must contain at least 6 characters",
       "roleerror" : "the role is required",
       "passworderror" : "the password is required",
       "passwrdDiffrenceError" : "Passwords do not match",
       "phoneerror" : "the phone is required",

       //dashboard Patient
          //sidebar:
          "home" : "Home",
          "healthProfile" : "Health Profile" ,
          "healthTrackers" : "Health Trackers",
          "medicalReprots" : "Medical Reports",
          "video" : "Video Consultation",
          "notes" : "Notes",
          "setting" : "Setting",
           "Backups":"Backups",

        //dashboard Patient
          //Home:
          "title1" : "Welcome to the Pediatric Dashboard" ,
           "typo1" : "Your comprehensive platform for managing pediatric health profiles, conditions, treatments, and more.",
           "title2" : "Patient Profiles",
           "typo2" : "Manage detailed profiles for pediatric patients, including personal information, medical history, and health conditions.",
           "title3" : "Health Trackers",
           "typo3" : "Keep track of vital health metrics for pediatric patients, ensuring timely interventions and monitoring.",
           "title4" : "Treatments and Medications",
           "typo4" : "Access and manage treatment plans and medication schedules for effective pediatric care.",
           "title5" : "Vaccinations",
           "typo5" : "Ensure pediatric patients are up-to-date with their vaccinations, with detailed records and schedules.",
          "title6" : "Weight Monitoring",
           "typo6" : "Monitor and record the weight of pediatric patients to ensure healthy growth and development.",
        
     //dashboard Patient
      //Child Profile:
           "title" : "Welcome to Child Profile",
           "name" : "Name",
           "dob" : "Date of Birth",
           "gender" :"Gender",
           "male" :"Male",
           "female" : "Femaele" ,
           "blood" :"Blood Type",
           "weight" :"Weight (kg)",
           "height" : "Height (cm)",
           "btn1" :"Save",
           "btn2": "Cancel",
           "weight1" :"Weight (kg)",
           "height1" : "Height (cm)",
           
      //Allergy Component
          "titleAllergy" : "Allergies Information" ,
            "show" :"Show",
            "hide": "Hide",
             "alergy" : "Allergy",
             "triggeredBy" : "Triggered By",
             "medications": "Medications",
             "LastUpdated" : "Last Updted",
             "reaction": "Reaction",
             "firstNoted" : " First Noted",
            "notesAllergy"  :"Notes",
             "noData" : "No data available",
             "btnCancel" : "Cancel",





       //dashboard admin

           //"homeAdmin" : "Home",
           "pediatricCases" : "Cas Pédiatriques",
           "diagnostics" : "Diagnostics",
           "symptoms" : "Symptoms",
            "speciality" : "Speciality",
            "tests" : "Tests",
            "users" : "Users",
       //dashboard admin (Home)

          "totalPatient" : "Total Patients",
          "consultations" : "Consultations",
          "treatement" : "Treatements",
          "alert" : "Alert",




   //--->$

       "TestRadiologiques" : "TestRadiologiques",
       "TestBacteriologiques" : "TestBacteriologiques",
       "TestBiologiques" : "TestBiologiques",


    //navbar el pediatre account
    "Logout" : "Logout",


    }
  },
  fr: {
    translation: {
    
      //accueil
        "textA1" : "Bienvenue sur l'application AidePédiatrique", 
        "textA2" : "Aider les pédiatres à établir de meilleurs diagnostics en cas d'urgence.",
        "textA3" : "Démarrer",
         "textA4" : "Aider les pédiatres à établir de meilleurs diagnostics en cas d'urgence.",

    //header (nav bar)
      "PediHelp": "AidePédiatrique",
       "home" : "Accueil",
         
    //hedhi login page
      "loginTitle": "Connectez-vous à AidePédiatrique",
      "emailLabel": "Email",
      "passwordLabel": "Mot de passe",
      "loginButton": "connecter",
      "noAccountText": "Vous n'avez pas de compte?",
      "signupText": "S'inscrire",
      "orSignupUsing": "Ou inscrivez-vous en utilisant",
      "enterEmailError": "Entrez votre email",
      "enterPasswordError": "Entrez votre mot de passe",

     //hedhi sighup page
      "signupTilte" : "Créer Votre Compte" ,
      "phoneNumberLabel" :"Numéro du Téléphone",
      "firstNameLabel" :"Nom",
       "lastNameLabel" :"Prénom",
       "DOBLabel" : "DDN (jj/mm/aaaa)",
       "RoleLabel" : "Rôle",
       "createPassLabel" : "Créer un mot de passe",
       "confirmPassLabel" : "confirmer le mot de passe",       
       "CheckBoxLabel" : "J'ai lu et j'accepte les termes et conditions.",
       "buttonLabel" : "S'INSCRIRE",
       "HaveAccountText" : "Vous avez déjà un compte patient ?",
       "SignInText" : "Se connecter",
       "nameerror" : "le nom est requis",
       "lastnameerror" : "le prénom est requis",
       "emailerror" : "l'email est requis",
       "emailInvalid" : "Address Email Invalide",
       "passwordLenghterror" : "Le mot de passe doit contenir au moins 6 caractères",
       "roleerror" : "le rôle est requis",
       "passworderror" : "le mot de passe est requis",
       "passwrdDiffrenceError" : "Les mots de passe ne correspondent pas",
       "phoneerror" : "le numéro de téléphone est requis",


      //dashboard Patient
          //sidebar:
          "home" : "Acceuil",
          "healthProfile" : "Profil de santé " ,
          "healthTrackers" : "Trackeur de santé",
          "medicalReprots" : "Rapport Medicales",
          "video" : "Consultation Védeo",
          "notes" : "Notes",
          "setting" : "Paramètres",
          "Backups":"Suavegardes",
  //dashboard Patient
          //Home:
          "title1" : "Bienvenue au Dashboard Pédiatrique" ,
           "typo1" : "Votre plateforme complète pour gérer les profils de santé pédiatriques, les conditions, les traitements et bien plus encore.",
           "title2" : "Profil de Patient",
           "typo2" : "Gérez les profils détaillés des patients pédiatriques, y compris les informations personnelles, les antécédents médicaux et les problèmes de santé.",
           "title3" : "Trackeur de santé",
           "typo3" : "Gardez une trace des paramètres de santé vitaux pour les patients pédiatriques, en garantissant des interventions et une surveillance en temps opportun.",
           "title4" : "Traitements et médicaments",
           "typo4" : "Accédez et gérez les plans de traitement et les calendriers de traitement pour des soins pédiatriques efficaces.",
           "title5" : "Vaccinations",
           "typo5" : "Assurez-vous que les patients pédiatriques sont à jour dans leurs vaccinations, avec des dossiers et des calendriers détaillés.",
          "title6" : "Surveillance du poids",
           "typo6" : "Surveillez et enregistrez le poids des patients pédiatriques pour assurer une croissance et un développement sains.",
        
 //dashboard Patient
      //Child Profile:
      "title" : "Bienvenue au Profil Enfant ",
      "name" : "Nom",
      "dob" : "Date de Naissance",
      "gender" :"Sexe",
      "male" :"Homme",
      "female" : "femme" ,
      "blood" :"Groupe sanguin",
      "weight" :"Poids  (kg)",
      "height" : "Hauteur (cm)",
      "btn1" :"Sauvegarder",
      "btn2": "Annuler",
      "weight1" :"Poids ",
      "height1" : "Hauteur (cm)",


   //Allergy Component
   "titleAllergy" : "Informations sur les allergies" ,
   "show" :"Montrer",
   "hide": "Cacher",
   "alergy" : "Allergie",
   "triggeredBy" : "Déclenché Par",
   "medications": "Medicaments",
   "LastUpdated" : "Dernière mise à jour",
   "reaction": "Réaction",
   "firstNoted" : "Noté en premier",
  "notesAllergy"  :"Notes",
   "noData" : "Pas de données disponibles",
   "btnCancel" : "Annuler",





   //dashboard admin
           "pediatricCases" : "Cas Cliniques",
           "diagnostics" : "Diagnostiques",
           "symptoms" : "Symptômes",
            "speciality" : "Specialité",
            "tests" : "Tests",
            "users" : "Utilisateurs",

          
   //--->$

   "TestRadiologiques" : "Test Radiologiques",
   "TestBacteriologiques" : "Test Bacteriologiques",
   "TestBiologiques" : "Test Biologiques",

   //dashboard admin (Home)

   "totalPatient" : "Totale Patients",
   "consultations" : "Consultations",
   "treatement" : "Traitements",
   "alert" : "Notificatons",


   //navbar el pediatre account
   "Logout" : "Se Deconnecter",



     
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', 
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
