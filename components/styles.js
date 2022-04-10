import { StyleSheet } from "react-native";
import Constants from "./Constants";
import { widthPercentToDp as wp, heightPercentToDp as hp } from './Dimensions';

const Styles = StyleSheet.create({
    sectionBg: {
        backgroundColor: Constants.baseColor,
        height: hp(100)
    },
    heading: {
        fontSize: hp(2),
        color: Constants.fadedColor,
        margin: hp(1.5),
        marginTop: hp(3)
    },
    posterImage: {
        height: hp(26),
        width: wp(35),
        borderRadius: 10,
        margin: wp(1)
    },
    movieTitle: {
        color: Constants.textColor,
        width: wp(35),
        textAlign: "center",
        marginTop: hp(1),
        fontSize: hp(1.5)
    },
    trendingPeopleImage: {
        height: 70,
        width: 70,
        borderRadius: 500,
    },
    trendingPeopleName: {
        width: 60,
        color: Constants.textColor,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
    },
    trendingPeopleContainer: {
        margin: wp(2.5),
        marginTop: wp(0.5)
    }
});

export default Styles;