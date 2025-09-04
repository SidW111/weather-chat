
"use client";
import { useEffect, useState } from "react";

export function useKeyboardSafeHeight() {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeight = () => setHeight(window.innerHeight);
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return height;
}
