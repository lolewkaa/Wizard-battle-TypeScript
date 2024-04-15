import React from 'react';

export default function Spell({
  damageDiapason,
  manaDiapason,
  spellName,
  disableButton,
  clickButton,
  spellClassName,
}) {
  return (
    <><button
      onClick={clickButton}
      disabled={disableButton}
      className={spellClassName}
    >
      {spellName}<br/>
      Урон:
      {damageDiapason}<br/>
      Мана: {manaDiapason}
    </button>
    </>
  );
}
