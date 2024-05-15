import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useSpring, animated } from "react-spring";
import styles from "./BattleCard.module.css";
import Card from "../Card/Card.tsx";
import Spell from "../Spell/Spell.tsx";

type Opponent = {
  id: string;
  firstName: string;
  lastName: string;
  healthPoints: number;
  manaPoints: number;
};
type SpellObject = {
  id: string;
  name: string;
  incantation: string;
  effect: string;
  canBeVerbal: boolean;
  type: string;
  light: string;
  creator: null;
  damage: number;
  mana: number;
  manaDiapason: string;
  damageDiapason: string;
};

type PropsBattleCard = {
  spells: Array<SpellObject>;
  opponentData: Opponent;
  isOpponentTurn: boolean;
  // eslint-disable-next-line no-unused-vars
  useSpell: (spell: SpellObject) => void;
};
const BattleCard: React.FC<PropsBattleCard> = ({
  spells,
  opponentData,
  isOpponentTurn,
  useSpell,
}) => {
  const [opponentSpellsDisabled, setOpponentSpellsDisabled] = useState<boolean>(true);

  const [propsAnimationHealth, setAnimationHealth] = useSpring(() => ({
    height: 200,
  }));
  const [propsAnimationMana, setAnimationMana] = useSpring(() => ({
    height: 200,
  }));

  useEffect(() => {
    setOpponentSpellsDisabled(isOpponentTurn);
  }, [isOpponentTurn]);

  useEffect(() => {
    setAnimationHealth({ height: opponentData.healthPoints });
  }, [opponentData.healthPoints]);

  useEffect(() => {
    setAnimationMana({ height: opponentData.manaPoints });
  }, [opponentData.manaPoints]);

  return (
    <div className={styles.battle__container}>
      <div className={styles.battle__box}>
        <Card name={opponentData.firstName} lastName={opponentData.lastName} />
        <div className={styles.battle__boxPoints}>
          <div className={styles.battle__points}>
            <h2 className={styles.battle__textPoints}>Health</h2>
            <animated.div
              className={styles.battle__healthLine}
              style={propsAnimationHealth}
            >
              {opponentData.healthPoints}
            </animated.div>
          </div>
          <div className={styles.battle__points}>
            <h2 className={styles.battle__textPoints}>Mana</h2>
            <animated.div
              className={styles.battle__manaLine}
              style={propsAnimationMana}
            >
              {opponentData.manaPoints}
            </animated.div>
          </div>
        </div>
      </div>
      <div className={styles.battle__spells}>
        {spells?.map((spell: SpellObject) => (
          <Spell
            spellName={spell.name}
            key={spell.id}
            disableButton={opponentSpellsDisabled}
            clickButton={() => useSpell(spell)}
            manaDiapason={spell.manaDiapason}
            damageDiapason={spell.damageDiapason}
            spellClassName={classNames(styles.spell, {
              [styles.spell__disable]: opponentSpellsDisabled,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default BattleCard;
