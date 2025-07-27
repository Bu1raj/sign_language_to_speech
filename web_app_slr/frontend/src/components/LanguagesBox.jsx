import React, { useState } from "react";
import TextBox from "./TextBox";
import { useULC } from "../contexts/UniqueLabelsContext";
import WaveLoader from "./WaveLoader";

export default function LanguagesBox({ lang }) {
  const { loadingSentence, sentences, fetchTranslation } = useULC();
  const [visible, setVisible] = useState(false);
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  async function handleToggle() {
    if (!visible) {
      if (!sentences[lang]) {
        setLoadingTranslation(true);
        try {
          await fetchTranslation(lang, sentences["English"]);
        } finally {
          setLoadingTranslation(false);
        }
      }
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  function playAudio() {
    const audioUrl = sentences[lang + "_audio"];
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  }

  return (
    <div className="h-fit w-auto mb-8">
      <div className="flex justify-between mb-8 items-center">
        <h1 className="text-3xl text-slate-300 mr-2">{lang}</h1>
        <div className="flex items-center">
          <button
            className={`btn text-xl rounded-full flex items-center justify-center ${
              loadingTranslation ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleToggle}
            disabled={
              !sentences["English"] ||
              loadingSentence ||
              loadingTranslation
            }
          >
            {loadingTranslation ? (
              <WaveLoader />
            ) : visible ? (
              "Hide"
            ) : (
              "Get translation"
            )}
          </button>

          {visible && (
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

      {visible && (
        loadingTranslation ? (
          <WaveLoader />
        ) : (
          <TextBox text={sentences[lang]} />
        )
      )}
    </div>
  );
}
