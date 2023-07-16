// import { ReactNode } from "react";

// import { SignInButton } from "./components/sign-in-button";
// import { Splash } from "./components/splash";
// import { SignUp } from "./components/sign-up";

// import accessLogo from "./assets/csipro-access.png";
// import {
//   AuthProvider,
//   DatabaseProvider,
//   FirestoreProvider,
//   useFirebaseApp,
//   useSigninCheck,
// } from "reactfire";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";

// function AppProviders() {
//   const firebaseApp = useFirebaseApp();
//   const auth = getAuth(firebaseApp);
//   const db = getDatabase(firebaseApp);
//   const firestore = getFirestore(firebaseApp);

//   return (
//     <AuthProvider sdk={auth}>
//       <DatabaseProvider sdk={db}>
//         <FirestoreProvider sdk={firestore}>
//           <App />
//         </FirestoreProvider>
//       </DatabaseProvider>
//     </AuthProvider>
//   );
// }

// function App() {
// }

// export default AppProviders;
