import React from 'react';
import Button from '../ui/Button/Button.tsx';

type Props = {
    damageDiapason: string,
    manaDiapason: string,
    spellName: string,
    disableButton: boolean,
    clickButton: () => void,
    spellClassName: string
}

const Spell: React.FC<Props> = ({
  damageDiapason,
  manaDiapason,
  spellName,
  disableButton,
  clickButton,
  spellClassName,
}) => (

  <Button
      clickButton={clickButton}
      disabled={disableButton}
      buttonStyle={spellClassName}
    >
      {spellName}<br/>
      Урон:
      {damageDiapason}<br/>
      Мана: {manaDiapason}
    </Button>
    // <><button
    //   onClick={clickButton}
    //   disabled={disableButton}
    //   className={spellClassName}
    // >
    //   {spellName}<br/>
    //   Урон:
    //   {damageDiapason}<br/>
    //   Мана: {manaDiapason}
    // </button>
    // </>
);

export default Spell;
