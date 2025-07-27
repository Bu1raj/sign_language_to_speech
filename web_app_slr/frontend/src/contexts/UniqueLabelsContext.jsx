import React, { createContext, useContext, useState } from "react";

const UniqueLabelsContext = createContext();

export function useULC() {
  return useContext(UniqueLabelsContext);
}

export default function UniqueLabelsProvider({ children }) {
  const [uniqueLabels, setUniqueLabels] = useState([]);
  const [loadingUniqueLabels, setLoadingUniqueLabels] = useState(false);
  const [loadingSentence, setLoadingSentence] = useState(false);
  const [sentences, setSentences] = useState({});

  async function fetchUniqueLabels() {
    setUniqueLabels([]);
    setLoadingUniqueLabels(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/unique_labels");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setUniqueLabels(data.unique_labels);
      const uniqueLabelsString = data.unique_labels.join(", ");
      getEnglishText(uniqueLabelsString);

    } catch (error) {
      console.error("Error fetching unique labels:", error);
    }
    setLoadingUniqueLabels(false);
  }

  // Test function to simulate fetching unique labels
//   async function fetchUniqueLabels() {
//   console.log("fetchUniqueLabels called");
//   setUniqueLabels(["hello", "help","food", "thankyou"]);
//   setLoadingUniqueLabels(true);
//   const uniqueLabelsString = ["hello", "help", "food", "thankyou"].join(", ");
//   console.log("Unique Labels String:", uniqueLabelsString);
//   await getEnglishText(uniqueLabelsString);
//   setLoadingUniqueLabels(false);
// }

let ngrokurl="https://ef6fadc168f0.ngrok-free.app"
async function getEnglishText(uniqueLabelsString) {
setSentences({});
setLoadingSentence(true);
try {
  // 1) Get sentence
  const res = await fetch(ngrokurl+"/generate_sentence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ words: uniqueLabelsString })
  });

  if (!res.ok) throw new Error("Sentence API error");
  const data = await res.json();
  const englishSentence = data.sentence;

  // 2) Get audio for English sentence
  const audioRes = await fetch(ngrokurl+"/generate_audio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: englishSentence })
  });
  console.log(audioRes)
  if (!audioRes.ok) throw new Error("Audio API error, Mostly Gemini key is exhausted change the key");
  const audioBlob = await audioRes.blob();
  const englishAudioUrl = URL.createObjectURL(audioBlob);

  // 3) Save to state
  setSentences({
    English: englishSentence,
    English_audio: englishAudioUrl
  });
} catch (err) {
  console.error("Error generating English text/audio:", err);
}

setLoadingSentence(false);
}

async function fetchTranslation(lang, englishSentence) {
try {
  // 1) Get translation
  const res = await fetch(ngrokurl+"/translate_sentence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sentence: englishSentence, language: lang })
  });

  if (!res.ok) throw new Error("Translation API error");
  const data = await res.json();
  const translatedSentence = data.translated_sentence;

  // 2) Get audio for translated text
  const audioRes = await fetch(ngrokurl+"/generate_audio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: translatedSentence })
  });

  const audioBlob = await audioRes.blob();
  const audioUrl = URL.createObjectURL(audioBlob);

  // 3) Update state (merge)
  setSentences(prev => ({
    ...prev,
    [lang]: translatedSentence,
    [lang + "_audio"]: audioUrl
  }));
} catch (err) {
  console.error(`Error fetching translation for ${lang}:`, err);
}
}

const value = {
  loadingUniqueLabels,
  loadingSentence,
  uniqueLabels,
  fetchUniqueLabels,
  sentences,
  fetchTranslation
};

return (
  <UniqueLabelsContext.Provider value={value}>
    {children}
  </UniqueLabelsContext.Provider>
);
}
