import React from "react";
import AudioPlayer from "../AudioPlayer";
import renderer from "react-test-renderer";

describe("The audio player", () => {
    it("should match the snapshot", () => {
        const track = {
            "id": "0dQiJavYYb",
            "title": "Hellonelia",
            "length": 208,
            "bpm": 0,
            "genres": [
                "Indie Pop"
            ],
            "moods": [
                "Laid Back",
                "Sentimental"
            ],
            "main_artists": [
                "Martin Hall"
            ],
            "featured_artists": [],
            "audio": "https://storage.googleapis.com/tech-coding-interview-assets/0dQiJavYYb.mp3",
            "cover_art": "https://storage.googleapis.com/tech-coding-interview-assets/0dQiJavYYb.jpg",
            "waveform": "https://storage.googleapis.com/tech-coding-interview-assets/0dQiJavYYb.json",
            "spotify": "http://link.epidemicsound.com/0dQiJavYYb/spotify"
        }

        const tree = renderer
            .create(<AudioPlayer track={track}/>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
