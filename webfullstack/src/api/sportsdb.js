// src/api/sportsdb.js
const API_KEY = import.meta.env.VITE_SPORTSDB_KEY || "3"; // usa .env se tiver, senão "3"
const BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

async function parseOrThrow(res, friendlyMsg) {
  let text = await res.text();
  try {
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) {
      // Inclui status + pequena parte do corpo pra facilitar debug
      throw new Error(`${friendlyMsg} (HTTP ${res.status})`);
    }
    return json;
  } catch (e) {
    if (!res.ok) throw e;
    // Se o corpo não for JSON válido
    throw new Error(`${friendlyMsg}: resposta inválida da API`);
  }
}

export async function searchTeamsByName(name) {
  const url = `${BASE}/searchteams.php?t=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  const json = await parseOrThrow(res, "Falha ao buscar times");
  return json.teams || []; // a API retorna null quando não encontra
}

export async function searchPlayersByName(name) {
  const url = `${BASE}/searchplayers.php?p=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  const json = await parseOrThrow(res, "Falha ao buscar jogadores");
  return json.player || [];
}
