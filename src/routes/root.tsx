import { Outlet } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import {
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";

import { Layout } from "../components/layout";

export const Root = () => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const db = getDatabase(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={db}>
        <FirestoreProvider sdk={firestore}>
          <Layout>
            <Outlet />
          </Layout>
        </FirestoreProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
};
