import { useEffect, useState, type JSX } from "react";

interface DelayProps {
  ms: number;
  children: React.ReactNode;
}

const Delay = ({ ms, children }: DelayProps): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, ms);

    return () => clearTimeout(timer);
  }, [ms]);

  return isVisible ? <>{children}</> : null;
};

export default Delay;
