export default {
    async GetAllTracks() {
        const allTracksPlaylist = await fetch("http://localhost:8000/tracks");
        const allTracksJson = (await allTracksPlaylist).json();

        return allTracksJson;
    }
}