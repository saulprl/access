import { useAuth, useUser } from "reactfire";

import { Button } from "../components/button";
import { Splash } from "../components/splash";
import { useNavigate } from "react-router-dom";

export const MigrationComplete = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { status, data, error } = useUser();

  const handleSignOut = async () => {
    await auth.signOut();
  };

  if (status === "loading") {
    return <Splash loading />;
  }

  if (error) {
    return <Splash message="Error connecting to the Auth service" />;
  }

  if (!data) {
    navigate("/");
  }

  return (
    <>
      <Splash loading />
      <div className="absolute top-0 flex h-full w-full translate-x-[100%] animate-slide-in flex-row items-center justify-start overflow-hidden bg-slate-100 sm:rounded-lg">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold text-primary-700">
            You're all set!
          </h1>
          <p className="max-w-[60%] text-center text-primary-700">
            Thanks for helping out with the migration process
          </p>
          <h2 className="mt-2 text-center text-xl font-bold text-primary-700">
            Happy coding!
          </h2>
          <div className="mt-4 w-32">
            <Button label="Sign out" onClick={handleSignOut} />
          </div>
        </div>
      </div>
    </>
  );
};
