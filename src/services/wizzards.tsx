import axios from "axios";
import { Wizard } from "../types/types.ts";

const wizzardsUrl = "https://wizard-world-api.herokuapp.com/Wizards";

export const getWizzards = () => axios.get(wizzardsUrl).then((res) => res.data);

export const getWizzardById = (id: string) => axios.get<Wizard>(`${wizzardsUrl}/${id}`).then((res) => ({
  id: res.data.id,
  firstName: res.data.firstName,
  lastName: res.data.lastName,
  healthPoints: 200,
  manaPoints: 200,
}));
