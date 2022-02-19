import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import AudioPlayer from "./AudioPlayer";
import PlaylistTrackRow from "./PlaylistTrackRow";

function Playlist() {
  const params = useParams();
  const {playlistId} = params;

  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  
  useEffect(() => {
    refreshPlaylist(playlistId);
  }, [playlistId]);

  const refreshPlaylist = (playlistId) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://localhost:8000/playlists/${playlistId}/`, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(json => setCurrentPlaylist(json));
  }

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      <main>
        <h1>{currentPlaylist.name}</h1>
        {currentPlaylist?.tracks?.map((track, ix) => (
          <PlaylistTrackRow 
            key={ix} 
            track={track} 
            inputPlaylist={currentPlaylist}
            handlePlay={handlePlay} 
            refreshPlaylist={refreshPlaylist}
          />
        ))}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default Playlist;