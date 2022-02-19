import React from "react";
import styles from "./PlaylistRow.module.css";
import { NavLink } from "react-router-dom";
import { useAlert } from 'react-alert';

function PlaylistRow({ playlist, refreshPlaylists }) {
  const link = `/playlists/${playlist.id}`;
  const alert = useAlert();

  const handleResponse = (res) => {
    if (!res.ok) {
      alert.show("Unable to delete playlist");
    }
  }

  const deletePlaylist = (playlistId, refreshPlaylists) => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    const url = `http://localhost:8000/playlists/${playlistId}`

    fetch(url, requestOptions)
      .then(result => handleResponse(result))
      .then(() => refreshPlaylists())
      .catch(() => alert.show("Unable to delete to playlist"));
  }

  return (
    <div className={styles.trackRow}>
      <div className={styles.trackInfo}>
        <NavLink href="#" className={styles.trackTitle} to={link}>
          {playlist.name}
        </NavLink>
      </div>
      <button className={styles.activeButton} onClick={() => deletePlaylist(playlist.id, refreshPlaylists)}>delete</button>
    </div>
  );
}

export default PlaylistRow;
