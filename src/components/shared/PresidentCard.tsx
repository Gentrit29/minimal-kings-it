import React, { JSX } from "react";

import Image from "next/image";

import { President } from "@/lib/types";

import { FaTwitch, FaInstagram, FaYoutube } from "react-icons/fa";

import { Crown } from "lucide-react";

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
    <div className="group border-border hover:border-ring bg-card text-card-foreground flex max-h-[450px] w-full flex-col items-center justify-between space-y-6 rounded-md border p-4 transition-colors duration-300">
      <div className="border-border relative rounded-md border transition-transform duration-300 group-hover:scale-105">
        {president.photo && (
          <Image
            src={`${president.photo}#t=${Date.now()}`}
            alt={president.name}
            width={400}
            height={400}
          />
        )}
        {president.teams?.[0] && (
          <Image
            src={president.teams[0].logo}
            alt={president.teams[0].name}
            width={50}
            height={50}
            className="absolute top-0 right-0"
          />
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-3 text-sm sm:text-lg">
        <h2 className="flex items-center gap-2 text-center">
          <Crown className="text-primary hidden sm:flex" />
          {president.name}
        </h2>
        <div className="flex w-full items-center justify-center gap-4">
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
          <div className="mt-2 flex flex-row items-center gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
