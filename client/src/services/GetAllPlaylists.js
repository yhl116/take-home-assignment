export default {
    async GetAllPlaylists() {
        const allPlaylistsResponse = await fetch("http://localhost:8000/playlists");
        const allPlaylistJson = (await allPlaylistsResponse).json();

        return allPlaylistJson;
    }
}