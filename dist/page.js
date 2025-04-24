// Suggested code may be subject to a license. Learn more: ~LicenseLog:3278053743.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3639530951.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:502769164.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3208014068.
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
var react_2 = require("react");
var next_themes_1 = require("next-themes");
var image_1 = require("next/image");
var react_3 = require("react");
function Home() {
    var wawaImage = (0, react_3.useRef)(null);
    var _a = (0, react_1.useState)(false), isWawaing = _a[0], setIsWawaing = _a[1];
    var _b = (0, react_1.useState)(0), count = _b[0], setCount = _b[1];
    var _c = (0, next_themes_1.useTheme)(), theme = _c.theme, setTheme = _c.setTheme;
    (0, react_2.useEffect)(function () {
        var prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            setTheme("dark");
        }
    }, []);
    var incrementCount = function () {
        setIsWawaing(true);
        setTimeout(function () {
            setIsWawaing(false);
            setCount(function (prevCount) { return prevCount + 1; });
        }, 150);
    };
    var deincrementCount = function () {
        setCount(function (prevCount) { return prevCount - 1; });
    };
    return (<main className={"flex flex-col items-start justify-center min-h-screen p-4 ".concat(theme === "dark" ? "bg-blue-950 text-white" : "bg-white text-black")}>

      <h1 className={"text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ".concat(theme === "dark" ? "text-white" : "")}>
        You have wawa'd
      </h1>
      <div className="text-6xl md:text-7xl lg:text-8xl font-semibold mb-12">
        {count < 0 ? (<span className="text-red-500">{count} times...</span>) : (<>
        <span className={theme === "dark" ? "text-white" : ""}>{count}</span> times!</>)}
      </div>
    <div className="flex space-x-4">
        <button_1.Button variant="default" className={"text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ".concat(theme === "dark" ? "bg-white text-black" : "bg-gray-400 text-white")} onClick={incrementCount}>
          Wawa :3
        </button_1.Button>
        <button_1.Button variant={theme === "dark" ? "secondary" : "destructive"} className={"text-lg md:text-xl p-6 rounded-full transition-transform active:scale-95 ".concat(theme === "dark" ? "bg-blue-400 text-white" : "")} onClick={deincrementCount}>
          Unwawa 3:
        </button_1.Button>
      </div>      
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {isWawaing ? (<image_1.default src="/wa.png" alt=":D" width={100} height={100} className="animate-wiggle"/>) : (<image_1.default src="/aw.png" alt=":3" width={100} height={100}/>)}
      </div>
    </main>);
}
