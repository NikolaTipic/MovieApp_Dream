import React from "react";
import { View} from "react-native";
import { StatusBar } from "expo-status-bar";
import DiscoverMovies from "../components/DiscoverMovies";
import Styles from "../components/styles";
import TrendingPeople from "../components/TrendingPeople";
import TrendingMovies from "../components/TrendingMovies";

const Home = ({navigation}) => {

    return (
        <>
            <StatusBar style="light"/>
            <View style={Styles.sectionBg}>
                <DiscoverMovies />
                <TrendingPeople 
                    title = "Popular Actors" 
                    url = "/trending/person/week"
                    isForModal = "popularp"
                />
                <TrendingMovies />
            </View>
        </>
    );
}

export default Home;