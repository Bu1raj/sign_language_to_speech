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
  async function getEnglishText (uniqueLabelsString) {
    setSentences({});
    setLoadingSentence(true);

    if(uniqueLabelsString === ""){
      setLoadingSentence(false);
      return;
    }

    try {
      // Get translations for all languages
      const response = await fetch(
        `https://98132240f568.ngrok-free.app/generateall`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: uniqueLabelsString }),
        }
      );
      if (!response.ok) { 
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const translations = data.translated;

      // Prepare to store both text and audio URLs
      const sentencesWithAudio = { ...translations };

      // For each language, request audio and store blob URL
      for (const [lang, text] of Object.entries(translations)) {
        try {
          console.log(`Fetching audio for ${lang}:`, text);
          const audioRes = await fetch(
            "https://a1ce1966ead3.ngrok-free.app/generate_wav",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sample_text: text,
                language: lang.toLowerCase(),
                gender: "female",
                alpha: 1,
                output_file: "output.wav"
              })
            }
          );
          if (!audioRes.ok) {
            throw new Error(`Audio HTTP error! Status: ${audioRes.status}`);
          }
          // Get audio as blob
          const audioBlob = await audioRes.blob();
          // Create blob URL for playback
          const audioUrl = URL.createObjectURL(audioBlob);
          sentencesWithAudio[lang + "_audio"] = audioUrl;
          console.log(`Audio URL for ${lang}:`, audioUrl);
        } catch (err) {
          console.error(`Error fetching audio for ${lang}:`, err);
        }
      }
      setSentences(sentencesWithAudio);
    } catch (error) {
      console.error("Error fetching English text:", error);
    }
    setLoadingSentence(false);
  }

  const value = {
    loadingUniqueLabels,
    loadingSentence,
    uniqueLabels,
    fetchUniqueLabels,
    sentences,
  };

  return (
    <UniqueLabelsContext.Provider value={value}>
      {children}
    </UniqueLabelsContext.Provider>
  );
}
