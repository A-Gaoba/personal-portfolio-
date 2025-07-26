"use client";
import { InlineWidget } from "react-calendly";

export default function CalendlyWidget() {
  return (
    <div className="w-full flex justify-center my-8 rounded-lg">
      <InlineWidget
        url="https://calendly.com/abdalrahmangooba25/30min"
        styles={{
          height: '700px',
          width: '100%',
          backgroundColor: '#1a1a1a',
          color: '#ffffff'
        }}
        pageSettings={{
          backgroundColor: '#1a1a1a',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '#10b981',
          textColor: '#ffffff'
        }}
      />
    </div>
  );
} 