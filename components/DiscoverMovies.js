import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import { GET } from "../services/API";
import { SliderBox } from "react-native-image-slider-box";
import { IMAGE_POSTER_URL } from "./config";
import Constants from "./Constants";

const DiscoverMovies = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const response = await GET("/discover/movie");

            const images = response.results.map((data) => `${IMAGE_POSTER_URL}${data.backdrop_path}`);
            
            let backImages = [];
            for(let i=0; i<10; i++) {
                backImages.push(images[i]);
            }

            setImages(backImages);
        };

        getMovies();
    }, []);

    return (   
        <View>
            <SliderBox
                images={images}
                dotColor={Constants.secondaryColor}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                autoplay= {true}
                circleLoop= {true}
            />
        </View>
    );
}

export default DiscoverMovies;