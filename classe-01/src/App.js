import React, { useState } from "react";
import "./index.css";
import getSpotifyToken from "./utils/getSpotifyToken";
import Card from "./components/Card";
import Button from "./components/SearchButton";

const baseURL = (pesquisa) =>
  `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=50`;

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [tracks, setTracks] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState("");
  const [results, setResults] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!pesquisa) return;

    setErros("")
    setCarregando(true);
    setResults(false);

    try {
      const token = await getSpotifyToken();

      const response = await fetch(baseURL(pesquisa), {
        headers: {
          Authorization: token
        }
      });

      const { tracks } = await response.json();

      setTracks(tracks.items);
      console.log(tracks.items);

    } catch (error) {
      setTracks([]);
      setErros(error.message);
    }

    setCarregando(false);
    setResults(true);

  }

  return (
    <div className="App">
      <header class="header">
        <h1>Cubosfy</h1>
        <h6>A Search API powered by:</h6>
        <img class="logo-1" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Spotify Logo" />
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <Button>Buscar</Button>
      </form>
      {carregando && <span className="loading">Carregando ...</span>}
      {erros && <span className="failure">{erros}</span>}
      {(tracks.length === 0) && <span className="empty">{results ? "Sem resultados" : ""}</span>}
      {tracks.map((track) => (
        <Card key={track.id} track={track} />
      ))}
    </div>
  );
}

export default App;
