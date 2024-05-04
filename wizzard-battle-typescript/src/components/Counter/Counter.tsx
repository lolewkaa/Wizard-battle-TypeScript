import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './Counter.module.css';

type Props = {
    onStop: () => void,
}

const Counter: React.FC<Props> = ({ onStop }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const useCountDown = (initialSeconds: number) => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const countDown = () => {
      setSeconds(seconds - 1);
    };

    const runTimer = () => {
      if (seconds === 0) {
        onStop();
        if (
          location.pathname === "/auto-selection"
            || location.pathname === "/manual-selection"
        ) {
          navigate("/battle");
        } else if (location.pathname === "/battle") {
          navigate("/");
          localStorage.removeItem("secondOpponentId");
          localStorage.removeItem("firstOpponentId");
          localStorage.removeItem("isBattleStarted");
        }
        return;
      }
      setTimeout(() => {
        countDown();
      }, 1000);
    };

    useEffect(() => {
      runTimer();
    }, [seconds]);

    return { seconds };
  };

  const { seconds } = useCountDown(5);

  return (
        <h3 className={styles.popup__title}>{seconds}</h3>
  );
};

export default Counter;
