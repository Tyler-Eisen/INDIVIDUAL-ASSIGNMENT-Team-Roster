import axios from 'axios';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
// TODO: DELETE Player
const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const viewPlayerDetails = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// const createPlayer = (payload) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/players.json`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${endpoint}/players.json`, playerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${endpoint}/players/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updatePlayer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export {
  getPlayers,
  deletePlayer,
  viewPlayerDetails,
  getSinglePlayer,
  createPlayer,
  updatePlayer,
};
