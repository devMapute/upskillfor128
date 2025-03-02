"use client";
import { useState } from "react";

export const Counter = () => {
  console.log("Counter");
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Bonk Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Bonk!</button>
    </div>
  );
};
