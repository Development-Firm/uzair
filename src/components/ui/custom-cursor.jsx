"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  

  useEffect(() => {
    const moveCursor = (event) => {
      const { clientX: x, clientY: y } = event;

      // Move the main cursor instantly
      gsap.to(cursorRef.current, { x, y, duration: 0 });

      // Move the follower cursor with a slight delay
      gsap.to(followerRef.current, { x, y, duration: 0.3, ease: "power2.out" });
    };

    // Hover effect for interactive elements
    const handleMouseEnter = () => {
      gsap.to(followerRef.current, { scale: 1.5, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(followerRef.current, { scale: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, .hover-target").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Follower Cursor */}
      <div
        ref={followerRef}
        className="fixed w-10 h-10 border-2 border-cyan-500 rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
      />
    </>
  );
};

export default CustomCursor;
