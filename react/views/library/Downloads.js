import React, { useEffect, useState } from 'react';

import {
    ScrollView,
    Text,
    View,
    ActivityIndicator
} from "react-native";

import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Navigation from '../../services/ui/Navigation';
import Service from '../../services/device/Downloads';
import IO from '../../services/device/IO';

import Entry from "../../components/shared/Entry";
import { shelvesStyle } from '../../styles/Shelves';

export default Downloads = ({ navigation }) => {
    const [state, setState] = useState({entries: [], loading: false});
    const {entries, loading} = state;
    const {colors} = useTheme();
    const playlistId = "LOCAL_DOWNLOADS";

    const loadEntries = async() => {
        let entries = [];
        for (let i = 0; i < Service.downloadedTracks.length; i++) {
            let videoId = Service.downloadedTracks[i];
            let track = await Service.getTrack(videoId);
            if (track != undefined) {
                let entry = {
                    title: track.title,
                    artist: track.artist,
                    artwork: IO.getBlobAsURL(track.artwork),
                    id: track.videoId,
                    playlistId: playlistId
                }
                entries.push(entry);
            }
        }

        setState({entries: entries, loading: false});
    }
    
    useEffect(() => {
        Service.waitForInitialization().then(() => {
            loadEntries();
        });
        
        let dlListener = Service.addListener(
            Service.EVENT_REFRESH,
            () => {
                if (!loading)
                    loadEntries();
            }
        );

        return () => dlListener.remove();
    }, []);

    const activity = <View style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <ActivityIndicator size="large"/>
    </View>;

    const scrollView = <ScrollView
        style={{flexDirection: "column-reverse"}}
        contentContainerStyle={[
            shelvesStyle.searchContainer,
            entries.length != 0 ? {flex: "none"} : undefined
        ]}
    >
        {entries.map(track => <Entry key={track.id}
            entry={{title: track.title, subtitle: track.artist,
                thumbnail: track.artwork, videoId: track.id,
                playlistId: track.playlistId}}
            navigation={navigation}
        />)}
        {
            <Button onPress={() => Navigation.playLocal("LOCAL_DOWNLOADS", navigation)}
                mode="contained"
                style={{margin: 20, alignItems: "stretch"}}
                labelStyle={{alignItems: "stretch"}}
            >
                Play all
            </Button>
        }
    </ScrollView>

    const emptyView = <View style={{
        height: 300,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "auto"
    }}>
        <MaterialIcons name="get-app" color={colors.text} size={50}/>
        <Text style={{
            fontSize: 20,
            color: colors.text
        }}>
            Downloaded songs are displayed here
        </Text>
        
        <Button
            mode="outlined"
            onPress={() => navigation.navigate("Search")}
        >
            Look for music
        </Button>
    </View>;

    return loading
    
        ? activity
        : entries.length > 0

            ? scrollView
            : emptyView;
}