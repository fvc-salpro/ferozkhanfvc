"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const preferReduceMotion = usePrefersReducedMotion();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      if (preferReduceMotion) {
        gsap.set(container.current, { y: 0 });
      } else {
        gsap.fromTo(
          container.current,
          { y: 100, opacity: 0, },
          {
            opacity: 1,
            y: 0,
            ease: "power2.inOut",
            duration: 0.5,
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom-=20%",
              toggleActions: "play pause resume reverse",
            },
          }
        );
      }
    },
    { scope: container }
  );

  return <div ref={container}>{children}</div>;
}
