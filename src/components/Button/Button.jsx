import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function Button({ text, clickButton, buttonStyle }) {
  const [btnAni, setBtnAni] = useSpring(
    () => ({ opacity: 1 }),
  );

  function buttonOver() {
    setBtnAni({ opacity: 0.5 });
  }

  function buttonOut() {
    setBtnAni({ opacity: 1 });
  }
  return (
    <>
    <animated.button
            className={buttonStyle}
            style={btnAni}
            onClick={clickButton}
            onMouseOver={buttonOver}
            onMouseOut={buttonOut}
          >
            {text}
          </animated.button>
    </>
  );
}
