import React from "react";

// Deterministic pseudo-random generator: same seed always returns the same
// value, so it's safe to call during render (unlike Math.random()).
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Precomputed once at module load since it doesn't depend on props.
const STAR_POSITIONS = Array.from({ length: 100 }, (_, i) => ({
  top: seededRandom(i * 12.9898 + 1) * 100,
  left: seededRandom(i * 78.233 + 1) * 100,
}));

export default function BlogCardEmpty(): React.JSX.Element {
  return (
    <li className="relative z-0 col-span-3 flex min-h-125 items-center justify-center overflow-hidden rounded-xl bg-linear-to-tr from-indigo-400 to-purple-800">
      <div className="to-violet-500-500 absolute top-[-10%] right-0 bottom-0 left-[-15%] z-10 h-80 w-[320px] rounded-full bg-linear-to-tr from-indigo-400 opacity-100" />
      <div className="absolute -top-[calc(8%)] right-0 bottom-0 -left-[calc(13%)] z-9 h-80 w-[320px] rounded-full border-[5px] border-indigo-400 bg-transparent opacity-100" />
      <div className="absolute right-[-5%] bottom-[-5%] z-8 h-120 w-120 rounded-full bg-linear-to-tr from-indigo-400 to-purple-800 opacity-100" />
      {STAR_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="absolute z-9 size-1 rounded-full bg-indigo-200"
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
          }}
        />
      ))}
      <h2 className="z-50 text-4xl font-black text-white">Wow, so empty...</h2>
    </li>
  );
}
