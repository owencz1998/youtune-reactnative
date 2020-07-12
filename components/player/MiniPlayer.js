import React, { PureComponent } from "react";
import { StyleSheet, Animated, View, Pressable, Image, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class MiniPlayer extends PureComponent {

    render() {
        const {
            style,
            isPlaying,
            isStopped,

            onOpen,
            onNext,
            onPlay,
            onClose
        } = this.props;

        if (this.props.media != undefined)
            var {title, subtitle, thumbnail} = this.props.media;

        console.log(isStopped);

        return isStopped
            ?   null
            :   <Animated.View style={style}>
                    <Pressable style={styles.container} onPress={onOpen}>
                        <Image source={{uri: thumbnail}} style={styles.image}/>
                        <View style={styles.textContainer}>
                            <Text numberOfLines={1} style={[styles.text, styles.titleText]}>{title}</Text>
                            <Text numberOfLines={1} style={[styles.text, styles.subtitleText]}>{subtitle}</Text>
                        </View>

                        <Pressable style={styles.button} onPress={onClose}>
                            <MaterialIcons name="clear" color="white" size={29}/>
                        </Pressable>

                        <Pressable style={styles.button} onPress={onPlay}>
                            <MaterialIcons name={isPlaying ?"pause" :"play-arrow"} color="white" size={29}/>
                        </Pressable>

                        <Pressable style={styles.button}  onPress={onNext}>
                            <MaterialIcons name="skip-next" color="white" size={29}/>
                        </Pressable>
                    </Pressable>
                </Animated.View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        overflow: "hidden",
        height: 50,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 2,
        paddingTop: 2,
        alignItems: "center",
        alignSelf: "center",
    },

    image: {
        height: "100%",
        aspectRatio: 1,
        backgroundColor: "gray",
    },

    textContainer: {
        flex: 1,
        overflow: "hidden",
        paddingLeft: 10
    },

    text: {
        color: "white",
    },

    titleText: {
        fontWeight: "bold"
    },

    subtitleText: {
        
    },

    button: {
        paddingLeft: 2,
        paddingRight: 2
    }
});