"use client";

import React from "react";
import { footerSections, socialLinks } from "@/src/_mock/footer";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap border-b border-foreground/20 pb-12">
          <div className="w-full sm:w-1/2 md:w-1/5 mb-10 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">ShahinDev</h2>
            <p className="text-sm leading-relaxed pr-4 opacity-80">
              Building modern web applications with performance, scalability,
              and beautiful UI/UX experiences.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div
              key={index}
              className="w-1/2 md:w-1/5 mb-10 md:mb-0 flex justify-center items-center flex-col"
            >
              <h2 className="font-semibold mb-4">{section.title}</h2>

              <ul className="space-y-3 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:opacity-70 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="w-1/2 md:w-1/5 flex justify-center items-center flex-col">
            <h2 className="font-semibold mb-4">Connect</h2>

            <div className="flex gap-4 text-xl">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.href}
                    className="hover:opacity-70 transition"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm opacity-60">
          © {new Date().getFullYear()} ShahinDev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
