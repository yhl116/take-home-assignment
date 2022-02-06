import React, {useState} from "react";
import styles from "./TrackRow.module.css";

function TrackRow({ track, handlePlay }) {
  const [playlist, setPlaylist] = useState();

  const handleSubmit = (track_id) => {
    const requestOptions = {
      method: "update",
      operation: "add",
      playlist_name: playlist,
      track_id: track_id
    };

    const url = `http://localhost:8000/playlists/`;

    fetch(url, requestOptions);
  }

  const handleChange = (event) => {
    setPlaylist(event.target.value);
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
      <form className={styles.addPlaylistInput} onSubmit={() => handleSubmit(track.id)}>
        <label for="createPlaylist">Add to Playlist:</label>
        <input type="text" name="createPlaylist" onChange={handleChange}/>
        <input type="submit" className="createButton" value="Add"/>
      </form>
    </div>
  );
}

export default TrackRow;
