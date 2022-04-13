import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Button, ScrollView, Share } from "react-native";
import { ActivityIndicator } from "react-native";
import { GET, GETnewPage } from "../services/API";
import Constants from "./Constants";
import Styles from "./styles";
import { IMAGE_POSTER_URL, POSTER_IMAGE } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { widthPercentToDp as wp, heightPercentToDp as hp } from './Dimensions';
import TrendingPeople from "./TrendingPeople";


let total = 0;
const TOP_RATED_MOVIES_KEY = "MOVIES";

const TrendingMovies = () => {
    const [loading, setLoading] = useState(true);
    const [movieState, setMovieState] = useState({
        results: [],
        selectedDetails: {},
        selectedCredits: [],
        numberOfPage: 0,
    });
    const [movieModalVisible, setMovieModalVisible] = useState(false);

    const getMovies = async () => {
        //console.log("getMovies");
        const data = await fetchAndStoreMoviesToStorage(1);

        setMovieState(prevState => {
            return { ...prevState, results: data.results, numberOfPage: data.page }
        })

        setLoading(false);
        fetchUntilMaxIsReached(2);
    }

    const fetchAndStoreMoviesToStorage = async (pageNumber) => {
        //console.log("fetchAndStoreMoviesToStorage");
        //console.log(`page number: ${pageNumber}` );
        
        const data = await GETnewPage(`${pageNumber}`);
        await _storeData(data, pageNumber);
        total = total + data.results.length;

        //console.log(data.results.length);

        return data;
    }

    const fetchUntilMaxIsReached = async (pageNumber) => {
        //console.log("fetchUntilMaxIsReached");
        const data = await fetchAndStoreMoviesToStorage(pageNumber);

        if (total < 250) {
            await fetchUntilMaxIsReached(pageNumber + 1);
        }
    }

    const _storeData = async (fetchedData, page_number) => {
        //console.log(`_storeData start: ${page_number}`);
        
        const data = await AsyncStorage.getItem(TOP_RATED_MOVIES_KEY);
        let _jsonData = JSON.parse(data);
        
        if (_jsonData === null) _jsonData = {results: [], maxPage: 0};
        if (_jsonData.results === null) _jsonData.results = [];

        _jsonData.results = _jsonData.results.concat(fetchedData.results);
        _jsonData.maxPage = fetchedData.page;
        
        //console.log(`_storeData mid: ${page_number}`);

        await AsyncStorage.setItem(TOP_RATED_MOVIES_KEY, JSON.stringify(_jsonData));

        //console.log(`_storeData end: ${page_number}`);
    }

    const clearStorage = async () => {
        await AsyncStorage.removeItem(TOP_RATED_MOVIES_KEY);
    }


    const openModalTopRatedMovie = async (id) => {
        const details = await GET(`/movie/${id}`);
        const credits = await GET(`/movie/${id}/credits`)

        const slice = credits.cast.slice(0,5)

        setMovieState(prevState => {
            return { ...prevState, selectedDetails: details, selectedCredits: slice}
        })
    }

    const displayMovies = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    openModalTopRatedMovie(item.id);
                    setMovieModalVisible(true);
                }}
            >
                <View>
                    <Image
                        source={{ uri: `${POSTER_IMAGE}${item.poster_path}` }}
                        style={Styles.posterImage}
                    />
                    <Text style={Styles.movieTitle}>{item.original_title}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    const displayCast = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={Styles.castBox}>
                    <Image
                        source={{uri: `${IMAGE_POSTER_URL}${item.profile_path}`}}
                        style={Styles.trendingPeopleImage}
                    />
                    <Text style={Styles.movieTitle}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const getPagMovies = async (pageNum) => {

        //console.log(pageNum);

        const data = await AsyncStorage.getItem(TOP_RATED_MOVIES_KEY);
        let _jsonData = JSON.parse(data);

        //console.log(_jsonData.results.length)
        const sliceData = _jsonData.results.slice((pageNum-1) * 20, (pageNum * 20));

        //console.log(sliceData);

        setMovieState(prevState => {
            return {...prevState, results: sliceData}
        })
    }

   
    const onShare = async (imdb_id) => {
        try {
        const result = await Share.share({
            message: `https://www.imdb.com/title/${imdb_id}`,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
        } catch (error) {
        alert(error.message);
        }
    };

    useEffect(() => {
        clearStorage();
        getMovies();
    }, []);


    return (
        <View>
            {
                loading ? <ActivityIndicator size="large" color={Constants.textColor} />
                    :
                    <View>
                        <Text style={Styles.heading}>Top rated Movies</Text>
                        
                        <View style={Styles.pag}>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(1)}>
                                <Text style={Styles.numPag}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(2)}>
                                <Text style={Styles.numPag}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(3)}>
                                <Text style={Styles.numPag}>3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(4)}>
                                <Text style={Styles.numPag}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(5)}>
                                <Text style={Styles.numPag}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(6)}>
                                <Text style={Styles.numPag}>6</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(7)}>
                                <Text style={Styles.numPag}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(8)}>
                                <Text style={Styles.numPag}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(9)}>
                                <Text style={Styles.numPag}>9</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(10)}>
                                <Text style={Styles.numPag}>10</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(11)}>
                                <Text style={Styles.numPag}>11</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(12)}>
                                <Text style={Styles.numPag}>12</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.pagBox} onPress={()=> getPagMovies(13)}>
                                <Text style={Styles.numPag}>13</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            keyExtractor={item => item.id}
                            data={movieState.results}
                            horizontal={true}
                            renderItem={displayMovies}
                        />

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={movieModalVisible}
                        >
                            <View style={Styles.sectionBg}>
                                <Image 
                                    source={{uri: `${IMAGE_POSTER_URL}${movieState.selectedDetails.backdrop_path}`}}
                                    style={Styles.imageBg}

                                />
                                <Text style={Styles.detailTitle}>{movieState.selectedDetails.original_title}</Text>
                                
                                <TouchableOpacity 
                                    onPress={() => {
                                        const imdb_id = `${movieState.selectedDetails.imdb_id}`
                                        onShare(imdb_id)
                                        }}
                                    style={Styles.shareBox}
                                >
                                    <Ionicons 
                                        name="share-social-outline" 
                                        size={hp(4)} 
                                        color={Constants.textColor}
                                        style={Styles.share}
                                    />
                                </TouchableOpacity>

                                <Text style={Styles.heading}>OVERVIEW:</Text>
                                <Text style={Styles.overview}>{movieState.selectedDetails.overview}</Text>
                                <Text style={Styles.heading}>Cast</Text>
                                
                                <View>
                                    <FlatList
                                        keyExtractor={item => item.id}
                                        data={movieState.selectedCredits}
                                        horizontal={true}
                                        renderItem={displayCast}
                                    />
                                </View>
                        
                                <TouchableOpacity style={Styles.closeModal} onPress={() => setMovieModalVisible(false)}>
                                    <Text style={Styles.buttonText}>CLOSE</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
            }
        </View>
    )




}

export default TrendingMovies;