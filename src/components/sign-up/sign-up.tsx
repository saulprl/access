import { useState } from "react";

import { Button } from "../button";
import { Input } from "../input";
import { FaIdBadge } from "react-icons/fa";

export const SignUp = () => {
  const [step, setStep] = useState(0);

  const [unisonId, setUnisonId] = useState("");

  const handleGetStarted = () => {
    console.log("Get started");
    setStep((prev) => prev + 1);
  };

  const handleUnisonIdChange = (value: string) => {
    setUnisonId(value);
  };

  return (
    <div className="absolute top-0 flex h-full w-full translate-x-[100%] animate-slide-in flex-row items-center justify-start overflow-hidden bg-slate-100 sm:rounded-lg">
      <div className="relative top-0 h-full w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          <div className="flex h-full w-auto flex-[0_0_100%] animate-fade-in text-primary-700 opacity-0 transition-transform duration-500">
            <div className="mx-auto flex max-w-[70%] flex-col items-center justify-center">
              <h1 className="text-center text-3xl font-bold">Welcome</h1>
              <p className="mb-3 text-center">It seems you're new here</p>
              <Button label="Get started" onClick={handleGetStarted} />
            </div>
          </div>
          <div className="flex h-full w-full flex-[0_0_100%] text-primary-700 transition-transform duration-500">
            <div className="mx-auto flex max-w-[90%] flex-col items-center justify-center gap-2">
              <h2 className="text-xl">Enter your UniSon ID</h2>
              <Input
                label="UniSon ID"
                icon={<FaIdBadge />}
                onChange={handleUnisonIdChange}
                placeholder="e.g. 217200160"
                value={unisonId}
                type="number"
              />
              <Button label="Check" onClick={handleGetStarted} />
            </div>
          </div>
          <div className="flex h-full w-full flex-[0_0_100%] text-primary-700 transition-transform duration-500">
            <div className="mx-auto flex max-w-[70%] flex-col items-center justify-center">
              <h1 className="text-center text-3xl font-bold">Third page</h1>
              <p className="mb-3 text-center">It seems you're new here</p>
              <Button label="Get started" onClick={handleGetStarted} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
