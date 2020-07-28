const baseUrl = 'http://localhost:5000/';

const commonUrls = {
  auth: `${baseUrl}auth/`,
  decks: `${baseUrl}decks/`
}

export const apiUrls = {
  login: `${commonUrls.auth}login`,
  singUp: `${commonUrls.auth}signup`,
  refreshToken: `${commonUrls.auth}refresh-token`,
  decks: commonUrls.decks,
  studentDecks: `${commonUrls.decks}student`,
  cards: `${baseUrl}cards`,
}
