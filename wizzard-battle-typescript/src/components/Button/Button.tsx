import React from 'react';

type Props = {
    text: string,
    clickButton: () => void,
    buttonStyle: string
  }

const Button: React.FC<Props> = ({ text, clickButton, buttonStyle }) => (
    <button
            className={buttonStyle}
            onClick={clickButton}
          >
            {text}
          </button>
);

export default Button;
