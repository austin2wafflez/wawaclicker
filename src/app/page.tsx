
"use client";

//importing
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaShoppingCart } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { isMobile as isMobileDevice } from "react-device-detect"; 
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

const Divider: React.FC = () => {
    return <div style={{ height: '13px', visibility: 'hidden' }} />;
};

export default function Home() {
    const [isClient, setIsClient] = useState(false);
    const [count, setCount] = useState<number>(0); // initialized to 0, will be updated from cookie on client
    const [wps, setWps] = useState<string>("0");
    const [flashRed, setFlashRed] = useState(false);
    const [testing, setTesting] = useState(false); // default to false, updated on client

    const { theme, setTheme } = useTheme();

    // shop buttons
    const [botBuyButtonText, setBotBuyButtonText] = useState("30W$ - wawabot3000 - buy nao!!!");
    const [botButtonColor, setBotButtonColor] = useState("bg-green-500 hover:bg-green-600");
    const [forumBuyButtonText, setForumBuyButtonText] = useState("150W$ - ask for wawas on forum - buy nao!!!");
    const [forumButtonColor, setForumButtonColor] = useState("bg-green-500 hover:bg-green-600");

    // wawa 
    enum WawaState { Normal = 'normal', Wawa = 'wawa', Unwawa = 'unwawa', Recover = 'rewawa', Spent = 'money', Pet = 'yayay' }
    const [wawaState, setWawaState] = useState<WawaState>(WawaState.Normal);
    const squeak = () => { 
        const audio = new Audio('https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/sfx/squee.wav');
        audio.volume = 0.25;
        audio.play();
    }

    // menus
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [changelogOpen, setChangelogOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // items
    const [botClicking, setBotClicking] = useState<number>(0);
    const [forumClicking, setForumClicking] = useState<number>(0);

    // calc helper
    const [last5SecondsCounts, setLast5SecondsCounts] = useState<number[]>([]);

    // image positioning state
    const [imagePositionClass, setImagePositionClass] = useState("absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500");

    // this effect runs once on mount on the client side
    useEffect(() => {
        setIsClient(true);

        const storedCount = getCookie('wawas');
        setCount(storedCount ? parseInt(storedCount as string, 10) : 0);

        if (theme !== 'dark') {
        const storedTheme = getCookie('theme');
        if (storedTheme) {
            setTheme(storedTheme as string);
        } else {
                setTheme('light');
            }
        }

        setTesting(window.location.hostname !== 'wawa-clicker.web.app');
        
        const storedBotCount = getCookie('wawabots');
        setBotClicking(storedBotCount ? parseInt(storedBotCount as string, 10) : 0);
        const storedForumCount = getCookie('wawaforums');
        setForumClicking(storedForumCount ? parseInt(storedForumCount as string, 10) : 0);

        const dataLoadedAlertShownKey = 'dataLoadedAlertShown';
        const alertShown = getCookie(dataLoadedAlertShownKey);
        const storedCountCookie = getCookie('wawas');
        if (storedCountCookie && !alertShown) {
            if (isMobileDevice) {
                toast.success("data loaded :3");
            } else {
                window.alert("data loaded :3");
            }
            setCookie(dataLoadedAlertShownKey, 'true', { maxAge: 60 * 60 * 24 }); // Show once per day
        }
    }, [setTheme]); // setTheme is stable, so this runs effectively once on client mount

    //  title
    useEffect(() => {
        if (isClient) {
            const interval = setInterval(() => {
                document.title = `clickclick - ${count} wawas`;
            }, 10);
            return () => clearInterval(interval);
        }
    }, [count, isClient]);

    // save counting
    useEffect(() => {
        if (isClient) {
            setCookie('wawas', count.toString());
        }
    }, [count, isClient]);

    // wps calculations
    useEffect(() => {
        if (isClient) {
            const interval = setInterval(() => {
                const now = Date.now();
                setLast5SecondsCounts(prevCounts => prevCounts.filter(time => now - time <= 10000));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient) {
            const countInLast5Seconds = last5SecondsCounts.length;
            const wpsValue = countInLast5Seconds / 10; // Calculate per second over 10s window
            const currentWpsString = wpsValue.toFixed(2);
            setWps(prevWps => {
                const prevWpsNum = parseFloat(prevWps);
                const currentWpsNum = parseFloat(currentWpsString);
                return currentWpsNum > prevWpsNum ? currentWpsString : prevWps;
            });
        }
    }, [last5SecondsCounts, isClient]); 

    // bot clicky
    useEffect(() => {
        let intervalTimer: NodeJS.Timeout | null = null;
        if (isClient && botClicking > 0) {
            const botInterval = Math.max(2500 - (botClicking * 100), 500);
            intervalTimer = setInterval(artiCount, botInterval);
        }
        return () => { if (intervalTimer) clearInterval(intervalTimer); };
    }, [botClicking, isClient]);

    // forum clicky
    useEffect(() => {
        let intervalTimer: NodeJS.Timeout | null = null;
        if (isClient && forumClicking > 0) {
            const forumInterval = Math.max(500 - (forumClicking * 45), 50);
            intervalTimer = setInterval(() => {
                artiCount();
                setTimeout(artiCount, forumInterval);
            }, forumInterval * 2);
        }
        return () => { if (intervalTimer) clearInterval(intervalTimer); };
    }, [forumClicking, isClient]);

    // Shop item save effects
    useEffect(() => { if (isClient) setCookie('wawaforums', forumClicking.toString()); }, [forumClicking, isClient]);
    useEffect(() => { if (isClient) setCookie('wawabots', botClicking.toString()); }, [botClicking, isClient]);

    // Image positioning effect
     useEffect(() => {
        if (isClient) {
            const updateImagePosition = () => {
                if (isMobileDevice || count < 0 || window.innerWidth < 906) {
                    setImagePositionClass("absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500");
                } else {
                    setImagePositionClass("absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500");
                }
            };
            updateImagePosition();
            window.addEventListener('resize', updateImagePosition);
            return () => window.removeEventListener('resize', updateImagePosition);
        }
    }, [isClient, isMobileDevice, count]);


    const incrementCountByPet = () => {
        setCount((prevCount) => prevCount + 1);
        setWawaState(WawaState.Pet);
        squeak();
    };

    const incrementCount = () => {
        setCount((prevCount) => prevCount + 1);
        setWawaState(WawaState.Wawa);
        squeak();
        setTimeout(() => {
            setWawaState(WawaState.Normal);
        }, 150);
    };

    const artiCount = () => {
        setCount((prevCount) => prevCount + 1);
        setLast5SecondsCounts((prevCounts) => [...prevCounts, Date.now()]);
    };

    const deincrementCount = () => {
        setWawaState(WawaState.Unwawa);
        setCount((prevCount) => prevCount - 1);
    };

    const ouchBuy = () => {
        setWawaState(WawaState.Spent);
        setFlashRed(true);
        setTimeout(() => {
            setFlashRed(false);
        }, 1000);
    };
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    const handleBotBuyButtonClick = () => {
        if (count >= 30) {
            setCount((prevCount) => prevCount - 30);
            setBotClicking((prevClicking) => prevClicking + 1);
            setBotBuyButtonText("Bought!");
            ouchBuy();
            setTimeout(() => setBotBuyButtonText("30W$ - wawabot3000 - buy nao!!!"), 1000);
            setBotButtonColor("bg-green-500 hover:bg-green-600");
        } else {
            setBotBuyButtonText("Too Expensive 3:");
            setBotButtonColor("bg-red-500 hover:bg-red-600");
            setTimeout(() => {
                setBotBuyButtonText("30W$ - wawabot3000 - buy nao!!!");
                setBotButtonColor("bg-green-500 hover:bg-green-600");
            }, 1000);
        }
    };

    const handleForumBuyButtonClick = () => {
        if (count >= 150) {
            setCount((prevCount) => prevCount - 150);
            setForumClicking((prevClicking) => prevClicking + 1);
            setForumBuyButtonText("Bought!");
            ouchBuy();
            setTimeout(() => setForumBuyButtonText("150W$ - ask for wawas on forum - buy nao!!!"), 1000);
            setForumButtonColor("bg-green-500 hover:bg-green-600");
        } else {
            setForumBuyButtonText("Too Expensive 3:");
            setForumButtonColor("bg-red-500 hover:bg-red-600");
            setTimeout(() => {
                setForumBuyButtonText("150W$ - ask for wawas on forum - buy nao!!!");
                setForumButtonColor("bg-green-500 hover:bg-green-600");
            }, 1000);
        }
    };

    if (!isClient) {
        return null; // Or a loading spinner
    }

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

            <div className={imagePositionClass} onClick={incrementCountByPet}>
                {wawaState === WawaState.Wawa ? (
 <Image
 src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/wa.png"
 alt=":D"
 width={500}
 height={500}
 className={`animate-wiggle ${theme === "dark" ? "invert" : ""}`}
 priority
 unoptimized
 />
                ) : wawaState === WawaState.Unwawa ? (
 <Image
 src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/sad.png"
 alt=":("
 width={500}
 height={500}
 className={`animate-wiggle ${theme === "dark" ? "invert" : ""}`}
 unoptimized
 />
                ) : wawaState === WawaState.Pet ? (
 <Image
 src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/yay.png"
 alt="^w^"
 width={500}
 height={500}
 className={`animate-bounce ${theme === "dark" ? "invert" : ""}`}
 priority
 unoptimized
 />
                ) : wawaState === WawaState.Spent ? (
 <Image
 src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/spent.png"
 alt=":3 $"
 width={500}
 height={500}
 className={`animate-wiggle ${theme === "dark" ? "invert" : ""}`}
 priority
 unoptimized
 />
                ) : (
 <Image src="https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/aw.png" alt=":3" width={500} height={500} className={theme === "dark" ? "invert" : ""} unoptimized />
                )}
            </div>

            <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
                <SheetTrigger asChild>
                    <div className="absolute right-4 top-4 z-50 cursor-pointer">
                        <FaShoppingCart size={30} color={theme === "dark" ? "white" : "black"} />
                    </div>
                </SheetTrigger>
                <SheetContent side="right" className="bg-opacity-95 backdrop-blur-md">
                    <div className="w-full flex justify-center items-center">
                        <h4 className="font-bold text-xl text-white p-2">The Shoppe~</h4>
                    </div>
                    <Divider /> 
                    <div className="flex flex-col gap-4 w-full justify-start items-stretch">
                        <Button className={`font-bold ${botButtonColor} text-white`} onClick={handleBotBuyButtonClick}>
                            {botBuyButtonText}
                        </Button>
                         <Divider />
                        <Button className={`font-bold ${forumButtonColor} text-white`} onClick={handleForumBuyButtonClick}>
                            {forumBuyButtonText}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <DropdownMenu open={changelogOpen} onOpenChange={setChangelogOpen}>
                <DropdownMenuTrigger asChild>
                    <div className="absolute right-12 top-4 z-50 cursor-pointer flex items-center space-x-2">
                        <FiFileText size={30} color={theme === "dark" ? "white" : "black"} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0 w-[400px] h-[400px]">
                    <iframe src="https://austin2wafflez.github.io/wawaclicker/changelog.html" className="w-full h-full border-0"></iframe>
                </DropdownMenuContent>
            </DropdownMenu>
            
            <Sheet open={isSettingsOpen} onOpenChange={toggleSettings}>
                <SheetTrigger asChild>
                    <div className="absolute right-20 top-4 z-50 cursor-pointer">
                        <FaCog size={30} color={theme === "dark" ? "white" : "black"} />
                    </div>
                </SheetTrigger>
                <SheetContent side="left" className="bg-opacity-95 backdrop-blur-md">
                    <div className="w-full flex justify-center items-center">
                        <h4 className="font-bold text-xl text-white p-2">Settoing</h4>
                    </div>
                    <Divider />
                    <Button onClick={() => { 
                    setTheme(theme === "dark" ? "light" : "dark"); 
                    setCookie('theme', theme === "dark" ? "light" : "dark");
                    }}>Dark/Light Mode - Currently {theme}
                    <Divider />
                    </Button>
                    <Divider/>

                                       <Button onClick={() => {
                        const wawasValue = getCookie('wawas');
                        const wawabotsValue = getCookie('wawabots');
                        const wawaforumsValue = getCookie('wawaforums');

                        const saveContent = `wawa-${wawasValue || '0'}\nbots-${wawabotsValue || '0'}\nforums-${wawaforumsValue || '0'}`;
                        const blob = new Blob([saveContent], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'yoursave.wawa';
                        link.click();
                        URL.revokeObjectURL(url); // Clean up the object URL
                    }}>save stuff to file</Button>
                    <Divider/>
                   <input
                        type="file"
                        accept=".wawa"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const content = e.target?.result as string;
                                    const lines = content.split('\n');
                                    let newWawas = count;
                                    let newBots = botClicking;
                                    let newForums = forumClicking;

                                    lines.forEach(line => {
                                        if (line.startsWith('wawa-')) {
                                            newWawas = parseInt(line.substring('wawa-'.length));
                                        } else if (line.startsWith('bots-')) {
                                            newBots = parseInt(line.substring('bots-'.length));
                                        } else if (line.startsWith('forums-')) {
                                            newForums = parseInt(line.substring('forums-'.length));
                                        }
                                    });

                                    setCount(newWawas);
                                    setBotClicking(newBots);
                                    setForumClicking(newForums);

                                    setCookie('wawas', newWawas.toString());
                                    setCookie('wawabots', newBots.toString());
                                    setCookie('wawaforums', newForums.toString());
                                    window.location.reload();
                                };
                                reader.readAsText(file);
                            }
                        }}
                        className="hidden"
                        id="load-wawa-file"
                    />
                    <label htmlFor="load-wawa-file" className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                        load stuff from file (.wawa)
                    </label>
<Divider/>

                </SheetContent>
            </Sheet>

            <div className="absolute bottom-4 w-full text-center text-gray-500 text-sm">
                {testing ? (
                    <a href="https://wawa-clicker.web.app" className="underline" target="_blank" rel="noopener noreferrer">
                        click here to go back to the stable build!
                    </a>
                ) : (
                    <a href="https://9000-idx-studio-1745504646182.cluster-rhptpnrfenhe4qarq36djxjqmg.cloudworkstations.dev/?monospaceUid=572770" className="underline" target="_blank" rel="noopener noreferrer">
                        wanna try stuff AS I ADD IT? click here!! (warning - breaks often, subject to going down when i'm not working)
                    </a>
                )}
            </div>
        </main>
    );
}
