import { useEffect, useRef } from 'react';

interface useObserverProps {
  threshold?: number;
}

const useObserver = <T extends Element>(props: useObserverProps) => {
  const threshold = props?.threshold || 1;
  const observerRef = useRef<T | null>(null);

  useEffect(() => {
    const observerEl = observerRef.current;
    if (!observerEl) return;

    const handleShow = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleShow, { threshold });

    observer.observe(observerEl);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return observerRef;
};

export default useObserver;
