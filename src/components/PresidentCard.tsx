import React, { JSX } from "react";

import Image from "next/image";

import { President } from "@/lib/types";

import { TfiCrown } from "react-icons/tfi";
import { FaTwitch, FaInstagram, FaYoutube } from "react-icons/fa";

interface PresidentCardProps {
  president: President;
  children?: React.ReactNode;
}

const socialIcons: Record<string, JSX.Element> = {
  instagram: <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />,
  twitch: <FaTwitch className="h-4 w-4 sm:h-5 sm:w-5" />,
  youtube: <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5" />,
};

export default function PresidentCard({
  president,
  children,
}: PresidentCardProps) {
  return (
    <div className="group flex min-h-[30px] w-full flex-col items-center justify-between space-y-6 rounded-md border border-neutral-600 p-4 transition-colors duration-300 hover:border-yellow-500">
      <Image
        src={president.photo}
        alt={president.name}
        width={400}
        height={400}
        className="rounded-md border border-neutral-600 transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col items-center gap-3 text-sm sm:text-lg">
        <span className="flex items-center gap-2">
          <TfiCrown className="hidden h-4 w-4 text-yellow-500 sm:flex" />
          {president.name}
        </span>
        <div className="flex w-full justify-evenly">
          {president.social_links &&
            Object.entries(president.social_links).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {socialIcons[platform]}
              </a>
            ))}
        </div>
        {children && (
          <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
