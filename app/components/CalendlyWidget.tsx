"use client";
import { InlineWidget } from "react-calendly";

export default function CalendlyWidget() {
  return (
    <div className="w-full flex justify-center my-8">
      <InlineWidget url="https://calendly.com/abdalrahmangooba25/30min" styles={{ height: '700px', width: '100%' }} />
    </div>
  );
} 