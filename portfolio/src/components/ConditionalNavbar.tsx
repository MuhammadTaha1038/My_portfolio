"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Do not render the main portfolio navbar on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
