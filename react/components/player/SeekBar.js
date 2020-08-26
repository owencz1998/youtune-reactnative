import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';

import TrackPlayer, { useTrackPlayerProgress } from 'react-native-web-track-player';
import Slider from "@react-native-community/slider";
import { appColor } from '../../styles/App';

function pad(n, width, z = 0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
    pad( ~~(position / 60), 2),
    pad( ~~(position % 60), 2),
]);

const doSeek = async(value) => {
    await TrackPlayer.seekTo(value);
}

export default ({ style }) => {
    var { position, bufferedPosition, duration } = useTrackPlayerProgress();

    const elapsed = minutesAndSeconds(position);
    const remaining = minutesAndSeconds(duration - position);

    return (
        <View style={[styles.container, style]}>
            <Slider
                maximumValue={Math.max(duration, 1, position + 1)}
                onSlidingComplete={async(value) => await doSeek(value)}
                value={position}
                bufferedPosition={bufferedPosition}
                minimumTrackTintColor="black"
                maximumTrackTintColor="darkgray"
                thumbTintColor={appColor.background.backgroundColor}
                thumbStyle={styles.thumb}
                trackStyle={styles.track}
            />

            <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15 }}>
                <Text style={styles.text}>
                    {elapsed[0] + ":" + elapsed[1]}
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={[styles.text, {textAlign: "right"}]}>
                    {"-" + remaining[0] + ":" + remaining[1]}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    slider: {
        marginTop: -12
    },

    container: Platform.OS == "android"
        ? {
            paddingTop: 16,
            marginLeft: -15,
            marginRight: -15
        }

        : {
            paddingTop: 16
        },

    track: {
        height: 2,
        borderRadius: 1
    },

    thumb: {
        color: appColor.background.backgroundColor
    },

    text: Platform.OS == "ios"
    ? {
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
        marginLeft: -14,
        marginRight: -14
    }

    : {
        color: 'black',
        fontSize: 13,
        textAlign: 'center'
    }
});