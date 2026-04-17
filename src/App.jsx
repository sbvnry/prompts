import React, { useEffect, useMemo, useState } from "react";
import { RefreshCw, Copy, Check, Sparkles, Palette, Heart, Smile, Wand2 } from "lucide-react";

const ACCESS_PASSWORD = "CHIBI2026";
const STORAGE_KEY = "chibi-prompt-access";

const eyeColors = ["honey brown", "dark brown", "warm amber", "soft hazel", "golden brown"];
const skinTones = ["deep brown skin", "rich brown skin", "warm deep brown skin", "smooth cocoa-brown skin"];
const hairStyles = ["high curly bun", "messy puff bun", "half-up voluminous curls", "curly ponytail", "loose glam curls", "defined puff with tendrils"];
const hairColors = ["dark brown", "black", "cherry brown", "espresso brown", "soft black-brown"];
const outfits = [
  "soft beige satin pajama set", "cozy blush lounge set", "cream luxury loungewear", "pink athleisure set",
  "neutral polka-dot pajama set", "white silky sleepwear set", "black silk slip dress", "oversized hoodie and biker shorts",
  "matching knit set", "velour tracksuit", "lace trim nightwear set", "minimalist monochrome outfit",
  "streetwear crop top and cargos", "soft cardigan and lounge pants", "luxury robe with satin belt"
];
const poses = [
  "sitting cross-legged", "holding a mug with both hands", "relaxed seated glam pose", "standing with attitude",
  "lounging with one leg tucked in", "sipping coffee in a cozy seated pose", "walking confidently", "looking over shoulder",
  "holding phone selfie pose", "typing on laptop", "stretching casually", "peace sign pose", "leaning on desk",
  "sitting with legs crossed elegantly", "playful wink pose"
];
const accessories = [
  "small gold hoop earrings", "chunky gold hoops", "pearl earrings", "diamond studs", "fluffy slippers",
  "soft satin scrunchie", "plush headband", "silk hair scarf", "delicate layered necklace", "gold chain necklace",
  "charm bracelet", "anklet", "oversized sunglasses", "cat-eye sunglasses", "designer handbag", "mini shoulder bag", "none"
];
const props = [
  "ceramic coffee mug with steam", "latte cup", "iced coffee cup", "planner and pen", "open notebook", "laptop",
  "tablet", "smartphone", "mini calculator", "credit cards in hand", "shopping bags", "makeup brush",
  "compact mirror", "headphones", "camera", "book", "none"
];
const themes = ["cozy glam doll theme", "luxury planner sticker theme", "soft feminine pajama theme", "premium budget planning theme", "glossy fashion doll theme"];
const backgrounds = ["transparent background", "isolated sticker-ready composition on transparent background", "clean white sticker composition with transparent background feel"];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const buildPrompt = (parts) => parts.filter(Boolean).map((p) => String(p).trim()).filter(Boolean).join(", ");

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-pink-100 bg-white/80 p-5 shadow-sm shadow-pink-100/60">
      <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 p-3">
        <Icon className="h-5 w-5 text-pink-700" />
      </div>
      <div className="text-lg font-semibold text-zinc-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-600">{text}</div>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div className="rounded-3xl border border-pink-100 bg-white/75 p-5 shadow-sm shadow-pink-100/60">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-sm font-semibold text-white">
        {number}
      </div>
      <div className="text-base font-semibold text-zinc-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-600">{text}</div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
      <span className="text-sm text-zinc-800">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-gradient-to-r from-pink-500 to-violet-500" : "bg-zinc-200"}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-800">{label}</label>
      {children}
    </div>
  );
}

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [accessError, setAccessError] = useState("");
  const [copied, setCopied] = useState(false);

  const [characterType, setCharacterType] = useState("Doll-style luxury chibi feminine character");
  const [skinTone, setSkinTone] = useState("deep brown skin");
  const [eyeColor, setEyeColor] = useState("honey brown");
  const [hairStyle, setHairStyle] = useState("high curly bun");
  const [hairColor, setHairColor] = useState("dark brown");
  const [outfit, setOutfit] = useState("soft beige satin pajama set");
  const [pose, setPose] = useState("sipping coffee in a cozy seated pose");
  const [theme, setTheme] = useState("luxury planner sticker theme");
  const [background, setBackground] = useState("transparent background");
  const [customProp, setCustomProp] = useState("ceramic coffee mug with steam");
  const [customAccessory, setCustomAccessory] = useState("small gold hoop earrings");
  const [includeGlossySkin, setIncludeGlossySkin] = useState(true);
  const [includeGlossyLips, setIncludeGlossyLips] = useState(true);
  const [includeLongLashes, setIncludeLongLashes] = useState(true);
  const [includeSoftBlush, setIncludeSoftBlush] = useState(true);
  const [includeNeutralTones, setIncludeNeutralTones] = useState(true);
  const [includeCleanLinework, setIncludeCleanLinework] = useState(true);
  const [includeSparkles, setIncludeSparkles] = useState(false);
  const [includeSoftLighting, setIncludeSoftLighting] = useState(false);
  const [includeDetailedClothing, setIncludeDetailedClothing] = useState(false);
  const [includeCuteExpression, setIncludeCuteExpression] = useState(false);
  const [extraDetails, setExtraDetails] = useState("oversized head, tiny body, big glossy eyes, polished digital illustration, sticker-ready, no text, high resolution");

  useEffect(() => {
    try {
      setHasAccess(window.localStorage.getItem(STORAGE_KEY) === "granted");
    } catch {
      setHasAccess(false);
    }
  }, []);

  const prompt = useMemo(() => buildPrompt([
    characterType,
    skinTone,
    includeGlossySkin ? "smooth glossy doll-like skin" : "smooth skin",
    "oversized head",
    "tiny body proportions",
    "huge glossy eyes",
    `${eyeColor} eyes`,
    includeLongLashes ? "long curled lashes" : "soft lashes",
    "defined brows",
    includeGlossyLips ? "full glossy lips with highlights" : "soft full lips",
    includeSoftBlush ? "subtle blush" : null,
    `voluminous textured curls in a ${hairStyle}`,
    `${hairColor} hair`,
    "high-detail strands and soft shine",
    `wearing ${outfit}`,
    customAccessory !== "none" ? customAccessory : null,
    `pose: ${pose}`,
    customProp !== "none" ? `with ${customProp}` : null,
    theme,
    includeNeutralTones ? "soft neutral tones" : "soft glam tones",
    includeCleanLinework ? "smooth clean linework" : "soft rendered linework",
    "soft shading",
    "glossy highlights in the eyes and lips",
    "high-detail glossy cartoon style",
    "premium sticker style",
    "centered composition",
    background,
    "polished digital illustration",
    "no text",
    "high resolution",
    extraDetails,
    includeSparkles ? "sparkle effects" : null,
    includeSoftLighting ? "soft ambient lighting" : null,
    includeDetailedClothing ? "highly detailed clothing folds and textures" : null,
    includeCuteExpression ? "cute expressive face" : null,
  ]), [characterType, skinTone, eyeColor, hairStyle, hairColor, outfit, pose, theme, background, customProp, customAccessory, includeGlossySkin, includeGlossyLips, includeLongLashes, includeSoftBlush, includeNeutralTones, includeCleanLinework, includeSparkles, includeSoftLighting, includeDetailedClothing, includeCuteExpression, extraDetails]);

  const randomizeAll = () => {
    setSkinTone(randomFrom(skinTones));
    setEyeColor(randomFrom(eyeColors));
    setHairStyle(randomFrom(hairStyles));
    setHairColor(randomFrom(hairColors));
    setOutfit(randomFrom(outfits));
    setPose(randomFrom(poses));
    setTheme(randomFrom(themes));
    setBackground(randomFrom(backgrounds));
    setCustomAccessory(randomFrom(accessories));
    setCustomProp(randomFrom(props));
  };

  const handleUnlock = () => {
    if (passwordInput.trim() === ACCESS_PASSWORD) {
      setHasAccess(true);
      setAccessError("");
      setPasswordInput("");
      try {
        window.localStorage.setItem(STORAGE_KEY, "granted");
      } catch {}
      return;
    }
    setAccessError("Incorrect password.");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-violet-100 p-6 text-zinc-900">
        <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-pink-600 shadow-sm">Private Access</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Unlock your chibi prompt studio.</h1>
          </div>
          <div className="rounded-[30px] bg-white/90 p-6 shadow-xl shadow-pink-200/60 backdrop-blur">
            <div className="text-2xl font-semibold text-zinc-900">Enter password</div>
            <div className="mt-4">
              <label className="mb-3 inline-block text-sm font-medium text-zinc-800">Password</label>
              <input
                className="h-12 w-full rounded-full border-2 border-pink-600 px-9 text-base outline-none transition focus:ring-4 focus:ring-pink-100"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleUnlock(); }}
                placeholder="Enter access password"
              />
            </div>
            {accessError ? <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">{accessError}</div> : null}
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-sm" onClick={handleUnlock}>Enter</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-violet-100 text-zinc-900">
      <section className="border-b border-white/50 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 md:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 p-2 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">Chibi Prompt Studio</div>
            <div className="text-xs text-zinc-500">Beginner-friendly builder</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Build cute chibi prompts without feeling overwhelmed.</h1>
          <p className="mt-5 text-base leading-7 text-zinc-600 md:text-lg">Customize the look, style, accessories, and extra details, then copy your finished prompt when it looks right.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8 md:pb-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">Made for beginners</h2>
          <p className="mt-3 text-zinc-600">Everything is laid out in a simple order, with colorful sections and easy actions.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard icon={Smile} title="Simple choices" text="Every setting is clearly labeled so you know what to pick next." />
          <FeatureCard icon={Palette} title="More colorful" text="The brighter layout makes the builder feel more fun and less technical." />
          <FeatureCard icon={Heart} title="More options" text="You have expanded outfits, poses, accessories, props, and extra switches." />
          <FeatureCard icon={Wand2} title="Live result" text="Your prompt updates instantly while you change options." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          <StepCard number="1" title="Pick a style" text="Choose skin tone, hair, outfit, accessory, and pose from the menus." />
          <StepCard number="2" title="Turn details on or off" text="Use the switches for glossy skin, lips, lashes, blush, and linework." />
          <StepCard number="3" title="Copy your prompt" text="When it looks good, copy it and use it in your image tool." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8 md:pb-20">
        <h2 className="text-3xl font-semibold md:text-4xl">Create your prompt step by step</h2>
        <p className="mt-3 max-w-2xl text-zinc-600">The left side is where you build. The right side shows your finished prompt.</p>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] bg-white/85 p-6 shadow-xl shadow-pink-200/60 backdrop-blur">
            <div className="rounded-3xl bg-gradient-to-r from-pink-100 to-violet-100 p-4">
              <strong>Quick start tip</strong>
              <div className="mt-1 text-sm text-zinc-600">Use Randomize for a fresh starting point, then change only the parts you want.</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Character type">
                <input className="w-full rounded-2xl border border-pink-200 bg-white p-3" value={characterType} onChange={(e) => setCharacterType(e.target.value)} />
              </Field>
              <Field label="Theme">
                <select className="w-full rounded-2xl border border-pink-200 bg-white p-3" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  {themes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
            </div>

            <div className="mt-6 rounded-3xl bg-pink-50 p-4">
              <div className="mb-3 text-sm font-semibold text-pink-700">Look</div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Skin tone"><select className="w-full rounded-2xl border border-pink-200 bg-white p-3" value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>{skinTones.map((i) => <option key={i}>{i}</option>)}</select></Field>
                <Field label="Eye color"><select className="w-full rounded-2xl border border-pink-200 bg-white p-3" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)}>{eyeColors.map((i) => <option key={i}>{i}</option>)}</select></Field>
                <Field label="Hair style"><select className="w-full rounded-2xl border border-pink-200 bg-white p-3" value={hairStyle} onChange={(e) => setHairStyle(e.target.value)}>{hairStyles.map((i) => <option key={i}>{i}</option>)}</select></Field>
                <Field label="Hair color"><select className="w-full rounded-2xl border border-pink-200 bg-white p-3" value={hairColor} onChange={(e) => setHairColor(e.target.value)}>{hairColors.map((i) => <option key={i}>{i}</option>)}</select></Field>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-violet-50 p-4">
              <div className="mb-3 text-sm font-semibold text-violet-700">Clothes and pose</div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Outfit"><select className="w-full rounded-2xl border border-violet-200 bg-white p-3" value={outfit} onChange={(e) => setOutfit(e.target.value)}>{outfits.map((i) => <option key={i}>{i}</option>)}</select></Field>
                <Field label="Pose"><select className="w-full rounded-2xl border border-violet-200 bg-white p-3" value={pose} onChange={(e) => setPose(e.target.value)}>{poses.map((i) => <option key={i}>{i}</option>)}</select></Field>
                <Field label="Accessory"><select className="w-full rounded-2xl border border-violet-200 bg-white p-3" value={customAccessory} onChange={(e) => setCustomAccessory(e.target.value)}>{accessories.map((i) => <option key={i}>{i}</option>)}</select></Field>
                <Field label="Prop"><select className="w-full rounded-2xl border border-violet-200 bg-white p-3" value={customProp} onChange={(e) => setCustomProp(e.target.value)}>{props.map((i) => <option key={i}>{i}</option>)}</select></Field>
              </div>
            </div>

            <div className="mt-6">
              <Field label="Background / composition">
                <select className="w-full rounded-2xl border border-pink-200 bg-white p-3" value={background} onChange={(e) => setBackground(e.target.value)}>
                  {backgrounds.map((i) => <option key={i}>{i}</option>)}
                </select>
              </Field>
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-r from-amber-50 to-pink-50 p-4">
              <div className="mb-3 text-sm font-semibold text-zinc-900">Extra style switches</div>
              <div className="grid gap-4 md:grid-cols-2">
                <Toggle label="Glossy skin" checked={includeGlossySkin} onChange={setIncludeGlossySkin} />
                <Toggle label="Glossy lips" checked={includeGlossyLips} onChange={setIncludeGlossyLips} />
                <Toggle label="Long lashes" checked={includeLongLashes} onChange={setIncludeLongLashes} />
                <Toggle label="Soft blush" checked={includeSoftBlush} onChange={setIncludeSoftBlush} />
                <Toggle label="Neutral tones" checked={includeNeutralTones} onChange={setIncludeNeutralTones} />
                <Toggle label="Clean linework" checked={includeCleanLinework} onChange={setIncludeCleanLinework} />
                <Toggle label="Sparkle effects" checked={includeSparkles} onChange={setIncludeSparkles} />
                <Toggle label="Soft lighting" checked={includeSoftLighting} onChange={setIncludeSoftLighting} />
                <Toggle label="Detailed clothing" checked={includeDetailedClothing} onChange={setIncludeDetailedClothing} />
                <Toggle label="Cute expression" checked={includeCuteExpression} onChange={setIncludeCuteExpression} />
              </div>
            </div>

            <div className="mt-6">
              <Field label="Extra details">
                <textarea className="min-h-[110px] w-full rounded-2xl border border-pink-200 bg-white p-3" value={extraDetails} onChange={(e) => setExtraDetails(e.target.value)} />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 px-4 py-3 text-white shadow-sm" onClick={randomizeAll}><RefreshCw className="h-4 w-4" /> Randomize</button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-violet-100 px-4 py-3 text-violet-800 shadow-sm" onClick={handleCopy}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy prompt"}</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] bg-white/85 p-6 shadow-xl shadow-violet-200/60 backdrop-blur">
              <div className="text-xl font-semibold text-violet-700">Your finished prompt</div>
              <p className="mb-4 mt-4 rounded-2xl bg-violet-50 p-4 text-sm text-zinc-600">This box updates automatically while you build.</p>
              <textarea readOnly className="min-h-[420px] w-full rounded-2xl border-0 bg-zinc-900 p-5 font-mono text-sm leading-7 text-zinc-100" value={prompt} />
              <p className="mt-3 text-xs text-zinc-500">Tip: copy this prompt and paste it into your image tool.</p>
            </div>
            <div className="rounded-[30px] bg-white/85 p-6 shadow-xl shadow-pink-200/60 backdrop-blur">
              <div className="text-xl font-semibold text-pink-700">Helpful reminder</div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
                <p>Choose your basic look first.</p>
                <p>Then add outfit, pose, accessory, and prop.</p>
                <p>Use extra details only for the final polish.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
