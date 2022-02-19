import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navigation from './components/Navigation';
import Playlist from './components/Playlist';
import Playlists from './components/Playlists';
import reportWebVitals from './reportWebVitals';
import Blog from './components/Blog';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/playlists" element={<Blog/>}>
          <Route path="" element={<Playlists />} />
          <Route path=":playlistId" element={<Playlist />} />
        </Route>
        <Route path="/:playlistId" element={<Playlist />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
