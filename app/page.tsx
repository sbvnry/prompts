
"use client";

import React, { useMemo, useState } from "react";

const STYLE_KEYS = ["soft", "streetwear", "luxury", "boss", "custom"];
const pickRandom = (items: string[]) => items[Math.floor(Math.random() * items.length)];

const options = {
  skinTone: [
    "deep brown skin with warm golden undertones",
    "warm medium brown skin with soft golden undertones",
    "rich cocoa brown skin with natural glow",
    "caramel brown skin with soft warm undertones",
    "golden brown skin with even complexion",
    "mocha brown skin with warm glow",
    "espresso brown skin with soft golden highlights",
    "cinnamon brown skin with natural warmth",
    "warm bronze brown skin with even complexion",
    "soft chestnut brown skin with golden undertones",
  ],
  eyeColor: ["honey brown","warm amber","golden brown","deep brown","soft hazel","caramel brown","chocolate brown","light hazel brown","warm cocoa brown","glossy dark brown"],
  hair: ["towel wrapped hair","voluminous textured curls in a high curly bun","messy curly puff","half-up curly hairstyle","sleek bun with baby hairs","long loose curls","two curly space buns","low curly ponytail","soft afro puff","curly bob hairstyle","high puff with face-framing curls","defined shoulder-length curls"],
  hairColor: ["dark brown hair","espresso brown hair","soft black-brown hair","chocolate brown hair","warm chestnut brown hair","cinnamon brown hair","caramel brown highlights","dark auburn brown hair","deep mocha brown hair","black hair with soft shine"],
  outfit: [
    "soft beige bathrobe","beige satin pajama set","beige blazer with white top","cozy cream lounge set","soft neutral sweater set","cream ribbed loungewear set","beige oversized hoodie with leggings","white skincare robe","soft pink pajama set","tan cardigan with cream top","silky champagne pajama set","minimal beige two-piece set",
    "soft blush pink lounge set","baby blue pajama set","sage green cozy sweater set","lavender pajama set","cream and mocha two-piece lounge set","soft peach lounge set","warm caramel tracksuit","off-white oversized hoodie set","light grey cozy sweat set","dusty rose pajama set","soft nude beige lounge set","warm taupe matching set","ivory silk pajama set","muted olive green lounge set","chocolate brown cozy set","cream and blush color-block lounge set","soft yellow pastel pajama set","minimal black and beige outfit","soft blue and white striped pajama set",
    "black streetwear tracksuit with white sneakers","oversized hoodie with cargo pants and Nike sneakers","urban tracksuit with Jordans sneakers","cropped hoodie with joggers and chunky sneakers","oversized graphic hoodie with biker shorts and sneakers","streetwear set with puffer jacket and sneakers","athleisure tracksuit with Nike Air Force style sneakers","urban two-piece tracksuit with high-top sneakers","baggy hoodie with sweatpants and Jordans","sporty streetwear set with running sneakers","neutral tone tracksuit with chunky sneakers","black and grey streetwear outfit with sneakers","oversized sweatshirt dress with sneakers","hoodie and leggings with sporty sneakers","urban lounge set with designer-inspired sneakers",
  ],
  pose: ["gently patting toner on her face","applying serum to cheek","working on laptop while on phone","writing in planner","sipping coffee in a cozy seated pose","counting money with a confident smile","journaling with a pen","holding a skincare bottle close to her cheek","applying lip gloss","checking her phone with a calm smile","sitting cross-legged with laptop","holding planner open with both hands","pouring coffee into a mug","holding a money envelope","using a jade roller on her cheek"],
  props: ["none","cotton pad and skincare bottle","laptop, coffee cup, planner, smartphone","coffee cup and planner","small mirror and lip gloss tube","money envelope and smartphone","pen and planner","serum dropper and small bottle","jade roller and skincare jar","iced coffee cup and phone","laptop and planner","tablet and stylus","cash envelope and planner","face mist bottle and cotton pad","coffee mug and notebook","lip balm and compact mirror"],
  expression: ["calm and relaxed","focused and cute","soft happy smile","confident smile","peaceful self-care mood","boss girl focus","cozy morning smile","gentle satisfied smile","sweet relaxed expression","soft confident expression","dreamy calm expression","productive and focused mood"],
  theme: ["luxury planner sticker theme","skincare routine sticker theme","soft life sticker theme","boss girl money sticker theme","productivity sticker theme","digital planner sticker theme","morning routine sticker theme","self-care sticker theme","cozy work-from-home sticker theme","budget planner sticker theme","small business owner sticker theme","clean girl aesthetic sticker theme"],
  background: ["plain light beige","plain warm cream","plain soft beige","transparent background feel","plain blush pink","plain ivory","plain champagne beige","plain soft peach","plain creamy nude","plain pale rose"],
};

const stylePresets = {
  soft: {
    theme: "soft life sticker theme",
    backgrounds: ["plain blush pink", "plain soft peach", "plain warm cream", "plain pale rose"],
    outfits: ["cozy cream lounge set","soft blush pink lounge set","cream ribbed loungewear set","soft peach lounge set","lavender pajama set","baby blue pajama set"],
    props: "none",
  },
  streetwear: {
    theme: "boss girl money sticker theme",
    backgrounds: ["plain light beige", "plain ivory", "plain creamy nude", "plain soft beige"],
    outfits: ["black streetwear tracksuit with white sneakers","oversized hoodie with cargo pants and Nike sneakers","urban tracksuit with Jordans sneakers","cropped hoodie with joggers and chunky sneakers","oversized graphic hoodie with biker shorts and sneakers","streetwear set with puffer jacket and sneakers","athleisure tracksuit with Nike Air Force style sneakers","urban two-piece tracksuit with high-top sneakers","baggy hoodie with sweatpants and Jordans","neutral tone tracksuit with chunky sneakers"],
    props: "none",
  },
  luxury: {
    theme: "luxury planner sticker theme",
    backgrounds: ["plain champagne beige", "plain ivory", "plain warm cream", "plain creamy nude"],
    outfits: ["silky champagne pajama set","ivory silk pajama set","beige satin pajama set","tan cardigan with cream top","minimal beige two-piece set","soft nude beige lounge set"],
    props: "none",
  },
  boss: {
    theme: "productivity sticker theme",
    backgrounds: ["plain ivory", "plain light beige", "plain champagne beige", "plain warm cream"],
    outfits: ["beige blazer with white top","minimal black and beige outfit","warm taupe matching set","cream and mocha two-piece lounge set","chocolate brown cozy set"],
    props: "laptop, coffee cup, planner, smartphone",
  },
};

function buildPrompt(data: any) {
  const propsLine = data.props === "none" ? "" : `holding or using: ${data.props}\n`;
  return `adorable chibi girl with ${data.skinTone}, smooth even complexion, soft natural glow, warm undertones, avoid gray or ashy skin tones, not overly saturated

smooth glossy doll-like skin
oversized head, tiny body proportions, huge glossy eyes
${data.eyeColor} eyes
long curled lashes
defined brows
full glossy lips with highlights
subtle blush

hair: ${data.hair}, ${data.hairColor}, soft shine, clean simplified detail

outfit: ${data.outfit}

pose: ${data.pose}

${propsLine}
expression: ${data.expression}

theme: ${data.theme}

minimal clean background: ${data.background}, flat solid color, no gradient
pure plain background only
no shadows outside character
no vignette
no glow
no sparkles
no lighting effects
no blur
no depth of field
no scene elements
no environment
no texture background
no text

no outline around character, clean edge cutout sticker style
smooth vector-like linework
soft neutral tones
simplified shapes
consistent color palette
no realistic rendering
no 3d style
no painterly style

full body visible, centered composition
premium planner sticker style
transparent background feel
sticker-ready
high resolution`;
}

export default function Page() {
  const [style, setStyle] = useState("soft");
  const [skinTone, setSkinTone] = useState(options.skinTone[0]);
  const [eyeColor, setEyeColor] = useState(options.eyeColor[0]);
  const [hair, setHair] = useState(options.hair[0]);
  const [hairColor, setHairColor] = useState(options.hairColor[0]);
  const [outfit, setOutfit] = useState("soft beige bathrobe");
  const [pose, setPose] = useState(options.pose[0]);
  const [props, setProps] = useState("cotton pad and skincare bottle");
  const [expression, setExpression] = useState(options.expression[0]);
  const [theme, setTheme] = useState("skincare routine sticker theme");
  const [background, setBackground] = useState(options.background[0]);
  const [copied, setCopied] = useState(false);

  const applyStyle = (selected: string) => {
    setStyle(selected);
    if (selected === "custom") return;
    const preset = (stylePresets as any)[selected];
    setTheme(preset.theme);
    setOutfit(pickRandom(preset.outfits));
    setBackground(pickRandom(preset.backgrounds));
    setProps(preset.props);
  };

  const prompt = useMemo(() => buildPrompt({ skinTone, eyeColor, hair, hairColor, outfit, pose, props, expression, theme, background }), [skinTone, eyeColor, hair, hairColor, outfit, pose, props, expression, theme, background]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const Field = ({ label, value, setValue, list, disabled = false }: any) => (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-stone-700">{label}</span>
      <select disabled={disabled} value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-2xl border-none bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition focus:ring-2 focus:ring-pink-200 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400">
        {list.map((item: string) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );

  const styleButtonClass = (key: string, activeClass: string, inactiveClass: string) =>
    `rounded-full px-4 py-2 text-white transition ${style === key ? `${activeClass} scale-105 shadow-lg` : inactiveClass}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 px-5 py-8 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-pink-200/70 to-amber-100/70 p-8 text-center shadow-lg backdrop-blur">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-amber-400 text-white shadow-lg">✦</div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Premium Sticker Tool</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Chibi Prompt Builder</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-600 md:text-lg">Build clean, luxury chibi sticker prompts for skincare, planner, work, money, and soft life content.</p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => applyStyle("soft")} className={styleButtonClass("soft", "bg-pink-500", "bg-pink-300")}>Soft Life</button>
          <button onClick={() => applyStyle("streetwear")} className={styleButtonClass("streetwear", "bg-black", "bg-stone-700")}>Streetwear</button>
          <button onClick={() => applyStyle("luxury")} className={styleButtonClass("luxury", "bg-amber-500", "bg-amber-300")}>Luxury</button>
          <button onClick={() => applyStyle("boss")} className={styleButtonClass("boss", "bg-purple-600", "bg-purple-400")}>Boss Girl</button>
          <button onClick={() => applyStyle("custom")} className={styleButtonClass("custom", "bg-rose-600", "bg-rose-300")}>Custom</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border-none bg-gradient-to-br from-white to-pink-50 p-6 shadow-lg md:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="text-xl">✦</span><h2 className="text-2xl font-bold">Customize Your Sticker</h2></div>
            <div className="grid gap-5">
              <Field label="Skin Tone" value={skinTone} setValue={setSkinTone} list={options.skinTone} />
              <Field label="Eye Color" value={eyeColor} setValue={setEyeColor} list={options.eyeColor} />
              <Field label="Hair Style" value={hair} setValue={setHair} list={options.hair} />
              <Field label="Hair Color" value={hairColor} setValue={setHairColor} list={options.hairColor} />
              <Field label="Outfit" value={outfit} setValue={setOutfit} list={options.outfit} />
              <Field label="Pose" value={pose} setValue={setPose} list={options.pose} />
              <Field label="Props" value={props} setValue={setProps} list={options.props} />
              <Field label="Expression" value={expression} setValue={setExpression} list={options.expression} />
              <Field label="Theme" value={theme} setValue={setTheme} list={options.theme} disabled={style !== "custom"} />
              <Field label="Background" value={background} setValue={setBackground} list={options.background} disabled={style !== "custom"} />
            </div>
          </div>

          <div className="rounded-[2rem] border-none bg-gradient-to-br from-stone-900 to-pink-900 p-6 text-white shadow-lg md:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">Generated Prompt</p><h2 className="mt-1 text-2xl font-bold">Copy & Paste</h2></div>
              <button onClick={copyPrompt} className="rounded-2xl bg-gradient-to-r from-pink-400 to-amber-300 px-5 py-3 text-white hover:opacity-90"><span className="mr-2">⧉</span>{copied ? "Copied" : "Copy"}</button>
            </div>
            <textarea readOnly value={prompt} className="min-h-[640px] w-full resize-none rounded-[1.5rem] border-none bg-white/10 p-5 text-sm leading-6 text-white outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
