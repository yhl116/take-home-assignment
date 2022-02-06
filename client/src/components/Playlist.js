import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import AudioPlayer from "./AudioPlayer";
import PlaylistTrackRow from "./PlaylistTrackRow";

function App() {
  const playlistId = useParams();

  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  
  const url = "http://localhost:8000/playlists/" + playlistId;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCurrentPlaylist(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      <main>
        {currentPlaylist.tracks_info.map((track, ix) => (
          <PlaylistTrackRow key={ix} track={track} handlePlay={handlePlay} input_playlist={currentPlaylist.name}/>
        ))}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;