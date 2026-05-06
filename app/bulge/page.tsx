'use client'
import dynamic from "next/dynamic";
import React, { useRef } from 'react';
import { useScroll } from "framer-motion";
const Scene = dynamic(() => import('@/components/bulge/Scene'), {
  ssr: false,
})

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <main>
      <div ref={container} className="h-[300vh]">
        <div className="sticky top-0 w-[calc(100vw - 100px)] h-[calc(100vh - 100px])">
          <h1 className="text-4xl font-bold">Scroll down</h1>
          <Scene scrollProgress={scrollYProgress}/>
        </div>
      </div>
      <div className="h-screen"></div>
    </main>
  );
}
