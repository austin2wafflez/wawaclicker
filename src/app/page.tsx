// Suggested code may be subject to a license. Learn more: ~LicenseLog:3278053743.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3639530951.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:502769164.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3208014068.
"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef } from "react";

  const pageName = "clickclick";


export default function Home() {

  const [isWawaing, setIsWawaing] = useState(false);
  const [isUnwawa, setIsUnwawa] = useState(false);

  const [count, setCount] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        setTheme("dark");
    }
}, []);

  const incrementCount = () => {
    setIsWawaing(true);
    setIsUnwawa(false);
    setCount((prevCount) => prevCount + 1);
    setTimeout(() => {
      setIsWawaing(false);
    }, 150);
  };

  const deincrementCount = () => {
    setIsUnwawa(true);
    setIsWawaing(true);
    setCount((prevCount) => prevCount - 1);
    if (!isUnwawa) {
      if (isWawaing) {
      setIsWawaing(false);
      setIsUnwawa(false);
    }
  }
  
  };


  return (
    <main className={`flex flex-col items-start justify-center min-h-screen p-4 ${theme === "dark" ? "bg-blue-950 text-white" : "bg-white text-black"}`}>

      <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ${theme === "dark" ? "text-white" : ""}`}>
        You have wawa'd
      </h1>
      <div className="text-6xl md:text-7xl lg:text-8xl font-semibold mb-12">
        {count < 0 ? (
          <span className="text-red-500">{count} times...</span>
        ) : (<>
        <span className={theme === "dark" ? "text-white" : ""}>{count}</span> times!</>
        )}
      </div>
<div className="flex space-x-4 relative">
        <Button variant="default" className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark" ? "bg-white text-black" : "bg-gray-400 text-white"}`} onClick={incrementCount}>
          Wawa :3
        </Button>
        <Button variant={theme === "dark" ? "secondary" : "destructive"} className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark" ? "bg-blue-400 text-white" : ""}`} onClick={deincrementCount}>
          Unwawa 3:
        </Button>
      </div>      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        {isWawaing ? (isUnwawa ? (<Image
            src="https://github.com/austin2wafflez/wawaclicker/blob/master/src/app/sad.png?raw=true"
            alt=":("
            width={500}
            height={500}
            className="animate-wiggle"
          />) : (
          <Image
            src="https://github.com/austin2wafflez/wawaclicker/blob/master/src/app/wa.png?raw=true"
            alt=":D"
            width={500}
            height={500}
            className="animate-wiggle"
          />)) : (<Image
            src="https://github.com/austin2wafflez/wawaclicker/blob/master/src/app/aw.png?raw=true"
            alt=":3"
            width={500}
            height={500}/>
        )}
      </div>
    </main>
  );
}
