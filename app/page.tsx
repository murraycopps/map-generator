"use client";
import { simplifyLine, simplifyMap } from "./_scripts";
import Land from "./land";
import Water from "./water";
import { useEffect, useState } from "react";
import MapClass from "./_scripts/data";

export default function Home() {
  const [vector, setVector] = useState([] as Array<[number, number]>);
  const [makeLand, setMakeLand] = useState(false);
  const [startGen, setStartGen] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    MapClass.map.aspect_ratio = window.innerWidth / window.innerHeight;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      {true && (
        <div className="flex flex-col items-center justify-center top-0 left-0 absolute gap-2 p-8 z-10 bg-green-600">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 p-2"
          >
            X
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setStartGen("land");
            }}
            className="p-2 bg-emerald-600"
          >
            Add Land
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setStartGen("water");
            }}
            className="p-2 bg-emerald-600"
          >
            Add Water
          </button>
          <button onClick={() => {
            simplifyMap();
          }} className="p-2 bg-emerald-600">
            Simplify
          </button>
        </div>
      )}
      <div
        className="bg-blue-500 w-screen h-screen"
        onMouseDown={() => {
          if (open || !startGen) return;
          setMakeLand(true);
          setVector([]);
        }}
        onMouseUp={() => {
          if (open || !startGen || !makeLand) return;
          setMakeLand(false);
          setStartGen("");
          MapClass.addLand({ island: true, vector: simplifyLine(vector) });
          setVector([]);
        }}
        onMouseMove={(e) =>
          makeLand &&
          setVector([
            ...vector,
            [
              (e.clientX / window.innerWidth) * 100,
              (e.clientY / window.innerHeight) * 100,
            ],
          ])
        }
      >
        {MapClass.map.lands.map((land, i) => (
          <Land key={i} {...land} />
        ))}
        {MapClass.map.water.map((water, i) => (
          <Water key={i} {...water} />
        ))}
        {makeLand && startGen === "land" ? (
          <Land vector={vector} island />
        ) : (
          <Water vector={vector} lake />
        )}
      </div>
    </main>
  );
}
