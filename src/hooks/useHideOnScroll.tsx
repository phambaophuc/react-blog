import { useEffect, useRef } from 'react';

const useHideOnScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prevScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (ref.current) {
        ref.current.style.transform =
          currentScrollY > prevScrollY.current
            ? 'translateY(-200px)'
            : 'translateY(0)';
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return ref;
};

export default useHideOnScroll;
