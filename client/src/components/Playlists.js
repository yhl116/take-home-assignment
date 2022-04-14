import React, { useState, useEffect } from "react";
import PlaylistRow from "./PlaylistRow";
import styles from "./Playlists.module.css";
import { useAlert } from 'react-alert';
import GetAllPlaylists from "../services/GetAllPlaylists";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState();
  const alert = useAlert();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = () => {
    fetch("http://localhost:8000/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }

  // const fetchPlaylists = () => {
  //   const allPlaylistJson = await GetAllPlaylists();
  //   setPlaylists(allPlaylistJson);
  // }

  const handleChange = (e) => {
    setNewPlaylist(e.target.value);
  }

  const handleResponse = (res) => {
    if (!res.ok) {
      alert.show("Unable to create new playlist")
    }
  }

  const handleSubmit = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": newPlaylist,
      "tracks": []
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/playlists/", requestOptions)
      .then(response => handleResponse(response))
      .then(() => fetchPlaylists())
      .catch(response => handleResponse(response))
      // .then(setNewPlaylist(""))
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
          {/* <input type="text" name="createPlaylist" onChange={handleChange} value={newPlaylist}/> */}
          <button className="createButton" value="Create" onClick={handleSubmit}>Create</button>
        </div>
      </main>
    </>
  );
}

export default Playlists;
