"use client";

import React from "react";

type YoutubeVideoCardProps = {
  title: string;
  videoId: string;
  href: string;
  sourceLabel: string;
  isLast?: boolean;
};

export default function YoutubeVideoCard({
  title,
  videoId,
  href,
  sourceLabel,
  isLast = false,
}: YoutubeVideoCardProps) {
  return (
    <article
      className={`bg-white px-10 py-5 ${isLast ? "" : "border-b border-gray-200"}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-lg font-semibold text-gray-600 cursor-pointer hover:text-gray-900 hover:underline "
      >
        {title}
      </a>

      <div className="mt-3 aspect-video w-full">
        <iframe
          className="h-full w-full rounded-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">{sourceLabel}</p>
    </article>
  );
}
