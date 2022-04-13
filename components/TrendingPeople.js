import React, {useState, useEffect} from "react";
import {View, Text, ActivityIndicator, FlatList, Image} from "react-native";
import { GET } from "../services/API";
import Constants from "./Constants";
import { IMAGE_POSTER_URL } from "./config";
import Styles from "./styles";

const TrendingPeople = ({title, url, isForModal}) => {

    const [loading, setLoading] = useState(true);
    const [people, setPeople] = useState([]);

    const getPeople = async () => {
        const data = await GET(url);

        setPeople(isForModal === "modal" ? data.cast : data.results);
        setLoading(false);
    };

    useEffect(() => {
        getPeople();
    }, [])

    return (
        <View>
            {
                loading ? <ActivityIndicator size="large" color={Constants.textColor} /> 
                    :
                <View>
                    <Text style={Styles.heading}>{title}</Text>
                    <FlatList 
                    keyExtractor = {item => item.id}
                    data = {people}
                    horizontal = {true}
                    renderItem={displayPeople}
                />
                </View>
            }
        </View>
    );
}

const displayPeople = ({ item }) => {
    return (
        <View style={Styles.trendingPeopleContainer}>
            <Image 
                source={{uri: `${IMAGE_POSTER_URL}${item.profile_path}`}}
                style={Styles.trendingPeopleImage}
            />
            <Text style={Styles.trendingPeopleName}>{item.name}</Text>
        </View>
    )
}

export default TrendingPeople;