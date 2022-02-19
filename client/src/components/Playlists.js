import React, { useState, useEffect } from "react";
import PlaylistRow from "./PlaylistRow";
import styles from "./Playlists.module.css";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = () => {
    fetch("http://localhost:8000/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }

  const handleChange = (e) => {
    setNewPlaylist(e.target.value);
  }

  const handleSubmit = (track_id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "name": newPlaylist,
      "tracks": []
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/playlists/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(() => fetchPlaylists())
      .catch(error => console.log('error', error))
  }

  return (
    <>
      <main>
        {playlists.map((playlist) => (
          <PlaylistRow key={playlist.id} playlist={playlist} refreshPlaylists={fetchPlaylists}/>
        ))}
        <div className={styles.createPlaylistInput}>
          <label>New Playlist:</label>
          <input type="text" name="createPlaylist" onChange={handleChange}/>
          <button className="createButton" value="Create" onClick={handleSubmit}>Create</button>
        </div>
      </main>
    </>
  );
}

export default Playlists;
