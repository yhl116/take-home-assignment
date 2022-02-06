import React, { useState, useEffect } from "react";
import styles from "./TrackList.module.css";

import TrackRow from "./TrackRow";
import AudioPlayer from "./AudioPlayer";

function TrackList() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  const {url} = this.prop;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      <main className={styles.app}>
        {tracks.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} />
        ))}
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default TrackList;
