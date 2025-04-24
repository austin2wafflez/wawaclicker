"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
        Tap Counter
      </h1>
      <div className="text-6xl md:text-7xl lg:text-8xl font-semibold mb-12">
        {count}
      </div>
      <div className="flex space-x-4">
        <Button variant="primary" className="text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95" onClick={incrementCount}>
          Increment
        </Button>
        <Button variant="destructive" className="text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95" onClick={resetCount}>
          Reset
        </Button>
      </div>
    </main>
  );
}
