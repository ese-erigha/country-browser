import React, { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import { SCROLL_POSITION_THRESHOLD } from '../constants';

const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > SCROLL_POSITION_THRESHOLD) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= SCROLL_POSITION_THRESHOLD) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    window.addEventListener('scroll', throttle(checkScrollTop, 500));
    return () => window.removeEventListener('scroll', checkScrollTop);
  });

  const buttonClasses = classNames({
    backToTop: true,
    hide: !showScroll,
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={buttonClasses} tabIndex={0} role="button" onClick={scrollToTop} id="backToTop">
      &#9650;
    </div>
  );
};
export default BackToTop;
