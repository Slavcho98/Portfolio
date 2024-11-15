import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const bounceTransition = {
  type: "spring",
  bounce: 0.27,
};

const useAnimationVariants = () => {
  return useMemo(() => {
    const sharedTransition = {
      ...bounceTransition,
      ease: "easeOut",
    };

    return {
      left: {
        hidden: { x: "-100vw" },
        visible: {
          x: "0",
          transition: {
            ...sharedTransition,
            duration: 1.5,
          },
        },
        bounce: {
          x: [0, 5, -5, 0],
          transition: {
            duration: 1.6,
            ...sharedTransition,
          },
        },
      },
      right: {
        hidden: { x: "100vw" },
        visible: {
          x: 0,
          transition: {
            ...sharedTransition,
            duration: 1.6,
          },
        },
        bounce: {
          x: [0, 5, -5, 0],
          transition: {
            duration: 1.6,
            ...sharedTransition,
          },
        },
      },
    };
  }, []);
};

export function useSlideAnimation() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    },
    []
  );

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.4,
    });

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, [handleIntersect]);

  const animationVariants = useAnimationVariants();

  return {
    isVisible,
    sectionRef,
    animationVariantsLeft: animationVariants.left,
    animationVariantsRight: animationVariants.right,
  };
}
