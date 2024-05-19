import axios from "axios";
import { getRandomInt } from "../utils/utils.tsx";
import { SpellObject, FullSpell } from "../types/types.ts";

const spellsUrl = "https://wizard-world-api.herokuapp.com/Spells";

export default function getSpells() {
  return axios.get(spellsUrl).then((res) => {
    const filterSpells: Array<FullSpell> = res.data.filter(
      (spell: SpellObject) => spell.type === "Jinx" || spell.type === "Curse",
    );
    filterSpells.map((spell: FullSpell) => {
      if (spell.type === "Curse") {
        spell.damage = getRandomInt(8, 20);
        spell.mana = getRandomInt(6, 18);
      } else {
        spell.damage = getRandomInt(7, 27);
        spell.mana = getRandomInt(5, 25);
      }
      if (spell.type === "Curse") {
        spell.manaDiapason = "6-18";
        spell.damageDiapason = "8-20";
      } else {
        spell.manaDiapason = "5-25";
        spell.damageDiapason = "7-27";
      }
    });
    return filterSpells;
  });
}
