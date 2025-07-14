import React from "react";

export default function TextBox({text}) {
  // const dummyData = ["Hello", "Thank You", "Okay"];
  return(
    <div className="border border-primary p-4 rounded-md bg-darkBackground">
        <p className="text-slate-300 text-xl">
          {text}
        </p>
    </div>
  );
}
