import axios from 'axios';

const wizzardsUrl = 'https://wizard-world-api.herokuapp.com/Wizards';

// interface Wizard {
//   id: string,
//   firstName: string,
//   lastName: string,
//   healthPoints: number,
//   manaPoints: number,
// }

export const getWizzards = () => axios.get(wizzardsUrl).then((res) => res.data);

export const getWizzardById = (id: string) => axios.get(`${wizzardsUrl}/${id}`).then((res) => ({
  id: res.data.id,
  firstName: res.data.firstName,
  lastName: res.data.lastName,
  healthPoints: 200,
  manaPoints: 200,
}));
