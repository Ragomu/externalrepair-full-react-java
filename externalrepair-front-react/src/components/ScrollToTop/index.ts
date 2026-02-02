import { useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

const ScrollToTop = ({ children }: any) => {
  const { urlPathname } = usePageContext();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [urlPathname]);

  return children;
};

export default ScrollToTop;
