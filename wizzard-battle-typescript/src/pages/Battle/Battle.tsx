import React, {
  useEffect, useState, SetStateAction, Dispatch,
} from "react";
import classNames from 'classnames';
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import styles from "./Battle.module.css";
import Card from "../../components/Card/Card.tsx";
import Spell from "../../components/Spell/Spell.tsx";
import PopupWithMessage from "../../components/PopupWithMessage/PopupWithMessage.tsx";
import getSpells from "../../services/spells.tsx";
import { getWizzardById } from "../../services/wizzards.tsx";

type Props = {
  isOpenPopup: boolean,
  setIsBattleStarted: Dispatch<SetStateAction<boolean | void>>,
  setIsOpenPopup: Dispatch<SetStateAction<boolean>>
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

const Battle: React.FC<Props> = ({
  setIsBattleStarted,
  isOpenPopup,
  setIsOpenPopup,
}) => {
  const firstOpponentJson = localStorage.getItem('firstOpponentId');
  const [firstOpponent, setFirstOpponent] = useState({
    id: firstOpponentJson ? JSON.parse(firstOpponentJson) : null,
    firstName: "",
    lastName: "",
    healthPoints: 200,
    manaPoints: 200,
  });

  const secondOpponentJson = localStorage.getItem('secondOpponentId');
  const [secondOpponent, setSecondOpponent] = useState({
    id: secondOpponentJson ? JSON.parse(secondOpponentJson) : null,
    firstName: "",
    lastName: "",
    healthPoints: 200,
    manaPoints: 200,
  });
  const [propsFirstAnimationHealth, setFirstAnimationHealth] = useSpring(
    () => ({ height: 200 }),
  );
  const [propsSecondAnimationHealth, setSecondAnimationHealth] = useSpring(
    () => ({ height: 200 }),
  );
  const [propsFirstAnimationMana, setFirstAnimationMana] = useSpring(() => ({
    height: 200,
  }));
  const [propsSecondAnimationMana, setSecondAnimationMana] = useSpring(() => ({
    height: 200,
  }));
  const [spells, setSpells] = useState([]);
  const [isOpponentMove, setisOpponentMove] = useState("");
  const [firstOpponentSpellsDisabled, setFirstOpponentSpellsDisabled] = useState(true);
  const [secondOpponentSpellsDisabled, setSecondOpponentSpellsDisabled] = useState(true);
  let winnerName = "";

  const location = useLocation();

  function changeOpponentMove() {
    const opponent = Math.floor(Math.random() * 2);
    if (opponent === 0) {
      console.log("ходит первый");
      setisOpponentMove("first");
      setFirstOpponentSpellsDisabled(false);
    } else {
      console.log("ходит второй");
      setisOpponentMove("second");
      setSecondOpponentSpellsDisabled(false);
    }
  }

  useEffect(() => {
    getSpells().then((res) => setSpells(res));
    getWizzardById(firstOpponent.id).then((res) => setFirstOpponent(res));
    getWizzardById(secondOpponent.id).then((res) => setSecondOpponent(res));
    changeOpponentMove();
    if (location.pathname === "/battle") {
      setIsBattleStarted(
        localStorage.setItem("isBattleStarted", JSON.stringify(true)),
      );
    }
  }, []);

  function getFirstOpponentSpell(spell: SpellObject) {
    const health = secondOpponent.healthPoints;
    const spellDamage = spell.damage;
    const mana = firstOpponent.manaPoints;
    const usedMana = spell.mana;
    secondOpponent.healthPoints = health - spellDamage;
    firstOpponent.manaPoints = mana - usedMana;
    setSecondAnimationHealth({ height: secondOpponent.healthPoints });
    setFirstAnimationMana({ height: firstOpponent.manaPoints });
    setisOpponentMove("second");
    setSecondOpponentSpellsDisabled(false);
    setFirstOpponentSpellsDisabled(true);
    if (secondOpponent.healthPoints < 0) {
      secondOpponent.healthPoints = 0;
    }
    if (firstOpponent.manaPoints < 0) {
      firstOpponent.manaPoints = 0;
    }
  }

  function getSecondOpponentSpell(spell: SpellObject) {
    const health = firstOpponent.healthPoints;
    const spellDamage = spell.damage;
    const mana = secondOpponent.manaPoints;
    const usedMana = spell.mana;
    firstOpponent.healthPoints = health - spellDamage;
    secondOpponent.manaPoints = mana - usedMana;
    setFirstAnimationHealth({ height: firstOpponent.healthPoints });
    setSecondAnimationMana({ height: secondOpponent.manaPoints });
    setisOpponentMove("first");
    setFirstOpponentSpellsDisabled(false);
    setSecondOpponentSpellsDisabled(true);
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
        <div className={styles.battle__container}>
        <div className={styles.battle__spells}>
            {spells.map((spell: SpellObject) => (
                  <Spell
                    spellName={spell.name}
                    key={spell.id}
                    disableButton={firstOpponentSpellsDisabled}
                    clickButton={() => getFirstOpponentSpell(spell)}
                    manaDiapason={spell.manaDiapason}
                    damageDiapason={spell.damageDiapason}
                    spellClassName={classNames(styles.spell, {
                      [styles.spell__disable]: firstOpponentSpellsDisabled,
                    })}
                  />
            )).slice(0, 14)}
          </div>
          <div className={styles.battle__box}>
            <Card
              name={firstOpponent.firstName}
              lastName={firstOpponent.lastName}
            />
            <div className={styles.battle__boxPoints}>
              <div className={styles.battle__points}>
            <h2 className={styles.battle__textPoints}>Health</h2>
            <animated.div
              className={styles.battle__healthLine}
              style={propsFirstAnimationHealth}
            >
              {firstOpponent.healthPoints}
            </animated.div>
            </div>
            <div className={styles.battle__points}>
            <h2 className={styles.battle__textPoints}>Mana</h2>
            <animated.div
              className={styles.battle__manaLine}
              style={propsFirstAnimationMana}
            >
              {firstOpponent.manaPoints}
            </animated.div>
            </div>
            </div>
          </div>
        </div>
        <div className={styles.battle__container}>
          <div className={styles.battle__box}>
            <Card
              name={secondOpponent.firstName}
              lastName={secondOpponent.lastName}
            />
            <div className={styles.battle__boxPoints}>
            <div className={styles.battle__points}>
            <h2 className={styles.battle__textPoints}>Health</h2>
            <animated.div
              className={styles.battle__healthLine}
              style={propsSecondAnimationHealth}
            >
              {secondOpponent.healthPoints}
            </animated.div>
            </div>
            <div className={styles.battle__points}>
            <h2 className={styles.battle__textPoints}>Mana</h2>
            <animated.div
              className={styles.battle__manaLine}
              style={propsSecondAnimationMana}
            >
              {secondOpponent.manaPoints}
            </animated.div>
            </div>
            </div>
          </div>
          <div className={styles.battle__spells}>
            {spells.map((spell: SpellObject) => (
                  <Spell
                    spellName={spell.name}
                    key={spell.id}
                    disableButton={secondOpponentSpellsDisabled}
                    clickButton={() => getSecondOpponentSpell(spell)}
                    manaDiapason={spell.manaDiapason}
                    damageDiapason={spell.damageDiapason}
                    spellClassName={classNames(styles.spell, {
                      [styles.spell__disable]: secondOpponentSpellsDisabled,
                    })}
                  />
            )).slice(15, 31)}
          </div>
        </div>
        </div>
      </section>
      {isOpenPopup && (
        <PopupWithMessage
          setIsOpenPopup={setIsOpenPopup}
          text={`Поздравляем, ${winnerName}, вы победили! Перенаправляем вас на главную страницу`}
        ></PopupWithMessage>
      )}
    </>
  );
};

export default Battle;