import React, {useState, useEffect} from "react";
import {View, Text, FlatList, Image} from "react-native";
import { ActivityIndicator } from "react-native";
import { GET } from "../services/API";
import Constants from "./Constants";
import Styles from "./styles";
import { POSTER_IMAGE } from "./config";

const TrendingMovies = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const data = await GET("/movie/top_rated");
            
            setMovies(data.results);
            setLoading(false);
        }

        getMovies();

    }, []);

    return (
        <View>
            {
                loading ? <ActivityIndicator size="large" color={Constants.textColor} /> 
                    :
                <View>
                    <Text style={Styles.heading}>Top rated Movies</Text>
                    <FlatList 
                        keyExtractor = {item => item.id}
                        data = {movies}
                        horizontal = {true}
                        renderItem={displayMovies}
                    />
                </View>
            }
        </View>
    )
}

const displayMovies = ({ item }) => {
    return (
        <View>
            <Image 
                source = {{ uri: `${POSTER_IMAGE}${item.poster_path}` }}
                style = {Styles.posterImage}
            />
            <Text style={Styles.movieTitle}>{item.original_title}</Text>
        </View>
    )
}

export default TrendingMovies;