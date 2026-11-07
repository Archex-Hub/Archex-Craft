"use client";

import { useEffect, useRef, useState } from "react";

type MotionViewportProps = {
  children: React.ReactNode | ((motionActive: boolean) => React.ReactNode);
  className: string;
  "aria-label"?: string;
  disableMotionAtSmall?: boolean;
};

export function MotionViewport({
  children,
  className,
  "aria-label": ariaLabel,
  disableMotionAtSmall = false
}: MotionViewportProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const motionActive =
    isVisible && motionAllowed && isDocumentVisible && (!disableMotionAtSmall || !isSmallViewport);

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: no-preference)");
    const smallViewport = window.matchMedia?.("(max-width: 600px)");
    const updatePreference = () => setMotionAllowed(preference?.matches ?? false);
    const updateViewport = () => setIsSmallViewport(smallViewport?.matches ?? false);
    const updateDocumentVisibility = () =>
      setIsDocumentVisible(document.visibilityState === "visible");

    updatePreference();
    updateViewport();
    updateDocumentVisibility();
    preference?.addEventListener("change", updatePreference);
    smallViewport?.addEventListener("change", updateViewport);
    document.addEventListener("visibilitychange", updateDocumentVisibility);

    const element = elementRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return () => {
        preference?.removeEventListener("change", updatePreference);
        smallViewport?.removeEventListener("change", updateViewport);
        document.removeEventListener("visibilitychange", updateDocumentVisibility);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      preference?.removeEventListener("change", updatePreference);
      smallViewport?.removeEventListener("change", updateViewport);
      document.removeEventListener("visibilitychange", updateDocumentVisibility);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className}${motionActive ? " motion-visible" : ""}`}
      aria-label={ariaLabel}
    >
      {typeof children === "function" ? children(motionActive) : children}
    </div>
  );
}
