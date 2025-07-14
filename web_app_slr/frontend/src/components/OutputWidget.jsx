import React from "react";
import DetectedWords from "./DetectedWords";
import InterpretedSentence from "./InterpretedSentence";

export default function OutputWidget() {
  return (
    <div className="w-full">
      <DetectedWords />
      <InterpretedSentence />
    </div>
  );
}
