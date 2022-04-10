import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import Styles from "../components/styles";

const Search = () => {
    return (
        <>
            <StatusBar style="light"/>
            <View style={Styles.sectionBg}>
                <Text>Search</Text>
            </View>
        </>
    );
}

export default Search;