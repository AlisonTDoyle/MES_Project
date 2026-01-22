"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";

export function ReturnToHomeButton() {
  const pathname = usePathname();
  const isDisabled = pathname === "/factory-overview";

  if (isDisabled) {
    return (
      <span className="btn btn-soft btn-disabled cursor-not-allowed mb-2">
        <HomeIcon className="h-4 w-4"></HomeIcon>
        Return Home
      </span>
    );
  }

  return (
    <Link
      href="/factory-overview"
      className="btn btn-soft btn-primary mb-2"
    >
      <HomeIcon className="h-4 w-4"></HomeIcon>
      Return Home
    </Link>
  );
}
