import React from "react";
import styles from "./PlaylistRow.module.css";
import { NavLink } from "react-router-dom";

function deletePlaylist(playlistName) {
  const requestOptions = {
    method:"delete"
  }
  const url = `http://localhost:8000/playlists/${playlistName}`
  fetch(url, requestOptions)
}

function PlaylistRow({ playlist }) {
  const link = `/playlists/${playlist.name}`;

  return (
    <div className={styles.trackRow}>
      <div className={styles.trackInfo}>
        <NavLink href="#" className={styles.trackTitle} to={link}>
            {playlist.name}
        </NavLink>
      </div>
      <button className={styles.activeButton} onclick={() => deletePlaylist(playlist.name)}>delete</button>
    </div>
  );
}

export default PlaylistRow;
