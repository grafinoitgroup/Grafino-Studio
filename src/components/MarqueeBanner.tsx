interface MarqueeBannerProps {
  phrase?: string;
}

export function MarqueeBanner({ phrase = "LET'S CONNECT, LET'S BUILD" }: MarqueeBannerProps) {
  const items = Array.from({ length: 8 }, (_, idx) => idx);

  return (
    <div
      className="overflow-hidden border-b border-[#E5E7EB] dark:border-[#262626] bg-[#F4F4F5] dark:bg-[#0C0C0C] py-3.5 select-none"
      aria-hidden="true"
    >
      <div className="animate-marquee items-center">
        {[0, 1].map((loop) => (
          <div key={loop} className="flex items-center shrink-0">
            {items.map((idx) => (
              <div key={`${loop}-${idx}`} className="flex items-center shrink-0">
                <span className="font-mono-tech text-xs font-semibold text-[#0A0A0A] dark:text-white px-6 whitespace-nowrap">
                  {phrase}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#EE7104] shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
