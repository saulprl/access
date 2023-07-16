import { ChangeEvent, useEffect, useState } from "react";

import { BiSolidLock } from "react-icons/bi";
import { BsFillCalendarFill, BsFillPersonFill } from "react-icons/bs";
import { FaIdBadge } from "react-icons/fa";

import { Button } from "../button";
import { Input } from "../input";
import { Step } from "../step";
import { useAuth, useDatabase, useDatabaseListData, useUser } from "reactfire";
import { Splash } from "../splash";
import {
  equalTo,
  limitToFirst,
  orderByChild,
  query,
  ref,
} from "firebase/database";

const passcodeRegex = /^(?=.*[\d])(?=.*[A-D])[\dA-D]{4,8}$/gm;

interface LegacyUser {
  name: string;
  unisonId: string;
  csiId: number;
  passcode: string;
}

export const SignUp = () => {
  const auth = useAuth();
  const db = useDatabase();
  const { status: userStatus, data: user, error: userError } = useUser();
  console.log(user);

  const [step, setStep] = useState(3);

  const [unisonId, setUnisonId] = useState("");
  const [unisonIdValid, setUnisonIdValid] = useState(false);

  const usersRef = ref(db, "users");
  const usersQuery = query(
    usersRef,
    orderByChild("unisonId"),
    equalTo(unisonId),
    limitToFirst(1),
  );
  const {
    status: legacyStatus,
    data: legacyData,
    error: legacyError,
  } = useDatabaseListData<LegacyUser | undefined>(usersQuery, {
    idField: "key",
  });

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [dobValue, setDobValue] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [dobError, setDobError] = useState("");

  const [csiId, setCsiId] = useState<number>();

  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  const clearData = () => {
    setName("");
    setDob(undefined);
    setDobValue("");
    setPasscode("");
    setCsiId(undefined);
    setUnisonIdValid(false);
  };

  useEffect(() => {
    if (!legacyData || legacyData.length === 0) return;

    const legacyUser = legacyData[0];
    if (!legacyUser) return;

    setName(legacyUser.name);
    setCsiId(legacyUser.csiId);
    setUnisonIdValid(true);
  }, [legacyData]);

  useEffect(() => {
    clearData();
  }, [unisonId]);

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

  const handleUnisonIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnisonId(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.valueAsDate;
    if (!inputDate) {
      return;
    }

    console.log(dob);
    const offset = inputDate.getTimezoneOffset();
    const offsetDate = new Date(inputDate.getTime() + offset * 60 * 1000);

    setDob(offsetDate);
    setDobValue(event.target.value);
  };

  const handlePasscodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasscode(event.target.value?.trim().toUpperCase());
  };

  const clearPersonalDataErrors = () => {
    setNameError("");
    setDobError("");
  };

  const validatePersonalData = () => {
    clearPersonalDataErrors();

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long");
      return;
    }

    if (!dob) {
      setDobError("Please provide a valid date");
      return;
    }

    nextStep();
  };

  const validateCredentials = () => {
    setPasscodeError("");

    if (!passcodeRegex.test(passcode)) {
      setPasscodeError("Please provide a valid passcode");
      return;
    }

    setCsiId(2);
    nextStep();
  };

  if (userStatus === "loading") {
    return <Splash loading />;
  }

  if (userError) {
    console.error(legacyError);

    return <Splash message="Error connecting to the Auth service" />;
  }

  const disableInputs =
    !unisonIdValid || legacyStatus === "loading" || !legacyData;

  return (
    <div className="absolute top-0 flex h-full w-full translate-x-[100%] animate-slide-in flex-row items-center justify-start overflow-hidden bg-slate-100 sm:rounded-lg">
      <div className="relative top-0 h-full w-full overflow-hidden">
        <Button
          className="absolute left-8 top-8 z-10 w-32"
          label="Sign out"
          onClick={() => void auth.signOut()}
        />
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
            <Input
              id="unison-id-input"
              label="UniSon ID"
              icon={<FaIdBadge />}
              onChange={handleUnisonIdChange}
              placeholder="e.g. 217200160"
              value={unisonId}
              type="number"
              error=""
              maxLength={9}
            />
            <div className="mt-1 flex w-full flex-row justify-between gap-2">
              <Button
                variant="secondary"
                label="Back"
                onClick={handleGoBack}
                className="flex-1"
              />
              <Button
                label="Proceed"
                onClick={handleProceed}
                className="flex-[2]"
                disabled={disableInputs}
              />
            </div>
          </Step>
          <Step>
            <h2 className="text-center text-xl">Personal data</h2>
            <Input
              disabled
              id="unison-id"
              label="UniSon ID"
              icon={<FaIdBadge />}
              value={unisonId}
            />
            <Input
              id="access-name"
              label="Name"
              icon={<BsFillPersonFill />}
              onChange={handleNameChange}
              placeholder="e.g. Saúl Ramos"
              value={name}
              error={nameError}
              disabled={disableInputs}
            />
            <Input
              id="dob"
              label="Date of birth"
              icon={<BsFillCalendarFill />}
              onChange={handleDateChange}
              value={dobValue}
              type="date"
              error={dobError}
              disabled={disableInputs}
            />
            <div className="mt-1 flex w-full flex-row justify-between gap-2">
              <Button
                variant="secondary"
                label="Back"
                onClick={handleGoBack}
                className="flex-1"
              />
              <Button
                label="Next"
                onClick={validatePersonalData}
                className="flex-[2]"
                disabled={disableInputs}
              />
            </div>
          </Step>
          <Step>
            <h2 className="text-center text-xl">Access data</h2>
            <p className="text-center text-sm">
              Please, enter your <strong>CSI Passcode</strong>
            </p>
            <p className="text-center">
              Your <strong>CSI ID</strong> is
            </p>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-700 text-center tabular-nums ">
              {csiId}
            </span>
            <Input
              id="passcode"
              icon={<BiSolidLock />}
              label="CSI Passcode"
              placeholder=" "
              tooltip="Only numbers and letters. Case insensitive."
              value={passcode}
              onChange={handlePasscodeChange}
              type="password"
              error={passcodeError}
              disabled={disableInputs}
            />
            <div className="mt-1 flex w-full flex-row justify-between gap-2">
              <Button
                variant="secondary"
                label="Back"
                onClick={handleGoBack}
                className="flex-1"
              />
              <Button
                label="Complete setup"
                onClick={validateCredentials}
                className="flex-[2]"
                disabled={disableInputs}
              />
            </div>
          </Step>
        </div>
      </div>
    </div>
  );
};
