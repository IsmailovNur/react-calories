import axios from 'axios';

const mealEndpoint = axios.create({
  baseURL: 'https://js-31-nurisma-default-rtdb.europe-west1.firebasedatabase.app/',
});
