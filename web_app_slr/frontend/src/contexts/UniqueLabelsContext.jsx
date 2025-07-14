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

  async function getEnglishText (uniqueLabelsString) {
    setSentences({});
    setLoadingSentence(true);

    if(uniqueLabelsString === ""){
      setLoadingSentence(false);
      return;
    }

    try {
      const response = await fetch(
        `https://39ee-34-168-88-45.ngrok-free.app/generateall`,
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
      setSentences(data.translated);
    } catch (error) {
      console.error("Error fetching English text:", error);
    }
    setLoadingSentence(false);
  };

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
