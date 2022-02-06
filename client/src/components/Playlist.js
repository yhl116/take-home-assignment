import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
// import styles from "./Playlist.module.css";

import TrackRow from "./TrackRow";
import AudioPlayer from "./AudioPlayer";

function App() {
  const playlistId = useParams();

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  
  // const {playlistId} = this.prop;
  const url = "http://localhost:8000/playlists/" + playlistId;
  // const url = "http://localhost:8000/tracks"

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTracks(data.tracks_data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      <main>
        {tracks.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} />
        ))}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;