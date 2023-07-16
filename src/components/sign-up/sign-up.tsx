import bcrypt from "bcryptjs";

import { useEffect, useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  equalTo,
  limitToFirst,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";

import { useAuth, useDatabase, useUser } from "reactfire";

import { BiSolidLock } from "react-icons/bi";
import { BsFillCalendarFill, BsFillPersonFill } from "react-icons/bs";
import { FaIdBadge } from "react-icons/fa";

import { Button } from "../button";
import { Input } from "../input";
import { LoadingSpinner } from "../loading-spinner";
import { Splash } from "../splash";
import { Step } from "../step";

const passcodeRegex = /^(?=.*[\d])(?=.*[A-D])[\dA-D]{4,8}$/gim;

interface LegacyUser {
  name: string;
  unisonId: string;
  csiId: number;
  passcode: string;
}

interface UniSonIDForm {
  unisonId: string;
}

interface MigrationForm {
  name: string;
  dob: string;
  passcode: string;
}

export const SignUp = () => {
  const auth = useAuth();
  const db = useDatabase();
  const { status: userStatus, data: user, error: userError } = useUser();
  user;

  const [legacyUser, setLegacyUser] = useState<LegacyUser>();
  const [legacyUserLoading, setLegacyUserLoading] = useState(false);

  const {
    control: unisonIdControl,
    handleSubmit: handleUnisonIdSubmit,
    formState: { errors: unisonIdErrors },
  } = useForm<UniSonIDForm>();

  const {
    control: personalControl,
    getValues: getPersonal,
    handleSubmit: handlePersonalSubmit,
    reset: resetPersonal,
    formState: { errors: personalErrors },
  } = useForm<Omit<MigrationForm, "passcode">>({
    defaultValues: {
      name: legacyUser?.name,
    },
  });
  getPersonal();

  const {
    control: credentialsControl,
    getValues: getCredentials,
    handleSubmit: handleCredentialsSubmit,
    formState: { errors: credentialsErrors },
  } = useForm<Pick<MigrationForm, "passcode">>();
  getCredentials();

  const [step, setStep] = useState(0);

  const [unisonIdError, setUnisonIdError] = useState<string>();
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  useEffect(() => {
    setLegacyUserLoading(false);

    resetPersonal({
      name: legacyUser?.name,
    });
  }, [legacyUser, resetPersonal]);

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleGoBack = () => {
    previousStep();
  };

  const handleProceed = () => {
    nextStep();
  };

  const onUnisonIdSubmit: SubmitHandler<UniSonIDForm> = (data) => {
    if (step > 1) return;

    setLegacyUserLoading(true);

    const usersRef = ref(db, "users");
    const usersQuery = query(
      usersRef,
      orderByChild("unisonId"),
      equalTo(data.unisonId),
      limitToFirst(1),
    );

    onValue(
      usersQuery,
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            if (child.exists()) {
              setUnisonIdError(undefined);

              const legacyUser = child.val() as LegacyUser;
              if (!legacyUser) return;

              setLegacyUser(legacyUser);

              setTimeout(() => nextStep(), 300);
            }
          });
        } else {
          setLegacyUser(undefined);
          setLegacyUserLoading(false);
          setUnisonIdError("Couldn't find a user with the provided UniSon ID");
        }
      },
      { onlyOnce: true },
    );
  };

  const clearPersonalDataErrors = () => {
    setNameError("");
    setDobError("");
  };

  const onPersonalSubmit: SubmitHandler<Omit<MigrationForm, "passcode">> = (
    data,
  ) => {
    if (step > 2) return;
    clearPersonalDataErrors();

    const { name, dob } = data;
    if (!name || !dob) return;
    console.log(data);

    if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters long");
      return;
    }

    nextStep();
  };

  const onCredentialsSubmit: SubmitHandler<
    Pick<MigrationForm, "passcode">
  > = async (data) => {
    setPasscodeError("");
    console.log(data);

    const passcode = data.passcode.trim().toUpperCase();
    if (!legacyUser) {
      setPasscodeError("Something went wrong");
      return;
    }

    if (!passcodeRegex.test(passcode)) {
      setPasscodeError("Invalid passcode");
      return;
    }

    if (!(await bcrypt.compare(passcode, legacyUser.passcode))) {
      setPasscodeError("Passcode doesn't match");
      return;
    }

    console.log("Success");
  };

  if (userStatus === "loading") {
    return <Splash loading />;
  }

  if (userError) {
    console.error(userError);

    return <Splash message="Error connecting to the Auth service" />;
  }

  const disableInputs = !legacyUser;

  return (
    <div className="absolute top-0 flex h-full w-full translate-x-[100%] animate-slide-in flex-row items-center justify-start overflow-hidden bg-slate-100 sm:rounded-lg">
      <div className="relative top-0 h-full w-full overflow-hidden">
        <div className="absolute left-8 top-8 z-10 w-32">
          <Button label="Sign out" onClick={() => auth.signOut()} />
        </div>
        <div
          className="absolute top-0 flex h-full w-full transition-transform duration-500"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          <Step className="animate-fade-in opacity-0">
            <h1 className="text-center text-3xl font-bold">Welcome</h1>
            <p className="mb-3 text-center">It seems you're new here</p>
            <Button label="Get started" onClick={handleProceed} />
          </Step>
          <Step>
            <h2 className="text-xl">Provide your UniSon ID</h2>
            <form onSubmit={handleUnisonIdSubmit(onUnisonIdSubmit)}>
              <Controller
                control={unisonIdControl}
                name="unisonId"
                rules={{
                  required: "Your UniSon ID is required",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="unison-id-input"
                    label="UniSon ID"
                    icon={<FaIdBadge />}
                    placeholder="e.g. 217200160"
                    type="number"
                    error={unisonIdError || unisonIdErrors.unisonId?.message}
                  />
                )}
              />
              <div className="relative mt-4 flex w-full flex-row justify-between gap-2">
                <Button
                  variant="secondary"
                  label="Back"
                  onClick={handleGoBack}
                  className="flex-1"
                  disabled={legacyUserLoading}
                />
                <Button
                  type="submit"
                  label="Confirm"
                  className="flex-[2]"
                  disabled={legacyUserLoading}
                />
                {legacyUserLoading && (
                  <div className="absolute -bottom-24 left-[50%] -translate-x-[50%]">
                    <LoadingSpinner onBackground />
                  </div>
                )}
              </div>
            </form>
          </Step>
          <Step>
            <form
              className="flex w-full flex-col items-center justify-center gap-2"
              onSubmit={handlePersonalSubmit(onPersonalSubmit)}
            >
              <h2 className="text-center text-xl">Personal data</h2>
              <Controller
                name="name"
                control={personalControl}
                rules={{
                  required: "Your name is required",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="access-name"
                    label="Name"
                    icon={<BsFillPersonFill />}
                    placeholder="e.g. Saúl Ramos"
                    error={nameError || personalErrors.name?.message}
                    disabled={disableInputs}
                  />
                )}
              />
              <Controller
                name="dob"
                control={personalControl}
                rules={{
                  required: "Your date of birth is required",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="dob"
                    label="Date of birth"
                    icon={<BsFillCalendarFill />}
                    type="date"
                    error={dobError || personalErrors.dob?.message}
                    disabled={disableInputs}
                  />
                )}
              />
              <div className="mt-1 flex w-full flex-row justify-between gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  label="Back"
                  onClick={handleGoBack}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  label="Next"
                  className="flex-[2]"
                  disabled={disableInputs}
                />
              </div>
            </form>
          </Step>
          <Step>
            <form
              className="flex w-full flex-col items-center justify-center gap-2"
              onSubmit={handleCredentialsSubmit(onCredentialsSubmit)}
            >
              <h2 className="text-center text-xl">Access data</h2>
              <p className="text-center text-sm">
                Please, enter your <strong>CSI Passcode</strong>
              </p>
              {legacyUser && (
                <>
                  <p className="text-center">
                    Your <strong>CSI ID</strong> is
                  </p>
                  <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-700 text-center tabular-nums ">
                    {legacyUser.csiId}
                  </span>
                </>
              )}
              <Controller
                name="passcode"
                control={credentialsControl}
                rules={{ required: "Your passcode is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="passcode"
                    icon={<BiSolidLock />}
                    label="CSI Passcode"
                    placeholder=" "
                    tooltip="Only numbers and letters. Case sensitive."
                    type="password"
                    error={passcodeError || credentialsErrors.passcode?.message}
                    disabled={disableInputs}
                  />
                )}
              />
              <div className="mt-1 flex w-full flex-row justify-between gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  label="Back"
                  onClick={handleGoBack}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  label="Complete setup"
                  className="flex-[2]"
                  disabled={disableInputs}
                />
              </div>
            </form>
          </Step>
        </div>
      </div>
    </div>
  );
};
