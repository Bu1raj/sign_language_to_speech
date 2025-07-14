import React, { useState } from "react";
import TextBox from "./TextBox";
import { useULC } from "../contexts/UniqueLabelsContext";

export default function LanguagesBox({ lang }) {
  const { loadingSentence ,sentences } = useULC();
  const [visibility, setVisibility] = useState(false);

  function toggleVisibility() {
    setVisibility((prev) => !prev);
  }
  
  return (
    <div className="h-fit w-auto mb-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl text-slate-300">{lang}</h1>
        <button className="btn text-xl" onClick={toggleVisibility} disabled={loadingSentence || Object.keys(sentences).length === 0 }>
          {visibility ? "Hide" : "Get translation"}
        </button>
      </div>
      {visibility && <TextBox text={sentences[lang]} />}
    </div>
  );
}
