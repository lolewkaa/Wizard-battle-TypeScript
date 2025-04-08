import React, { ReactNode } from "react";
import { useSpring, animated } from "react-spring";
import classNames from "classnames";
import styles from "./Button.module.css";

type PropsButton = {
  text: string;
  clickButton: () => void;
  buttonStyle: string;
  disabled: boolean;
  children: ReactNode;
  type: "submit" | "reset" | "button";
};

const Button: React.FC<Partial<PropsButton>> = ({
  text,
  clickButton,
  buttonStyle,
  disabled,
  children,
  type,
}) => {
  const [propsAnimationHover, setAnimationHover] = useSpring(() => ({
    opacity: 1,
  }));

  function onEnter() {
    setAnimationHover({ opacity: 0.3 });
  }

  function onLeave() {
    setAnimationHover({ opacity: 1 });
  }
  return (
    <animated.button
      className={classNames(buttonStyle, styles.button)}
      style={propsAnimationHover}
      onClick={clickButton}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      disabled={disabled}
      type={type}
    >
      {text}
      {children}
    </animated.button>
  );
};

export default Button;
