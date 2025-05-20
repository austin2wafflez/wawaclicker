

"use client";

//importing
import { toast } from "sonner";
import { Button, ButtonProps } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaShoppingCart } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { isMobile } from "react-device-detect";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

<Head>
  <title>clickclick - loading wawas...</title>
</Head>



const Divider: React.FC = () => {
  return <div style={{ height: '13px', visibility: 'hidden' }} />;
};

//counting stuff

export default function Home() {
  const [count, setCount] = useState<number>(() => {
    const storedCount = getCookie('wawas');
    return storedCount ? parseInt(storedCount as string, 10) : 0;
  });

  const [wps, setWps] = useState<string>("0");
  const [flashRed, setFlashRed] = useState(false);

  useEffect(() => {
    let alertShown = false;
    const storedCount = getCookie('wawas');
    if (storedCount) {
      if (!alertShown) {
        if (isMobile) {
          toast.success("data loaded :3");
        } else {
          window.alert("data loaded :3");
        }
        alertShown = true
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      document.title = `clickclick - ${count} wawas`;
    }, 10); // Update title every hundredth a second

    // cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [count]);


  //shop stuff


  const [botBuyButtonText, setBotBuyButtonText] = useState(
    "30W$ - wawabot3000 - buy nao!!!"
  );
  const [botButtonColor, setBotButtonColor] = useState(
    "bg-green-500 hover:bg-green-600"
  );
  const [forumBuyButtonText, setForumBuyButtonText] = useState(
    "150W$ - ask for wawas on forum - buy nao!!!"
  );
  const [forumButtonColor, setForumButtonColor] = useState(
    "bg-green-500 hover:bg-green-600"
  );

//theming

  const { theme, setTheme } = useTheme(); // made it not redundant

  useEffect(() => {
    const storedTheme = getCookie('theme');
    if (storedTheme) {
      setTheme(storedTheme as string);
    } else {
      let systemTheme = 'light'; // set light mode as default
      if (typeof window !== 'undefined' && window.matchMedia) {
        systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      setTheme(systemTheme);
      setCookie('theme', systemTheme);
    }
  }, [setTheme]);

  //wawa stuff

  enum WawaState {
    Normal = 'normal',
    Wawa = 'wawa',
    Unwawa = 'unwawa',
    Recover = 'rewawa',
    Spent = 'money'
  }
  const [wawaState, setWawaState] = useState<WawaState>(WawaState.Normal)

  //save data

  useEffect(() => {
    setCookie('wawas', count.toString());
  }, [count]);

  //counting input

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);

    if (wawaState === WawaState.Unwawa) {
      setWawaState(WawaState.Recover)
    }

    setWawaState(WawaState.Wawa)
    setTimeout(() => {
      setWawaState(WawaState.Normal)
    }, 150)
  }

  const [last5SecondsCounts, setLast5SecondsCounts] = useState<number[]>([])

  const artiCount = () => {
    setCount((prevCount) => prevCount + 1);
    setLast5SecondsCounts((prevCounts) => [...prevCounts, Date.now()]);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const updateCounts = () => {
      const now = Date.now();
      setLast5SecondsCounts(prevCounts => prevCounts.filter(time => now - time <= 10000));
    };

    updateCounts(); // Initial cleanup
    interval = setInterval(updateCounts, 1000);

    return () => interval && clearInterval(interval)
  }, [])

  const deincrementCount = () => {
    setWawaState(WawaState.Unwawa)
    setCount((prevCount) => {
      const newCount = prevCount - 1;
      if (newCount < prevCount) { // Check if count actually decreased
      }
      return newCount;
    })

    if (wawaState === WawaState.Recover) {
      setWawaState(WawaState.Normal)
    }
  };

  const ouch = () => {
    setWawaState(WawaState.Unwawa)
    setFlashRed(true);
    setTimeout(() => setFlashRed(false), 500);
  };

  const ouchBuy = () => {
    setWawaState(WawaState.Spent)
    setFlashRed(true);
    setTimeout(() => setFlashRed(false), 500);
  };

  // menu stuff

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [changelogOpen, setChangelogOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  };



  const [botClicking, setBotClicking] = useState<number>(() => {
    const storedBotCount = getCookie('wawabots');
    return storedBotCount ? parseInt(storedBotCount as string, 10) : 0;
  });
  const [forumClicking, setForumClicking] = useState<number>(() => {
    const storedForumCount = getCookie('wawaforums');
    return storedForumCount ? parseInt(storedForumCount as string, 10) : 0;
  });


  useEffect(() => {
    let intervalTimer: NodeJS.Timeout | null = null;

    const botInterval = Math.max(2500 - (botClicking * 100), 500);
    //makes sure the minimum interval is .5 seconds so we dont get lightspeed wawa

    if (botClicking > 0) {
      intervalTimer = setInterval(() => artiCount(), botInterval)
    }

    return () => {
      if (intervalTimer) clearInterval(intervalTimer);
    }

    // reset

  }, [botClicking]);

  useEffect(() => {
    let intervalTimer: NodeJS.Timeout | null = null;

    // don't click twice at the same time, spread clicking over alotted time in ms
    const forumInterval = Math.max(500 - (forumClicking * 45), 50);

    if (forumClicking > 0) {
      intervalTimer = setInterval(() => {
        artiCount();
        setTimeout(() => artiCount(), forumInterval);
      }, forumInterval * 2);
    }
  }, [forumClicking]);

  // shopsave

  useEffect(() => {
    setCookie('wawaforums', forumClicking.toString());
  }, [forumClicking]);

  useEffect(() => {
    setCookie('wawabots', botClicking.toString());
  }, [botClicking]);

  //calc wawas

  useEffect(() => {
    const countInLast5Seconds = last5SecondsCounts.length;
    const wpsValue = countInLast5Seconds / 10;
    const currentWps = wpsValue.toFixed(2);
    setWps((prevWps) => {
      const prevWpsNum = parseFloat(prevWps);
      const currentWpsNum = parseFloat(currentWps);
      // keep the highest value on display instead of constantly updating
      return currentWpsNum > prevWpsNum ? currentWps : prevWps;
    });

  }, [last5SecondsCounts, wps]);

  //Buttons

  const handleBotBuyButtonClick = () => {
    if (count >= 30) {
      setCount((prevCount) => prevCount - 30);
      setBotClicking((prevClicking) => prevClicking + 1)
      setBotBuyButtonText("Bought!");
      ouchBuy();
      setTimeout(() => {
        setBotBuyButtonText("30W$ - wawabot3000 - buy nao!!!");
      }, 1000)
      setBotButtonColor("bg-green-500 hover:bg-green-600");
    } else {
      setBotBuyButtonText("Too Expensive 3:");
      setBotButtonColor("bg-red-500 hover:bg-red-600");
      setTimeout(() => {
        setBotBuyButtonText("30W$ - wawabot3000 - buy nao!!!");
        setBotButtonColor("bg-green-500 hover:bg-green-600");
      }, 1000)
    }
  }

  const handleForumBuyButtonClick = () => {
    if (count >= 150) {
      setCount((prevCount) => prevCount - 150);
      setForumClicking((prevClicking) => prevClicking + 1)
      setForumBuyButtonText("Bought!");
      ouchBuy();
      setTimeout(() => {
        setForumBuyButtonText("150W$ - ask for wawas on forum - buy nao!!!");
      }, 1000);
      setForumButtonColor("bg-green-500 hover:bg-green-600");
    } else {
      setForumBuyButtonText("Too Expensive 3:");
      setForumButtonColor("bg-red-500 hover:bg-red-600");
      setTimeout(() => {
        setForumBuyButtonText("150W$ - ask for wawas on forum - buy nao!!!");
        setForumButtonColor("bg-green-500 hover:bg-green-600");
      }, 1000)
    }
  }




  //wawa count, wawacat, wawashop


  return (
    <main
      className={`flex flex-col items-start justify-center min-h-screen p-4 ${theme === "dark"
        ? "bg-blue-950 text-white"
        : "bg-white text-black"
        }`}
    >
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ${theme === "dark" ? "text-white" : ""
          }`}
      >
        You have wawa'd
      </h1>
      <motion.div
        className={`text-6xl md:text-7xl lg:text-8xl font-semibold mb-12 transition-all duration-500 ${flashRed ? 'text-red-500 animate-bounce' : ''
          }`}
        animate={flashRed ? { y: [0, -10, 0] } : {}}
        transition={flashRed ? { duration: 0.5, repeat: 0 } : {}}
      >
        {count < 0 ? (
          <span className="text-red-500">{count} times...</span>
        ) : (
          <>
            <span className={theme === "dark" ? "text-white" : ""}>
              {count}
            </span> times!
          </>


        )}
      </motion.div>
      <div className="w-full flex justify-left">
        <div className="text-xs text-gray-500">{wps} wawas per second</div>
      </div>



      <div className="flex space-x-4 relative">
        <Button
          variant="default"
          className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark"
            ? "bg-white text-black"
            : "bg-gray-400 text-white"
            }`}
          onClick={incrementCount}
        >
          Wawa :3
        </Button>
        <Button
          variant={theme === "dark" ? "secondary" : "destructive"}
          className={`text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ${theme === "dark" ? "bg-blue-400 text-white" : ""}`}
          onClick={deincrementCount}>
          Unwawa 3:
        </Button>
      </div>



      <div className={
        isMobile || count < 0 || (typeof window !== 'undefined' && window.innerWidth < 906)
          ? "absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500"
          : "absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500"
      }>
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
        ) : wawaState === WawaState.Spent ? (
          <Image
            src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/spent.png"
            alt=":3 $"
            width={500}
            height={500}
            className="animate-wiggle"
            priority
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
            <FaShoppingCart
              size={30}
              color={theme === "light" ? "white" : "black"}
            />
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="bg-opacity-95 backdrop-blur-md">
          <div className="w-full flex justify-center items-center">
            <h4 className="font-bold text-xl text-white p-2">The Shoppe~</h4>
          </div>

          <div>
            /br
            /br
          </div>

          <div
            className="flex flex-col gap-4 w-full h-70% justify-start items-right"
          >
            <Button
              className={`font-bold ${botButtonColor} text-white mr-4`}
              onClick={handleBotBuyButtonClick}
            >
              {botBuyButtonText}
            </Button>
          </div>
          <Divider />
          <div
            className="flex flex-col gap-4 w-full h-70% justify-start items-right"
          >
            <Button
              className={`font-bold ${forumButtonColor} text-white mr-4`}
              onClick={handleForumBuyButtonClick}
            >
              {forumBuyButtonText}
            </Button>
          </div>
        </SheetContent>

        <DropdownMenu open={changelogOpen} onOpenChange={setChangelogOpen}>
          <DropdownMenuTrigger asChild>
            <SheetTrigger asChild>
              <div className="absolute right-12 top-4 z-50 cursor-pointer flex items-center space-x-2">
                <FiFileText
                  size={30}
                  color={theme === "light" ? "white" : "black"}
                />
              </div>
            </SheetTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0 w-250 h-400">
            <iframe src="https://austin2wafflez.github.io/wawaclicker/changelog.html" className="w-500 h-150 border-0"></iframe>
          </DropdownMenuContent>
        </DropdownMenu>
      </Sheet>

      <Sheet open={isSettingsOpen} onOpenChange={toggleSettings}>
        <SheetTrigger asChild>
          <div className="absolute right-22 top-4 z-50 cursor-pointer">
            <FaCog
              size={30}
              color={theme === "light" ? "white" : "black"}
            />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="bg-opacity-95 backdrop-blur-md">
          <div className="w-full flex justify-center items-center">
            <h4 className="font-bold text-xl text-white p-2">Settoing</h4>
          </div>

                  <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Dark/Light Mode - Currently {theme}</Button>

        </SheetContent>
      </Sheet>

    </main>
  );
}

