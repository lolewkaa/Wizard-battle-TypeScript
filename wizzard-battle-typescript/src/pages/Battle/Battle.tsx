import React, {
  useEffect, useState,
} from "react";
import classNames from 'classnames';
// import { useLocation } from "react-router-dom";
import styles from "./Battle.module.css";
// import PopupWithMessage from "../../components/PopupWithMessage/PopupWithMessage.tsx";
import PopupWithRedirect from "../../components/PopupWithRedirect/PopupWithRedirect.tsx";
import getSpells from "../../services/spells.tsx";
import { getWizzardById } from "../../services/wizzards.tsx";
import BattleCard from "../../components/BattleCard/BattleCard.tsx";
import useLocalStorage from "../../hooks/useLocalStorage.tsx";

type Props = {
  isOpenPopup: boolean,
  // eslint-disable-next-line no-unused-vars
  setIsOpenPopup: (arg: boolean) => void
}

type SpellObject = {
  id: string,
  name: string,
  incantation: string,
  effect: string,
  canBeVerbal: boolean,
  type: string,
  light: string,
  creator: null,
  damage: number,
  mana: number,
  manaDiapason: string,
  damageDiapason: string
}

const initialOpponentTurn = Math.floor(Math.random() * 2) ? "first" : "second";

const Battle: React.FC<Props> = ({
  isOpenPopup,
  setIsOpenPopup,
}) => {
  const [firstOpponent, setFirstOpponent] = useLocalStorage('firstOpponent', null);
  const [secondOpponent, setSecondOpponent] = useLocalStorage('secondOpponent', null);

  const [spells, setSpells] = useState([]);
  const [isOpponentMove, setisOpponentMove] = useState(initialOpponentTurn);

  let winnerName = "";

  // const location = useLocation();

  useEffect(() => {
    getSpells().then((res) => {
      let arrLength: number = res.length;
      if (arrLength > 20) {
        arrLength = 20;
      }
      setSpells(res.slice(0, arrLength));
    });
    getWizzardById(firstOpponent.id).then((res) => setFirstOpponent(res));
    getWizzardById(secondOpponent.id).then((res) => setSecondOpponent(res));
    // if (location.pathname === "/battle") {
    //   setIsBattleStarted(
    //     localStorage.setItem("isBattleStarted", JSON.stringify(true)),
    //   );
    // }
  }, []);

  function getFirstOpponentSpell(spell: SpellObject) {
    const health: number = secondOpponent.healthPoints;
    const spellDamage: number = spell.damage;
    const mana: number = firstOpponent.manaPoints;
    const usedMana: number = spell.mana;
    secondOpponent.healthPoints = health - spellDamage;
    firstOpponent.manaPoints = mana - usedMana;
    setisOpponentMove("second");
    if (secondOpponent.healthPoints < 0) {
      secondOpponent.healthPoints = 0;
    }
    if (firstOpponent.manaPoints < 0) {
      firstOpponent.manaPoints = 0;
    }
  }

  function getSecondOpponentSpell(spell: SpellObject) {
    const health: number = firstOpponent.healthPoints;
    const spellDamage: number = spell.damage;
    const mana: number = secondOpponent.manaPoints;
    const usedMana: number = spell.mana;
    firstOpponent.healthPoints = health - spellDamage;
    secondOpponent.manaPoints = mana - usedMana;
    setisOpponentMove("first");
    if (firstOpponent.healthPoints < 0) {
      firstOpponent.healthPoints = 0;
    }
    if (secondOpponent.manaPoints < 0) {
      secondOpponent.manaPoints = 0;
    }
  }

  function showWinner() {
    if (secondOpponent.manaPoints <= 0) {
      if (firstOpponent.firstName === null) {
        firstOpponent.firstName = "";
      }
      setIsOpenPopup(true);
      winnerName = `${firstOpponent.firstName} ${firstOpponent.lastName}`;
    } else if (firstOpponent.manaPoints <= 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = "";
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    } else if (firstOpponent.healthPoints <= 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = "";
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    } else if (secondOpponent.healthPoints <= 0) {
      if (firstOpponent.firstName === null) {
        firstOpponent.firstName = "";
      }
      setIsOpenPopup(true);
      winnerName = `${firstOpponent.firstName} ${firstOpponent.lastName}`;
    }
  }
  showWinner();
  const closePopup = () => setIsOpenPopup(false);
  return (
    <>
      <section className={styles.battle}>
        <div className={styles.battle__textBox}>
        <h1
            className={classNames(styles.battle__text, {
              [styles.disable]: isOpponentMove === "first",
            })}
          >
            Your turn
          </h1>
          <h1
            className={classNames(styles.battle__text, {
              [styles.disable]: isOpponentMove === "second",
            })}
          >
            Your turn
          </h1>
        </div>
        <div className={styles.battle__containers}>
            <BattleCard
              opponentData={firstOpponent}
              spells={spells}
              useSpell={getFirstOpponentSpell}
              isOpponentTurn={isOpponentMove === 'second'}
            />
            <BattleCard
              opponentData={secondOpponent}
              spells={spells}
              useSpell={getSecondOpponentSpell}
              isOpponentTurn={isOpponentMove === 'first'}
            />
        </div>
      </section>
      {isOpenPopup && (
        <PopupWithRedirect
          onClose={closePopup}
          message={`Поздравляем, ${winnerName}, вы победили! Перенаправляем вас на главную страницу`}
        />
      )}
      {/* {isOpenPopup && (
        <PopupWithMessage
          setIsOpenPopup={setIsOpenPopup}
          text={`Поздравляем, ${winnerName}, вы победили! Перенаправляем вас на главную страницу`}
        ></PopupWithMessage>
      )} */}
    </>
  );
};

export default Battle;
