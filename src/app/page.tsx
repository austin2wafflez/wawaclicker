"use client"
import { Button, ButtonProps } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image"; // Import Image
import { getCookie, setCookie } from 'cookies-next';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Home() {
  const [count, setCount] = useState<number>(() => {
    const storedCount = getCookie('wawas');
    return storedCount ? parseInt(storedCount as string, 10) : 0;
  });

  const [wps, setWps] = useState<string>("0");
  const [botBuyButtonText, setBotBuyButtonText] = useState("30W$ - wawabot3000 - buy nao!!!");
  const [botButtonColor, setBotButtonColor] = useState("bg-green-500 hover:bg-green-600");
  enum WawaState {
    Normal = 'normal',
    Wawa = 'wawa',
    Unwawa = 'unwawa',
    Recover = 'rewawa'
  }

  const [wawaState, setWawaState] = useState<WawaState>(WawaState.Normal);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setCookie('wawas', count.toString());
  }, [count]);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);

    if (wawaState === WawaState.Unwawa) {
      setWawaState(WawaState.Recover);
    }

    setWawaState(WawaState.Wawa);
    setTimeout(() => {
      setWawaState(WawaState.Normal);

    }, 150);
  };

  const deincrementCount = () => {
    setWawaState(WawaState.Unwawa);
    setCount(prevCount => prevCount - 1);
    if (wawaState === WawaState.Recover) {
      setWawaState(WawaState.Normal);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [botClicking, setBotClicking] = useState<number>(0);

  useEffect(() => {
    let intervalTimer: NodeJS.Timeout | null = null;
    let wpsTimer: NodeJS.Timeout | null = null;
    let countIncrement = 0;
    // calculation shit

    const interval = Math.max(2500 - (botClicking * 100), 500);
    // makes sure the minimum interval is .5 seconds so we dont get lightspeed wawa

    if (botClicking > 0) {
      intervalTimer = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
        countIncrement++;
      }, interval);
      // increases the clicking for how many bots there are

      wpsTimer = setInterval(() => {
        const actualWps = countIncrement / 10;
        setWps(actualWps.toFixed(2));
        countIncrement = 0;
      }, 10000);
      // calculates how many wawas are ACTUALLY being added over a 10 second period, then adds that
      // number to the wps counter, rounding it to the nearest hundredth. not the quickest
      // way to do it, but it works for now :p
    }

    return () => {
      if (intervalTimer) clearInterval(intervalTimer);
      if (wpsTimer) clearInterval(wpsTimer)
    };
    // reset

  }, [botClicking]);

  const handleBuyButtonClick = () => {
    if (count >= 30) {
      setCount(prevCount => prevCount - 30);
      setBotClicking(prevClicking => prevClicking + 1)
      //setWps(prevWps => (parseFloat(prevWps) + 0.25).toFixed(2))
      setBotBuyButtonText("Bought!");
      setTimeout(() => {
        setBotBuyButtonText("30W$ - wawabot3000 - buy nao!!!");
      }, 1000);
      setBotButtonColor("bg-green-500 hover:bg-green-600");
    } else {
      setBotBuyButtonText("Too Expensive 3:");
      setBotButtonColor("bg-red-500 hover:bg-red-600");
      setTimeout(() => {
        setBotBuyButtonText("30W$ - wawabot3000 - buy nao!!!");
        setBotButtonColor("bg-green-500 hover:bg-green-600");
      }, 1000);


    }
  }







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
      <div className="text-xs text-gray-500">{wps} wawas per second</div>


      <div className="flex space-x-4 relative">
        <Button variant="default" className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark" ? "bg-white text-black" : "bg-gray-400 text-white"}`} onClick={incrementCount}>
          Wawa :3
        </Button>
        <Button variant={theme === "dark" ? "secondary" : "destructive"} className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark" ? "bg-blue-400 text-white" : ""}`} onClick={deincrementCount}>
          Unwawa 3:
        </Button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        {wawaState === WawaState.Wawa ? (
          <Image
            src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/wa.png"
            alt=":D"
            width={500}
            height={500}
            className="animate-wiggle"
            priority
          />
        ) : wawaState === WawaState.Unwawa ? (
          <Image
            src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/sad.png"
            alt=":("
            width={500}
            height={500}
            className="animate-wiggle"
          />
        ) : (
          <Image
            src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/aw.png"
            alt=":3"
            width={500}
            height={500}
          />
        )}
      </div>

      <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
        <SheetTrigger asChild>
          <div className="absolute right-4 top-4 z-50 cursor-pointer">
            <GiHamburgerMenu size={30} color={theme === "light" ? 'white' : 'black'} />
          </div>
        </SheetTrigger>
        <SheetContent side="top" className="bg-opacity-95 backdrop-blur-md" >
          <div className="w-full flex justify-center items-center">
            <h4 className="font-bold text-xl text-white p-2">
              The Shoppe~
            </h4></div>

          <div>
            /br
            /br
          </div>

          <div className="flex flex-col gap-4 w-full h-70% justify-start items-right">
            <Button className={`font-bold ${botButtonColor} text-white mr-4`} onClick={handleBuyButtonClick}>
              {botBuyButtonText}
            </Button>
          </div>

        </SheetContent>

      </Sheet>

      <div className={`transition-opacity ${isMenuOpen ? 'opacity-50' : 'opacity-100'}`}>
      </div>
    </main>
  );
}
