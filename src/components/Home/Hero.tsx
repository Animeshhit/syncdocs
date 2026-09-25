"use client";

import { Clock3 } from "lucide-react";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import React from "react";

function getTrumanGreeting() {
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning!";
  } else if (currentHour === 12) {
    greeting = "Good noon!";
  } else if (currentHour > 12 && currentHour < 17) {
    greeting = "Good afternoon!";
  } else if (currentHour >= 17 && currentHour < 22) {
    greeting = "Good night!"; // Traditional movie catchphrase element
  } else {
    greeting = "Hey night owl!";
  }

  // The legendary Truman catchphrase wrap-around
  return `${greeting}`;
}

function Hero() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 3600000); // every hour
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-900">
        <Clock3 className="size-3.5" />
        <span>{format(now, "dd MMMM,eeee ")}</span>
      </div>
      <h1 className="max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-gray-300 sm:text-6xl">
        {getTrumanGreeting()},{" "}
        {!isLoaded ? "🤔" : !isSignedIn ? "there" : (user.firstName ?? "there")}
        .
      </h1>
    </>
  );
}

export default React.memo(Hero);
