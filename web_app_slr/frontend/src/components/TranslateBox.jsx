import React from "react";
import LanguagesBox from "./LanguagesBox";
import { IoIosInformationCircle } from "react-icons/io";

export default function TranslateBox() {
  const languages = ["Kannada", "Telugu", "Tamil", "Hindi"];

  return (
    <div className="w-full">
      <h1 className="text-slate-300 text-3xl mb-6">Translated responses</h1>

      <div className="w-auto bg-darkBackground text-lg border border-primary p-4 rounded-lg flex gap-4 text-slate-300 items- mb-8">
        <IoIosInformationCircle className="text-4xl" />
        <div>
          <p>
            The buttons below will activate once the signs are interpreted
          </p>
        </div>
      </div>
      
      {languages.map((lang, index) => (
        <LanguagesBox key={index} lang={lang} />
      ))}
    </div>
  );
}
