import "./styles/global.css";
import { IoMdCopy } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import Checkbox from "./components/Checkbox";
import SliderInput from "./components/Slider";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { CheckboxesList } from "./utils/Checkboxes";
import { generate } from "generate-password-browser";
import { strengths } from "./utils/strengths";
import { checkPassword } from "./utils/checkPasswordStrength";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [length, setLength] = useState<number>(5);
  const [password, setPassword] = useState<string | null>(null);
  const [lowercase, setLowercase] = useState<boolean>(false);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const checkboxesFunctions = {
    setUppercase: setUppercase,
    setLowercase: setLowercase,
    setNumbers: setNumbers,
    setSymbols: setSymbols,
  };

  function generatePassword() {
    toast.success("Password generated!", {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setPassword(
      generate({
        length,
        numbers,
        symbols,
        uppercase,
        lowercase,
      })
    );
  }

  useEffect(() => {
    password && setScore(checkPassword(password));
  }, [password]);

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Copied!", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!password) {
      toast.error("Please, generate a password!", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-16">
      <div className="max-w-[540px] w-full flex flex-col px-6">
        <h1 className="text-gray text-2xl mb-8 text-center">
          Password generator
        </h1>

        <div className="w-full bg-gray-dark flex items-center justify-between p-6 mb-6">
          <h2
            className={clsx("text-white text-xl", {
              ["opacity-20"]: !password,
            })}
          >
            {password ? password : "Generate one..."}
          </h2>

          <IoMdCopy
            size={28}
            className="text-neon-green cursor-pointer transition-all hover:text-white"
            onClick={handleCopyPassword}
          />
        </div>

        <div className="w-full bg-gray-dark flex flex-col p-6 mb-6">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-lg text-white">Character Length</h2>
            <p className="text-3xl text-neon-green mb-6">{length}</p>
          </div>
          <SliderInput handleLength={setLength} />
          <div className="flex flex-col mt-10 gap-4 mb-11">
            {CheckboxesList.map((checkbox, index) => (
              <Checkbox
                label={checkbox.label}
                handleCheckbox={
                  checkboxesFunctions[
                    checkbox.function as keyof typeof checkboxesFunctions
                  ]
                }
                id={index}
                key={checkbox.label + index}
              />
            ))}
          </div>

          <div className="w-full p-6 flex items-center justify-between bg-gray-very-dark mb-8 vsm:flex-col">
            <h4 className="text-gray text-xl">STRENGTH</h4>
            <div className="flex items-center gap-4 sm:flex-col">
              {!password ? (
                ""
              ) : (
                <>
                  <p className="text-2xl text-white sm:text-base">
                    {strengths[checkPassword(password)].title}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={clsx("w-2.5 h-7", {
                        ["border-2 border-white"]: !password,
                        ["bg-red"]: score && score <= 1,
                        ["bg-orange"]: score && score === 2,
                        ["bg-yellow"]: score && score === 3,
                        ["bg-neon-green"]: score && score === 4,
                      })}
                    />
                    <div
                      className={clsx("w-2.5 h-7", {
                        ["border-2 border-white"]: score && score <= 1,
                        ["bg-orange"]: score && score === 2,
                        ["bg-yellow"]: score && score === 3,
                        ["bg-neon-green"]: score && score === 4,
                      })}
                    />
                    <div
                      className={clsx("w-2.5 h-7", {
                        ["border-2 border-white"]: score && score < 3,
                        ["bg-yellow"]: score && score === 3,
                        ["bg-neon-green"]: score && score === 4,
                      })}
                    />
                    <div
                      className={clsx("w-2.5 h-7", {
                        ["border-2 border-white"]: score && score < 4,
                        ["bg-neon-green"]: score && score === 4,
                      })}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            className={clsx(
              "w-full p-6 flex items-center justify-center bg-neon-green gap-2 text-lg transition-all cursor-pointer",
              {
                ["opacity-50"]: [lowercase, uppercase, numbers, symbols].every(
                  (item) => !item
                ),
                ["hover:outline-1 hover:outline hover:text-white hover:outline-neon-green hover:bg-opacity-0"]:
                  [lowercase, uppercase, numbers, symbols].some((item) => item),
              }
            )}
            onClick={generatePassword}
            disabled={[lowercase, uppercase, numbers, symbols].every(
              (item) => !item
            )}
          >
            GENERATE{" "}
            <FiArrowRight
              size={24}
              className={clsx("", {
                ["hover:text-white"]: [
                  lowercase,
                  uppercase,
                  numbers,
                  symbols,
                ].some((item) => item),
              })}
            />
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
