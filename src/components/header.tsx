"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { FiMenu, FiX } from "react-icons/fi";
import { nav } from "@/src/_mock/nav";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        height: "100vh",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.fromTo(
        iconRef.current,
        { rotate: 0 },
        { rotate: 180, duration: 0.3 },
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.3,
      });
    }
  }, [isOpen]);

  return (
    <header className="fixed w-full bg-background text-foreground z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1>ShahinDev</h1>

        <nav className="hidden md:flex gap-8 text-lg">
          {nav.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="hover:opacity-70 transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-3xl relative z-50"
        >
          <div ref={iconRef}>{isOpen ? <FiX /> : <FiMenu />}</div>
        </button>
      </div>

      <div
        ref={menuRef}
        className="md:hidden overflow-hidden h-0 opacity-0 bg-background"
      >
        <div className="flex flex-col items-center justify-center gap-8 text-2xl mt-20">
          {nav.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="hover:opacity-70 transition"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
