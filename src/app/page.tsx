
"use client";

//importing
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next"; // Using cookies-next
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaShoppingCart, FaCog } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { isMobile as isMobileDevice } from "react-device-detect";
import { motion } from "framer-motion";

const Divider: React.FC = () => {
    return <div style={{ height: '13px', visibility: 'hidden' }} />;
};

// Audio setup needs to be client-side
let squeeAudio: HTMLAudioElement | null = null;
let sadAudio: HTMLAudioElement | null = null;
let spendAudio: HTMLAudioElement | null = null;


export default function Home() {
    const [count, setCount] = useState<number>(0);
    const [mute, setMute] = useState<number>(0); // 0 for unmuted, 1 for muted
    const [isClient, setIsClient] = useState(false);
    const [testing, setTesting] = useState(false);

    const { theme, setTheme } = useTheme();

    // shop buttons
    const [botBuyButtonText, setBotBuyButtonText] = useState("30W$ - wawabot3000 - buy nao!!!");
    const [botButtonColor, setBotButtonColor] = useState<"default" | "destructive">("default");
    const [forumBuyButtonText, setForumBuyButtonText] = useState("150W$ - ask for wawas on forum - buy nao!!!");
    const [forumButtonColor, setForumButtonColor] = useState<"default" | "destructive">("default");


    enum WawaState { Normal = 'normal', Wawa = 'wawa', Unwawa = 'unwawa', Recover = 'rewawa', Spent = 'money', Pet = 'yayay' }
    const [wawaState, setWawaState] = useState<WawaState>(WawaState.Normal);

    // menus
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [changelogOpen, setChangelogOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // items
    const [botClicking, setBotClicking] = useState<number>(0);
    const [forumClicking, setForumClicking] = useState<number>(0);

    // image positioning state
    const [imagePositionClass, setImagePositionClass] = useState("absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500");

    useEffect(() => {
        setIsClient(true);

        // Initialize audio objects on client
        squeeAudio = new Audio('https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/sfx/squee.wav');
        squeeAudio.volume = 0.25;
        sadAudio = new Audio('https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/sfx/bwomp.wav');
        sadAudio.volume = 0.25;
        spendAudio = new Audio('https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/sfx/kaching.wav');
        spendAudio.volume = 0.50;


        const storedCount = getCookie('wawas_count'); // Changed cookie name for clarity
        setCount(storedCount ? parseInt(storedCount as string, 10) : 0);

        const storedTheme = getCookie('app_theme'); // Changed cookie name
        if (storedTheme) {
            setTheme(storedTheme as string);
        } else if (theme !== 'dark' && theme !== 'light') { // Ensure a default if system isn't explicitly dark/light
             setTheme('light');
        }


        setTesting(window.location.hostname !== 'wawa-clicker.web.app' && window.location.hostname !== 'tap-counter-app.web.app' ); // Adjusted for new app name

        const storedBotCount = getCookie('wawabots_count');
        setBotClicking(storedBotCount ? parseInt(storedBotCount as string, 10) : 0);

        const storedForumCount = getCookie('wawaforums_count');
        setForumClicking(storedForumCount ? parseInt(storedForumCount as string, 10) : 0);

        const storedMute = getCookie('app_mute');
        setMute(storedMute ? parseInt(storedMute as string, 10) : 0);

        const dataLoadedAlertShownKey = 'dataLoadedAlertShown';
        const alertShown = getCookie(dataLoadedAlertShownKey);
        if (storedCount && !alertShown) {
            toast.success("Data loaded successfully! :3");
            setCookie(dataLoadedAlertShownKey, 'true', { maxAge: 60 * 60 * 24, path: '/' });
        }

        const updateImagePos = () => {
            if (isMobileDevice || count < 0 || window.innerWidth < 906) {
                setImagePositionClass("absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500");
            } else {
                setImagePositionClass("absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500");
            }
        };
        updateImagePos();
        window.addEventListener('resize', updateImagePos);
        return () => window.removeEventListener('resize', updateImagePos);

    }, [setTheme]); // Only run once on client mount, setTheme is stable

    // title
    useEffect(() => {
        if (isClient) {
            document.title = `Tap Counter - ${count} taps`;
        }
    }, [count, isClient]);

    // Save states to cookies when they change
    useEffect(() => { if (isClient) setCookie('wawas_count', count.toString(), { path: '/' }); }, [count, isClient]);
    useEffect(() => { if (isClient) setCookie('wawabots_count', botClicking.toString(), { path: '/' }); }, [botClicking, isClient]);
    useEffect(() => { if (isClient) setCookie('wawaforums_count', forumClicking.toString(), { path: '/' }); }, [forumClicking, isClient]);
    useEffect(() => { if (isClient) setCookie('app_mute', mute.toString(), { path: '/' }); }, [mute, isClient]);
    useEffect(() => { if (isClient && theme) setCookie('app_theme', theme, { path: '/' }); }, [theme, isClient]);


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


    const playSound = (audioElement: HTMLAudioElement | null) => {
        if (isClient && audioElement && mute === 0) {
            audioElement.currentTime = 0;
            audioElement.play().catch(error => console.error("Error playing sound:", error));
        }
    }

    const incrementCountByPet = () => {
        setCount((prevCount) => prevCount + 1);
        setWawaState(WawaState.Pet);
        playSound(squeeAudio);
        setTimeout(() => {
            if (wawaState === WawaState.Pet) setWawaState(WawaState.Normal);
        }, 300);
    };

    const incrementCount = () => {
        setCount((prevCount) => prevCount + 1);
        setWawaState(WawaState.Wawa);
        playSound(squeeAudio);
        setTimeout(() => {
            if (wawaState === WawaState.Wawa) setWawaState(WawaState.Normal);
        }, 150);
    };
    
    const resetCount = () => {
        setCount(0);
        playSound(sadAudio);
        setWawaState(WawaState.Unwawa);
         setTimeout(() => {
            if (wawaState === WawaState.Unwawa) setWawaState(WawaState.Normal);
        }, 300);
    }

    const artiCount = () => {
        setCount((prevCount) => prevCount + 1);
    };
    
    const ouchBuy = () => {
        playSound(spendAudio);
        setWawaState(WawaState.Spent);
        setTimeout(() => {
          if (wawaState === WawaState.Spent) setWawaState(WawaState.Normal);
        }, 500);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    const handleBotBuyButtonClick = () => {
        if (count >= 30) {
            setCount((prevCount) => prevCount - 30);
            setBotClicking((prevClicking) => prevClicking + 1);
            setBotBuyButtonText("Bought!");
            ouchBuy();
            setTimeout(() => setBotBuyButtonText("30 W$ - Auto Clicker Tier 1"), 1000);
            setBotButtonColor("default");
        } else {
            setBotBuyButtonText("Too Expensive 3:");
            setBotButtonColor("destructive");
            playSound(sadAudio);
            setTimeout(() => {
                setBotBuyButtonText("30 W$ - Auto Clicker Tier 1");
                setBotButtonColor("default");
            }, 1000);
        }
    };

    const handleForumBuyButtonClick = () => {
        if (count >= 150) {
            setCount((prevCount) => prevCount - 150);
            setForumClicking((prevClicking) => prevClicking + 1);
            setForumBuyButtonText("Bought!");
            ouchBuy();
            setTimeout(() => setForumBuyButtonText("150 W$ - Auto Clicker Tier 2"), 1000);
            setForumButtonColor("default");
        } else {
            setForumBuyButtonText("Too Expensive 3:");
            setForumButtonColor("destructive");
            playSound(sadAudio);
            setTimeout(() => {
                setForumBuyButtonText("150 W$ - Auto Clicker Tier 2");
                setForumButtonColor("default");
            }, 1000);
        }
    };


    if (!isClient) {
        return <div className="flex items-center justify-center min-h-screen w-full"><p>Loading...</p></div>; // Or a loading spinner
    }
    
    const wawaImageSrc = wawaState === WawaState.Wawa ? "https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/wa.png"
        : wawaState === WawaState.Unwawa ? "https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/sad.png"
        : wawaState === WawaState.Pet ? "https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/yay.png"
        : wawaState === WawaState.Spent ? "https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/spent.png"
        : "https://raw.githubusercontent.com/austin2wafflez/wawaclicker/master/src/app/img/old/aw.png";

    const wawaImageAlt = wawaState === WawaState.Wawa ? ":D"
        : wawaState === WawaState.Unwawa ? ":("
        : wawaState === WawaState.Pet ? "^w^"
        : wawaState === WawaState.Spent ? ":3 $"
        : ":3";
        
    const wawaImageAnimation = wawaState === WawaState.Pet ? "animate-bounce" : "animate-wiggle";


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                Tap Counter
            </h1>
            <motion.div
                key={count} // Add key to force re-render on count change for animation
                initial={{ scale: count > 0 ? 1.1 : 1 }} // Slightly larger scale for increment
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="text-7xl md:text-8xl font-semibold mb-10 text-center"
            >
                {count}
            </motion.div>

            <div className="flex space-x-4 mb-8">
                <Button
                    variant="default"
                    size="lg"
                    className="px-8 py-4 text-xl rounded-lg shadow-md active:scale-95 transition-transform"
                    onClick={incrementCount}
                >
                    Increment
                </Button>
                <Button
                    variant="default" // Changed to default to use primary (Teal)
                    size="lg"
                    className="px-8 py-4 text-xl rounded-lg shadow-md active:scale-95 transition-transform"
                    onClick={resetCount}
                >
                    Reset
                </Button>
            </div>
            
            {/* Wawa Image as a clickable pet */}
            <div className={`${imagePositionClass} cursor-pointer`} onClick={incrementCountByPet} data-ai-hint="cute cat">
                 <Image
                    src={wawaImageSrc}
                    alt={wawaImageAlt}
                    width={isMobileDevice ? 150 : 250}
                    height={isMobileDevice ? 150 : 250}
                    className={`${wawaImageAnimation} ${theme === "dark" && wawaState !== WawaState.Spent ? "invert" : ""}`} // Only invert non-spent wawa in dark mode
                    priority
                    unoptimized
                />
            </div>


            {/* Shop Button */}
            <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-50">
                        <FaShoppingCart size={24} />
                         <span className="sr-only">Open Shop</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background/95 backdrop-blur-sm">
                     <div className="p-4">
                        <h4 className="text-xl font-semibold text-center mb-4">The Shoppe~</h4>
                        <div className="flex flex-col gap-4">
                            <Button variant={botButtonColor} className="font-semibold" onClick={handleBotBuyButtonClick}>
                                {botBuyButtonText}
                            </Button>
                            <Button variant={forumButtonColor} className="font-semibold" onClick={handleForumBuyButtonClick}>
                                {forumBuyButtonText}
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Changelog Button */}
            <DropdownMenu open={changelogOpen} onOpenChange={setChangelogOpen}>
                <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon" className="absolute right-16 top-4 z-50">
                        <FiFileText size={24} />
                        <span className="sr-only">Open Changelog</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0 w-[clamp(300px,80vw,500px)] h-[clamp(300px,70vh,600px)]" align="end">
                    <iframe src="changelog.html" className="w-full h-full border-0 rounded-md"></iframe>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings Button */}
            <Sheet open={isSettingsOpen} onOpenChange={toggleSettings}>
                <SheetTrigger asChild>
                     <Button variant="ghost" size="icon" className="absolute right-28 top-4 z-50">
                        <FaCog size={24} />
                         <span className="sr-only">Open Settings</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background/95 backdrop-blur-sm">
                    <div className="p-4">
                        <h4 className="text-xl font-semibold text-center mb-6">Settings</h4>
                        <div className="flex flex-col gap-4">
                            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                Toggle Theme: Currently {theme === "dark" ? "Dark" : "Light"}
                            </Button>
                             <Button onClick={() => setMute(prev => prev === 0 ? 1 : 0)}>
                                {mute === 0 ? "Mute Sounds" : "Unmute Sounds"}
                            </Button>

                            <Button onClick={() => {
                                const wawasValue = getCookie('wawas_count') || '0';
                                const botsValue = getCookie('wawabots_count') || '0';
                                const forumsValue = getCookie('wawaforums_count') || '0';
                                const themeValue = getCookie('app_theme') || 'light';
                                const muteValue = getCookie('app_mute') || '0';

                                const saveContent = `wawa-${wawasValue}\nbots-${botsValue}\nforums-${forumsValue}\ntheme-${themeValue}\nmute-${muteValue}`;
                                const blob = new Blob([saveContent], { type: 'text/plain' });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = 'tap_counter_save.wawa';
                                link.click();
                                URL.revokeObjectURL(url);
                                toast.success("Save file downloaded!");
                            }}>Save Data to File</Button>

                            <input
                                type="file"
                                accept=".wawa"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            try {
                                                const content = e.target?.result as string;
                                                const lines = content.split('\n');
                                                let newWawas = count;
                                                let newBots = botClicking;
                                                let newForums = forumClicking;
                                                let newTheme = theme;
                                                let newMute = mute;

                                                lines.forEach(line => {
                                                    if (line.startsWith('wawa-')) newWawas = parseInt(line.substring('wawa-'.length));
                                                    else if (line.startsWith('bots-')) newBots = parseInt(line.substring('bots-'.length));
                                                    else if (line.startsWith('forums-')) newForums = parseInt(line.substring('forums-'.length));
                                                    else if (line.startsWith('theme-')) newTheme = line.substring('theme-'.length);
                                                    else if (line.startsWith('mute-')) newMute = parseInt(line.substring('mute-'.length));
                                                });

                                                setCount(newWawas);
                                                setBotClicking(newBots);
                                                setForumClicking(newForums);
                                                if(newTheme) setTheme(newTheme);
                                                setMute(newMute);
                                                
                                                // Also update cookies immediately
                                                setCookie('wawas_count', newWawas.toString(), { path: '/' });
                                                setCookie('wawabots_count', newBots.toString(), { path: '/' });
                                                setCookie('wawaforums_count', newForums.toString(), { path: '/' });
                                                if(newTheme) setCookie('app_theme', newTheme, { path: '/' });
                                                setCookie('app_mute', newMute.toString(), { path: '/' });

                                                toast.success("Data loaded from file! Reloading...");
                                                setTimeout(() => window.location.reload(), 1500);
                                            } catch (err) {
                                                toast.error("Failed to load save file. It might be corrupted.");
                                                console.error("Error loading save file:", err);
                                            }
                                        };
                                        reader.readAsText(file);
                                    }
                                }}
                                className="hidden"
                                id="load-wawa-file"
                            />
                            <Button asChild>
                                <label htmlFor="load-wawa-file" className="cursor-pointer">
                                    Load Data from File (.wawa)
                                </label>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>


            <div className="absolute bottom-4 w-full text-center text-muted-foreground text-sm">
                {testing ? (
                    <a href="https://tap-counter-app.web.app" className="underline" target="_blank" rel="noopener noreferrer">
                        View stable build
                    </a>
                ) : (
                     <a href="https://wawa-clicker.web.app" className="underline" target="_blank" rel="noopener noreferrer">
                        You are on the stable build. (Old link, dev build may be unavailable)
                    </a>
                )}
            </div>
        </div>
    );
}
