export type SpellObject = {
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

  type SpellWithManaDamage = {
    damage: number;
    mana: number;
    manaDiapason: string;
    damageDiapason: string;
  };

export interface Wizard {
    id: string;
    firstName: string;
    lastName: string;
    healthPoints: number;
    manaPoints: number;
  }

export type FullSpell = SpellObject & SpellWithManaDamage;

export type WizardObject = {
    id: string;
    firstName: string;
    lastName: string;
  };

export type Opponent = {
    id: string;
    firstName: string;
    lastName: string;
    healthPoints: number;
    manaPoints: number;
  };
