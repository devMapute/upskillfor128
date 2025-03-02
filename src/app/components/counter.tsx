"use client";
import { useState } from "react";

export const Counter = () => {
  console.log("Counter");
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="pb-2">Bonk Counter: {count}</p>
      <button className="rounded bg-white text-gray-700 px-5 py-2" onClick={() => setCount(count + 1)}>Bonk!</button>
    </div>
  );
};
