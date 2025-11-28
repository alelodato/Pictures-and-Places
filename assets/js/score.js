// score.js

const PICTURES_SCORES_KEY = 'pictures-and-places-scores';

function readScores() {
  const raw = localStorage.getItem(PICTURES_SCORES_KEY);
  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Errore nel parsing dei punteggi:', e);
    return [];
  }
}

function writeScores(scores) {
  localStorage.setItem(PICTURES_SCORES_KEY, JSON.stringify(scores));
}

/**
 * Aggiunge un nuovo punteggio
 * @param {string} name - nome del giocatore
 * @param {number} score - punteggio finale
 */
function saveScore(name, score) {
  const scores = readScores();

  const newEntry = {
    name: name,
    score: score,
    date: new Date().toISOString(),
  };

  scores.push(newEntry);
  writeScores(scores);
}

/**
 * Ritorna la classifica ordinata per punteggio decrescente.
 * @param {number} limit - quanti risultati mostrare (opzionale)
 */
function getLeaderboard(limit) {
  const scores = readScores().sort(function (a, b) {
    return b.score - a.score;
  });

  if (typeof limit === 'number') {
    return scores.slice(0, limit);
  }

  return scores;
}

/**
 * Opzionale: cancella tutti i punteggi (per test)
 */
function resetScores() {
  writeScores([]);
}
