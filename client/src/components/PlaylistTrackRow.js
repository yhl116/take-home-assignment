import React from "react";
import styles from "./PlaylistTrackRow.module.css";
import { useAlert } from 'react-alert';

function PlaylistTrackRow({ track, inputPlaylist, handlePlay, refreshPlaylist }) {
  const alert = useAlert();

  const deleteFromPlaylist = (trackId, playlistName, refreshPlaylist, playlistId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleResponse = (res) => {
      if (!res.ok) {
        alert.show("Unable to remove track from playlist");
      }
    }

    const raw = JSON.stringify({
      "operation": "remove",
      "track_id": trackId,
      "playlist_name": playlistName
    });

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/playlists/p/", requestOptions)
      .then(response => handleResponse(response))
      .then(() => refreshPlaylist(playlistId))
      .catch(error => handleResponse('error', error));
  }

  return (
    <div className={styles.trackRow}>
      <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 12L8 5V19L20 12Z" fill="white" />
        </svg>
      </button>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>
          {track.main_artists.join(", ")}
        </div>
      </div>
      <button className={styles.addPlaylistInput} onClick={() => deleteFromPlaylist(track.id, inputPlaylist.name, refreshPlaylist, inputPlaylist.id)}>Delete</button>
    </div>
    
  );
}

export default PlaylistTrackRow;
