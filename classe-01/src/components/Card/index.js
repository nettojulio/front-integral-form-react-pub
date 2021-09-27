import React from "react";
import getAlbumCover from "../../utils/getAlbumCover";
import getArtistsNames from "../../utils/getArtistsNames";
import './style.css';
import like from "../../assets/like.svg";
import inactiveLike from "../../assets/inactive-like.svg";

function Card({ track }) {
  const { name, album, external_urls, artists, explicit, id } = track;
  const [click, setClick] = React.useState(false);

  return (
    <div id={id} className="card">
      <a href={external_urls.spotify} target="_blank">
        <img src={getAlbumCover(album)} alt={`${name} album cover`} />
      </a>
      <p>{explicit ? '🔞' : '     '}</p>
      <b>{name}</b>- {getArtistsNames(artists)}
      <img onClick={() => setClick(!click)} src={click ? like : inactiveLike} className="like" alt="Like" />
    </div>
  );
}

export default Card;
