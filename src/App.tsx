import { ReactNode } from "react";

import { SignInButton } from "./components/sign-in-button";
import { Splash } from "./components/splash";
import { SignUp } from "./components/sign-up";

import accessLogo from "./assets/csipro-access.png";
import {
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  useFirebaseApp,
  useSigninCheck,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

function AppProviders() {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const db = getDatabase(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={db}>
        <FirestoreProvider sdk={firestore}>
          <App />
        </FirestoreProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

function App() {
  const { status, data: signInCheck, error } = useSigninCheck();

  if (status === "loading") {
    return (
      <Card>
        <Splash loading />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Splash message="Error connecting to the Auth service" />
      </Card>
    );
  }

  return (
    <Card>
      {!signInCheck.signedIn && (
        <>
          <img src={accessLogo} className="w-full" />
          <div className="absolute bottom-28 flex w-full flex-col gap-4 sm:bottom-16">
            <SignInButton provider="GitHub" />
            <SignInButton provider="Google" />
            <SignInButton provider="email" />
          </div>
        </>
      )}
      {signInCheck.signedIn && (
        <>
          <Splash />
          <SignUp />
        </>
      )}
      {/* <button
        className="absolute bottom-16 bg-slate-200 text-primary-700"
        onClick={() => setSignedIn((prev) => !prev)}
      >
        Toggle
      </button> */}
    </Card>
  );
}

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-slate-200">
      <div className="relative mx-auto h-full w-screen overflow-hidden border-slate-400 bg-primary-700 pb-20 pt-20 text-slate-200 shadow-md sm:h-[90%] sm:max-h-[90%] sm:max-w-md sm:rounded-lg sm:border sm:pb-4">
        {children}
      </div>
    </div>
  );
};

export default AppProviders;
