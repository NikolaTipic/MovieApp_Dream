import React, {useState} from "react";
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Modal, Button, FlatList} from "react-native";
import { StatusBar } from "expo-status-bar";
import Styles from "../components/styles";
import { GET, GETsearch } from "../services/API";
import { POSTER_IMAGE } from "../components/config";
import Constants from "../components/Constants";
import SwitchSelector from "react-native-switch-selector";
import { IMAGE_POSTER_URL } from "../components/config";
import { Ionicons } from '@expo/vector-icons';
import { widthPercentToDp as wp, heightPercentToDp as hp } from '../components/Dimensions';

const Search = ({navigation}) => {

    const [loading, setLoading] = useState();
    const [movieState, setMovieState] = useState({
        s: "",
        results: [],
        selectedDetails: {},
        selectedCredits: []
    });
    const [actorState, setActorState] = useState({
        s: "",
        results: [],
        selectedDetails: {},
        selectedCredits: []
    });
    const [movieModalVisible, setMovieModalVisible] = useState(false);
    const [actorModalVisible, setActorModalVisible] = useState(false);
    const [movieActorsSwitch, setMovieActorsSwitch] = useState("movies");

    const searchMovies = async () => {
        const data = await GETsearch("movie",`${movieState.s}`);
        
        setMovieState(prevState => {
            return { ...prevState, results: data.results}
        })
        setLoading(false);
    }

    const searchActors = async () => {
        const data = await GETsearch("person",`${actorState.s}`);
        
        setActorState(prevState => {
            return { ...prevState, results: data.results}
        })
        setLoading(false);
    }

    const openModalMovie = async (id) => {
        const details = await GET(`/movie/${id}`);
        const credits = await GET(`/movie/${id}/credits`)


        const slice = credits.cast.slice(0,5)

        setMovieState(prevState => {
            return { ...prevState, selectedDetails: details, selectedCredits: slice}
        })

        
        setSlicedCredits(slice);
    }

    const openModalActor = async (id) => {
        const details = await GET(`/person/${id}`);

        console.log(details);
        
        setActorState(prevState => {
            return { ...prevState, selectedDetails: details}
        })
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

    const options = [
        { label: "Movies", value: "movies" },
        { label: "Actors", value: "actors" }
      ];

    return (
        <>
            <StatusBar style="light"/>
            <View style={Styles.sectionBg}>
                {
                    movieActorsSwitch === "movies" ? (
                        <TextInput 
                            style = {Styles.searchBar}
                            placeholder="Search movies"
                            onChangeText = {text => setMovieState(prevState => {
                                return {...prevState, s: text}
                            })}
                            onSubmitEditing={searchMovies}
                            value = {movieState.s}
                        />
                    ) : (
                        <TextInput 
                            style = {Styles.searchBar}
                            placeholder="Search actors"
                            onChangeText = {text => setActorState(prevState => {
                                return {...prevState, s: text}
                            })}
                            onSubmitEditing={searchActors}
                            value = {actorState.s}
                        />
                    )
                
                }

                

                <SwitchSelector
                    options={options}
                    initial={0}
                    onPress={value => {
                        setMovieActorsSwitch(value);
                        setMovieState(prevState => {
                            return {...prevState, s: "", results: []}
                        })
                        setActorState(prevState => {
                            return {...prevState, s: "", results: []}
                        })
                    }}
                    style={Styles.switch}
                    buttonColor={Constants.secondaryColor}
                    selectedColor="#fff"
                    height={20}
                />

                <ScrollView style = {Styles.results}>
                    {
                         movieActorsSwitch === "movies" ? movieState.results.map(result => (
                            <TouchableOpacity key={result.id} onPress={() => {
                                openModalMovie(result.id); 
                                setMovieModalVisible(true);
                                }}>
                                <View style={Styles.result}>
                                    <Image
                                        source = {{ uri: `${POSTER_IMAGE}${result.poster_path}` }}
                                        style = {Styles.moviePoster}
                                        resizeMode="cover"
                                    />
                                    <View>
                                    <Text style={Styles.movieHeading}>{result.original_title}</Text>
                                    <Text style={Styles.relaseDate}>{result.release_date.substring(0,4)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )) : actorState.results.map(result => (
                                <TouchableOpacity key={result.id} onPress={() => {
                                    openModalActor(result.id); 
                                    setActorModalVisible(true);
                                    }}>
                                    <View key={result.id} style={Styles.result}>
                                        <Image
                                            source = {{uri: `${POSTER_IMAGE}${result.profile_path}`}} 
                                            style = {Styles.moviePoster}
                                            resizeMode="cover"
                                        />
                                        <View>
                                        <Text style={Styles.movieHeading}>{result.name}</Text>
                                        <Text style={Styles.profession}>{result.known_for_department}</Text>
                                        <Text style={Styles.knownFor}>{result.known_for.map(result => result.original_title)[0]}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                    }
                </ScrollView>    

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

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={actorModalVisible}
                >
                    <Text>{actorState.selectedDetails.name}</Text>
                    <Button
                        onPress={() => setActorModalVisible(false)}
                        title="Close"
                        color={Constants.baseColor}
                    />
                </Modal>             
            </View>
        </>
    );
}

export default Search;