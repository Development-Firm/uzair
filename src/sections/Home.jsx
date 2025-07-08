"use client";

import StarsCanvas from "@/components/3d/stars";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Tiles from "@/components/tiles";
import { animationData, chartsData, productsData } from "@/lib/data";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedModel } from "@/lib/store/features/general/generalSlice";
import { setCurrentDataVisualization } from "@/lib/store/features/data-visualization/dataVisualizationSlice";
import OurMission from "@/components/devfum-motto";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home = () => {
  const [active, setActive] = useState("home");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const sections = {
    home: useRef(null),
    configurator: useRef(null),
    visualization: useRef(null),
    animation: useRef(null),
    mission: useRef(null),
    contact: useRef(null),
  };

  const handleClick = (item) => {
    dispatch(setSelectedModel(item?.modelKey));
    router.push("/configurator");
  };

  const handleVisualizationClick = (item) => {
    dispatch(setCurrentDataVisualization(item?.chartName));
    router.push("/data-visualization");
  };

  const handleAnimationCardClick = (item) => {
    router.push(item?.link);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    Object.values(sections).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="relative z-0 pb-10 bg-primary bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/backgrounds/bg-2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Navbar active={active} setActive={setActive} />
      <div id="home" ref={sections.home} className="mx-auto">
        <Hero />
      </div>
      <div className="relative h-full border-transparent pt-[0.5rem]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%)",
          }}
        ></div>

        <div className="mx-auto max-w-5xl z-20 relative px-8 md:px-0">
          <div className="relative">
            <div
              className="absolute inset-0 bg-contain bg-bottom bg-no-repeat brightness-50"
              style={{
                backgroundImage:
                  "url('/assets/images/backgrounds/vr-headset-man.png')",
              }}
            ></div>
            <motion.div
              id="configurator"
              ref={sections.configurator}
              className="mt-16 md:mt-40"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
            >
              <Tiles
                title="3D Product Configurator"
                handleClick={handleClick}
                data={productsData}
              />
            </motion.div>

            <motion.div
              id="visualization"
              ref={sections.visualization}
              className="mt-16 md:mt-40"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <Tiles
                title="Data Visualization"
                data={chartsData}
                handleClick={handleVisualizationClick}
              />
            </motion.div>
          </div>

          <motion.div
            id="animation"
            ref={sections.animation}
            className="mt-16 md:mt-40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <Tiles
              title="3D and Animation Sites"
              handleClick={handleAnimationCardClick}
              data={animationData}
            />
          </motion.div>
          <motion.div
              id="mission"
              ref={sections.mission}
              className="mt-16 md:mt-40"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <OurMission />
            </motion.div>
          <div className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
              style={{
                backgroundImage: "url('/assets/images/backgrounds/bg-1.png')",
              }}
            ></div>
        
            <motion.div
              id="contact"
              ref={sections.contact}
              className="mt-16 md:mt-28"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <Contact />
            </motion.div>
          </div>
        </div>
      </div>
      <StarsCanvas />
    </div>
  );
};

export default Home;
