import { FC } from "react";

import { doc } from "firebase/firestore";

import { useFirestore, useFirestoreDocData } from "reactfire";

import { Splash } from "../splash";
import { SignUp } from "../sign-up";

import { useNavigate } from "react-router-dom";

interface Props {
  userUid: string;
}

export const FirestoreCheck: FC<Props> = ({ userUid }) => {
  const navigate = useNavigate();
  const firestore = useFirestore();
  const {
    status,
    data: userDocData,
    error,
  } = useFirestoreDocData(doc(firestore, "users", `${userUid}`));

  if (status === "loading") {
    return <Splash loading />;
  }

  if (error) {
    return <Splash message="Error connecting to the Firestore service" />;
  }

  if (userDocData) {
    navigate("/migration-complete");
  }

  return <SignUp />;
};
