import { FC } from "react";

import { doc } from "firebase/firestore";

import { useFirestore, useFirestoreDocData } from "reactfire";

import { Splash } from "../splash";
import { SignUp } from "../sign-up";

import { MigrationComplete } from "../../routes/migration-complete";

interface Props {
  userUid: string;
}

export const FirestoreCheck: FC<Props> = ({ userUid }) => {
  const firestore = useFirestore();
  const {
    status,
    data: userDocData,
    error,
  } = useFirestoreDocData(doc(firestore, "users", `${userUid}1`));

  if (status === "loading") {
    return <Splash loading />;
  }

  if (error) {
    return <Splash message="Error connecting to the Firestore service" />;
  }

  if (userDocData) {
    return <MigrationComplete />;
  }

  return <SignUp />;
};
