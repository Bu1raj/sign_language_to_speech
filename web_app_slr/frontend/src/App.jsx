import React from "react";
import VideoFeed from "./components/VideoFeed";
import Instructions from "./components/Instructions";
import OutputWidget from "./components/OutputWidget";
import TranslateBox from "./components/TranslateBox";
import { useULC } from "./contexts/UniqueLabelsContext";
const App = () => {
  const { loadingSentence, fetchUniqueLabels } = useULC();
  return (
    <div className="max-w-[1550px] mx-auto mt-4">
      <h1 className="text-4xl text-center text-slate-300">
        Sign Language recognition and conversion to speech
      </h1>
      <div className="w-full flex gap-20 mt-16">
        <OutputWidget />
        <div className="w-full h-fit flex flex-col items-center gap-8">
          <Instructions />
          <VideoFeed />
          <button className="btn text-xl w-64 mt-8" onClick={fetchUniqueLabels}>
            {loadingSentence ? "Processing..." : "Convert to speech"}
          </button>
        </div>
        <TranslateBox />
      </div>
    </div>
  );
};

export default App;

// const [uniqueLabels, setUniqueLabels] = React.useState([]);

// async function fetchUniqueLabels() {
//   try {
//     const response = await fetch("http://127.0.0.1:5000/unique_labels");
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     setUniqueLabels(data.unique_labels);
//     console.log(data.unique_labels); // Update the state with unique labels
//   } catch (error) {
//     console.error("Error fetching unique labels:", error);
//   }

//   const uniqueLabelsString = uniqueLabels.join(", ");

//   getEnglishText(uniqueLabelsString);
// }

// async function getEnglishText(uniqueLabelsString) {
//   try {
//     const response = await fetch(
//       `https://0ade-34-125-222-123.ngrok-free.app/generate`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: uniqueLabelsString }),
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("English Text:", data.response);
//     return data.response;
//   } catch (error) {
//     console.error("Error fetching english text:", error);
//   }
// }
