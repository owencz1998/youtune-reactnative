import React, { PureComponent } from 'react';

import {
    ImageBackground,
    Text,
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import { headerStyle, gradientColors } from '../../styles/App';

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: "Home",
            source: null
        }

        global.setHeader = ({title, image}) => {
            if (image != undefined)
                this.setState({
                    source: {
                        uri: image
                    }
                });

            if (title != undefined) {
                this.setState({title: title});
            }
        }
    }

    componentDidUpdate(previousProps) {
        if (this.props.source != undefined) {
            if (this.props.source != previousProps.source) {
                this.setImage(this.props.source);
            }
        }
    }

    render() {
        return (
            <ImageBackground imageStyle={null}
                             style={[headerStyle.container, headerStyle.headerHeight, this.props.style]}
                             source={this.state.source}>
                <LinearGradient style={[headerStyle.gradient, this.state.source == null ?headerStyle.image :headerStyle.imageFound]}
                                colors={gradientColors}>
                                    
                    <Text style={[{color: this.state.headerColor}, headerStyle.text]}>
                        {this.state.title}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        )
    }
}