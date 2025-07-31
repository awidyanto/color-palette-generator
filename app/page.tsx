"use client";

import { useEffect, useState } from "react";

interface paletteType {
  colorcode: string;
  isLocked: boolean;
}

const generateRandomHexColor = (): string => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

const lockedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

const unlockedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

export default function PaletteGeneratorPage() {
  const [palette, setPalette] = useState<paletteType[]>([]);
  const [copiedColor, setCopiedColor] = useState("");

  useEffect(() => {
    // Panggil handleGeneratePalette saat komponen pertama kali dimuat
    handleGeneratePalette();
  }, []); // [] memastikan useEffect hanya berjalan sekali saat mount

  const handleGeneratePalette = () => {
    // Buat palet baru berdasarkan palet yang sudah ada
    const newPalette = palette.map((item) => {
      // Jika warna terkunci, pertahankan warna dan status kuncinya
      if (item.isLocked) {
        return item;
      } else {
        // Jika tidak terkunci, hasilkan warna baru dan pastikan isLocked adalah false
        return { colorcode: generateRandomHexColor(), isLocked: false };
      }
    });

    // Jika palet kosong (saat pertama kali dimuat), inisialisasi dengan 5 warna baru
    if (newPalette.length === 0) {
      setPalette([
        { colorcode: generateRandomHexColor(), isLocked: false },
        { colorcode: generateRandomHexColor(), isLocked: false },
        { colorcode: generateRandomHexColor(), isLocked: false },
        { colorcode: generateRandomHexColor(), isLocked: false },
        { colorcode: generateRandomHexColor(), isLocked: false },
      ]);
    } else {
      setPalette(newPalette);
    }
  };

  const handleCopy = (colorToCopy: string) => {
    navigator.clipboard.writeText(colorToCopy);
    setCopiedColor(`${colorToCopy}`);
  };

  // Fungsi untuk mengelola status lock per item dan juga bisa untuk multiple lock
  const handleToggleLock = (clickedColorCode: string) => {
    const updatedPalette = palette.map((item) => {
      if (item.colorcode === clickedColorCode) {
        // Jika colorcode cocok, toggle status isLocked-nya
        return { ...item, isLocked: !item.isLocked };
      } else {
        // Untuk item lain, pertahankan status isLocked-nya saat ini
        return item;
      }
    });
    setPalette(updatedPalette);
  };

  useEffect(() => {
    const tampilPesan = () => {
      if (copiedColor) {
        // Hanya jalankan timeout jika ada warna yang disalin
        setTimeout(() => {
          setCopiedColor("");
        }, 1000);
      }
    };
    tampilPesan();
  }, [copiedColor]); // Jalankan useEffect setiap kali copiedColor berubah

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
        {palette.map((item, index) => (
          <div key={index} className="text-center">
            {/* Tombol kunci memanggil handleToggleLock dengan colorcode item */}
            <button
              className="mt-2 font-mono text-white bg-slate-800 rounded-md px-2 py-1 text-sm mb-2"
              onClick={() => handleToggleLock(item.colorcode)}
            >
              {/* Tampilkan ikon berdasarkan item.isLocked */}
              <p>{item.isLocked ? lockedIcon : unlockedIcon}</p>
            </button>

            <div
              className="w-32 h-48 rounded-lg shadow-lg cursor-pointer" // Tambahkan cursor-pointer
              style={{ backgroundColor: item.colorcode }}
              onClick={() => handleCopy(item.colorcode)}
              title="Click To Copy"
            ></div>
            <p className="mt-2 font-mono text-white bg-slate-800 rounded-md px-2 py-1 text-sm">
              {item.colorcode}
            </p>
            {copiedColor === item.colorcode && (
              <p className="mt-2 font-mono text-white bg-slate-800 rounded-md px-2 py-1 text-sm italic">
                .. Disalin ..
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
