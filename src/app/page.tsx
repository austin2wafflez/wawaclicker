"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function Home() {

  const [count, setCount] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        setTheme("dark");
    }
}, []);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const deincrementCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <main className={`flex flex-col items-center justify-center min-h-screen p-4 ${theme === "dark" ? "bg-blue-950 text-white" : "bg-white text-black"}`}>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="outline">
              {theme === "dark" ? "Light Wawa" : "Dark Wawa"}

          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
        You have wawa'd
      </h1>
      <div className="text-6xl md:text-7xl lg:text-8xl font-semibold mb-12">
        {count < 0 ? (
          <>{count} times...</>
        ) : (
          <>{count} times!</>
        )}
      </div>
      <div className="flex space-x-4">
        <Button variant={theme === "dark" ? "secondary" : "primary"} className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark" ? "bg-white text-black" : ""}`} onClick={incrementCount}>
          Wawa :3
        </Button>
        <Button variant={theme === "dark" ? "secondary" : "destructive"} className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark" ? "bg-blue-500 text-white" : ""}`} onClick={deincrementCount}>
          Unwawa 3:
        </Button>
      </div>
    </main>
  );
}
