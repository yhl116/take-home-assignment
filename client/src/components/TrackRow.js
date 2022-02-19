import React, {useState} from "react";
import styles from "./TrackRow.module.css";

function TrackRow({ track, handlePlay }) {
  const [inputPlaylist, setInputPlaylist] = useState();

  const handleSubmit = (track_id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "operation": "add",
      "track_id": track_id,
      "playlist_name": inputPlaylist
    });

    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/playlists/p/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const handleChange = (event) => {
    setInputPlaylist(event.target.value);
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
      <div className={styles.addPlaylistInput}>
        <label>Add to Playlist:</label>
        <input type="text" name="createPlaylist" onChange={handleChange}/>
        <button className="createButton" onClick={() => handleSubmit(track.id)}>Add</button>
      </div>
    </div>
  );
}

export default TrackRow;
