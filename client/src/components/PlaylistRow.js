import React from "react";
import styles from "./PlaylistRow.module.css";
import { NavLink } from "react-router-dom";

function deletePlaylist(playlistId, callback) {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  const url = `http://localhost:8000/playlists/${playlistId}`
  
  fetch(url, requestOptions)
    .then(response => response.text())
    .then(() => callback())
    .catch(error => console.log('error', error));
}

function PlaylistRow({ playlist, refreshPlaylists }) {
  const link = `/playlists/${playlist.id}`;

  return (
    <div className={styles.trackRow}>
      <div className={styles.trackInfo}>
        <NavLink href="#" className={styles.trackTitle} to={link}>
            {playlist.name}
        </NavLink>
      </div>
      {/* <button className={styles.activeButton} onClick={() => printStuff(refresh, fetchPlaylists)}>delete</button> */}
      <button className={styles.activeButton} onClick={() => deletePlaylist(playlist.id, refreshPlaylists)}>delete</button>
    </div>
  );
}

export default PlaylistRow;
