import { ChangeEvent, useState } from "react";

import { BiSolidLock } from "react-icons/bi";
import { BsFillCalendarFill, BsFillPersonFill } from "react-icons/bs";
import { FaIdBadge } from "react-icons/fa";

import { Button } from "../button";
import { Input } from "../input";
import { Step } from "../step";

const passcodeRegex = /^(?=.*[\d])(?=.*[A-D])[\dA-D]{4,8}$/gm;

export const SignUp = () => {
  const [step, setStep] = useState(0);

  const [unisonId, setUnisonId] = useState("217200160");
  const [unisonIdValid, setUnisonIdValid] = useState(false);

  const [name, setName] = useState("Saúl Ramos");
  const [nameError, setNameError] = useState("");

  const [dobValue, setDobValue] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [dobError, setDobError] = useState("");

  const [csiId, setCsiId] = useState(1);

  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

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
    console.log(event.target.value);
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

  const validateUnisonId = () => {
    setUnisonIdValid(true);
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
      setDobError("Please provide a valid date of birth");
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

  return (
    <div className="absolute top-0 flex h-full w-full translate-x-[100%] animate-slide-in flex-row items-center justify-start overflow-hidden bg-slate-100 sm:rounded-lg">
      <div className="relative top-0 h-full w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500"
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
            />
            <Button label="Check" onClick={validateUnisonId} className="mt-2" />
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
                disabled={!unisonIdValid}
              />
            </div>
          </Step>
          <Step>
            <h2 className="text-center text-xl">Personal data</h2>
            <p className="mb-3 text-center text-sm">
              The pre-populated fields contain data stored in the original{" "}
              <strong>CSI PRO Access</strong> database
            </p>
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
            />
            <Input
              id="dob"
              label="Date of birth"
              icon={<BsFillCalendarFill />}
              onChange={handleDateChange}
              value={dobValue}
              type="date"
              error={dobError}
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
              />
            </div>
          </Step>
          <Step>
            <h2 className="text-center text-xl">Access data</h2>
            <p className="text-center text-sm">
              Please, enter your <strong>CSI Passcode</strong> to complete the
              migration process
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
              />
            </div>
          </Step>
          <Step>
            <h1 className="text-center text-3xl font-bold">You're all set!</h1>
            <p className="mb-3 text-center">
              Thanks for helping out with the migration process
            </p>
          </Step>
        </div>
      </div>
    </div>
  );
};
