import React from "react";
import PlaylistRow from "./PlaylistRow"
import styles from "./Playlists.module.css";

class Playlists extends React.Component {
  playlists = [
    {
      name: "PL1",
      id: 1
    }, {
      name: "PL2",
      id: 2
    }
  ];

  constructor(props) {
    // useEffect(() => {
    //   fetch("http://localhost:8000/playlists")
    //     .then((res) => res.json())
    //     .then((data) => setPlaylists(data.tracks_info));
    // }, []);
    
    super(props);
    this.state = {newPlaylist: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({newPlaylist: event.target.value});
  }

  handleSubmit() {
    const {newPlaylist} = this.state;
    const requestOptions = {
      method: "post",
      playlist: {
        name: newPlaylist,
        tracks: []
      }
    }

    fetch("http://localhost:8000/playlists", requestOptions);
  }

  render() {
    return (
      <>
        <main>
          {this.playlists.map((playlist) => (
            <PlaylistRow playlist={playlist} />
          ))}
          <form className={styles.createPlaylistInput} onSubmit={this.handleSubmit}>
            <label for="createPlaylist">New Playlist:</label>
            <input type="text" name="createPlaylist" onChange={this.handleChange}/>
            <input type="submit" className="createButton" value="Create"/>
          </form>
        </main>
      </>
    );
  }
}

export default Playlists;