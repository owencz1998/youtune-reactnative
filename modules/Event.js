import { fetchBrowse } from "./API";

function showPlaylist(id, navigation) {
    fetchBrowse(id).then((playlist) => 
        navigation.push("Playlist", playlist)
    );
}

function showArtist(browseId, navigation) {
    fetchBrowse(browseId).then((artist) => 
        navigation.push("Artist", artist)
    );
}

export function handleMedia({browseId, playlistId, videoId}, navigation) {
    if (videoId != undefined) {
        navigation.push("Music", {videoId, playlistId});
        return;
    }

    if (browseId != undefined) {
        if (browseId.slice(0, 2) == "UC") {
            showArtist(browseId, navigation);
            return;
        } else {
            showPlaylist(browseId, navigation);
            return;
        }
    }

    if (playlistId != undefined) {
        showPlaylist(playlistId, navigation);
        return;
    }
}