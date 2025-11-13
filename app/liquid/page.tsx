'use client'
import dynamic from "next/dynamic";
import React, { useRef } from 'react';
import { useScroll } from "framer-motion";
const Scene = dynamic(() => import('@/components/liquid/Scene'), {
  ssr: false,
})

export default function LiquidPage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <main className="bg-black">
      <div ref={container} className="h-[300vh]">
        <div className="sticky top-0 w-[calc(100vw - 100px)] h-[calc(100vh - 100px)]">
          <h1 className="text-4xl font-bold text-white mb-4">Liquid Topography</h1>
          <Scene scrollProgress={scrollYProgress}/>
        </div>
      </div>
      <div className="h-screen"></div>
    </main>
  );
}

