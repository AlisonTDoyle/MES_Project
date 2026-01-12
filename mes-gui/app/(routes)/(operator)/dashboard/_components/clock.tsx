"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    // initial set
    update();

    // update every second
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span>{time}</span>
  );
}
