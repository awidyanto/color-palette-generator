// app/page.tsx
"use client";

import { useState } from "react";

const generateRandomHexColor = (): string => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

export default function PaletteGeneratorPage() {
  const [palette, setPalette] = useState<string[]>([]);

  const handleGeneratePalette = () => {
    const newPalette = [
      generateRandomHexColor(),
      generateRandomHexColor(),
      generateRandomHexColor(),
      generateRandomHexColor(),
      generateRandomHexColor(),
    ];

    setPalette(newPalette);
  };

  return (
    <main className="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Generator Palet Warna</h1>
        <p className="text-slate-400 mt-2">
          Klik tombol untuk mendapatkan kombinasi warna baru.
        </p>
      </div>

      <button
        onClick={handleGeneratePalette}
        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-transform hover:scale-105 mb-8"
      >
        Generate Palette
      </button>

      <div className="flex flex-col md:flex-row gap-4">
        {palette.map((color, index) => (
          <div key={index} className="text-center">
            <div
              className="w-32 h-48 rounded-lg shadow-lg"
              style={{ backgroundColor: color }}
            ></div>
            <p className="mt-2 font-mono text-white bg-slate-800 rounded-md px-2 py-1 text-sm">
              {color}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
