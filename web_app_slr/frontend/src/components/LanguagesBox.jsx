import React, { useState } from "react";
import TextBox from "./TextBox";
import { useULC } from "../contexts/UniqueLabelsContext";

export default function LanguagesBox({ lang }) {
  const { loadingSentence ,sentences } = useULC();
  const [visibility, setVisibility] = useState(false);

  function toggleVisibility() {
    setVisibility((prev) => !prev);
  }
  
  function playAudio() {
    const audioUrl = sentences[lang + "_audio"];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }

  return (
    <div className="h-fit w-auto mb-8">
      <div className="flex justify-between mb-8 items-center">
        <div className="flex items-center">
          <h1 className="text-3xl text-slate-300 mr-2">{lang}</h1>
        </div>
        <div className="flex items-center">
          <button
            className="btn text-xl rounded-full"
            onClick={toggleVisibility}
            disabled={loadingSentence || Object.keys(sentences).length === 0 }
          >
            {visibility ? "Hide" : "Get translation"}
          </button>
          {visibility && (
            <button
              className="btn text-xl ml-2 rounded-full"
              onClick={playAudio}
              disabled={!sentences[lang + "_audio"]}
              title="Play audio"
            >
              🔊
            </button>
          )}
        </div>
      </div>
      {visibility && <TextBox text={sentences[lang]} />}
    </div>
  );
}