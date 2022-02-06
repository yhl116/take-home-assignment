import React from "react";
import styles from "./PlaylistTrackRow.module.css";

function PlaylistTrackRow({ track, handlePlay, input_playlist }) {

  const deleteFromPlaylist = (track_id, playlist_name) => {
    const requestOptions = {
      method: "update",
      operation: "delete",
      playlist_name: playlist_name,
      track_id: track_id
    };

    const url = `http://localhost:8000/playlists/`;

    fetch(url, requestOptions);
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
      <button className={styles.activaButton} onClick={() => deleteFromPlaylist(track.id, input_playlist)}>Delete</button>
    </div>
    
  );
}

export default PlaylistTrackRow;
