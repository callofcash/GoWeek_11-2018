import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import Tweet from '../components/Tweet';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Timeline extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Inicio",
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate("New")} >
                <Icon
                    name="add-circle-outline"
                    style={{ marginRight: 20 }}
                    size={24}
                    color="#4bb0ee"
                />
            </TouchableOpacity>
        )
    });

    state = {
        tweets: [],
    };

    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const ipAndroid = "10.0.2.2";
        const ipGenymotion = "10.0.3.2";
        const ipHome = "http://192.168.0.107";

        const io = socket(ipHome + ":3000");

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        });

        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(
                    tweet => (tweet._id === data._id ? data : tweet)
                )
            })
        });

    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={
                        ({ item }) => <Tweet tweet={item} />
                    }
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});