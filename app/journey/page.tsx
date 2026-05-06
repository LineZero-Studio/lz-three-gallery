'use client'
import dynamic from "next/dynamic";
import React, { useRef } from 'react';
import { useScroll } from "framer-motion";

const Scene = dynamic(() => import('@/components/journey/Scene'), {
  ssr: false,
})

export default function Journey() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <main className="bg-gradient-to-b from-sky-200 via-blue-300 to-sky-400">
      <div ref={container} className="h-[500vh]">
        <div className="sticky top-0 w-full h-screen">
          <Scene scrollProgress={scrollYProgress} />
        </div>
      </div>
    </main>
  );
}
