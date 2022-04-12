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
        marginTop: hp(2)
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
        height: wp(17),
        width: wp(17),
        borderRadius: 500
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
    },
    searchBar: {
        fontSize: hp(1.8),
        fontWeight: "300",
        padding: wp(3),
        width: wp(90),
        backgroundColor: "#fff",
        borderRadius: wp(1.8),
        marginBottom: hp(1),
        marginTop: hp(5),
        alignSelf: "center"
    },
    results: {
        flex: 1,
    },
    result: {
        flex: 1,
        flexDirection: "row",
        width: wp(90),
        marginBottom: hp(1),
        backgroundColor: "#373737",
        alignSelf: "center",
        padding: wp(2),
        borderRadius: wp(2)
    },
    movieHeading: {
        color: Constants.textColor,
        fontSize: hp(2),
        fontWeight: "700",
        maxWidth: wp(60),
        marginLeft: wp(4)
    },
    moviePoster: {
        width: wp(20),
        height: hp(12)
    },
    relaseDate:{
        marginTop: hp(3),
        color: Constants.textColor,
        fontSize: hp(1.5),
        fontWeight: "300",
        maxWidth: wp(60),
        marginLeft: wp(4)
    },
    switch: {
        width: wp(60),
        marginBottom: hp(1),
        alignSelf: "center"
    },
    profession: {
        marginTop: hp(3),
        color: Constants.textColor,
        fontSize: hp(1.5),
        fontWeight: "300",
        maxWidth: wp(60),
        marginLeft: wp(4)
    },
    knownFor: {
        marginTop: hp(1),
        color: Constants.textColor,
        fontSize: hp(1.5),
        fontWeight: "300",
        maxWidth: wp(60),
        marginLeft: wp(4)
    },
    pag: {
        flexDirection: "row",
        alignSelf: "center"
    },
    numPag: {
        color: "#fff",
        fontSize: wp(4)
    },
    pagBox: {
        margin: wp(2.3),
        marginTop: hp(0)
    },
    imageBg: {
        width: wp(100),
        height: hp(25)
    },
    detailTitle: {
        fontSize: hp(2.5),
        color: Constants.textColor,
        textAlign: "center",
        marginTop: -hp(4)
    },
    shareBox: {
        width: wp(100),
        justifyContent: "flex-end"
    },
    share: {
    alignSelf: "flex-end",
    marginTop: -hp(2),
    borderWidth: wp(0.5),
    borderColor: Constants.textColor,
    borderRadius: wp(100),
    padding: wp(0.5),
    backgroundColor: Constants.secondaryColor,
    marginRight: wp(2),
    },
    overview: {
        color: Constants.textColor,
        textAlign: "justify",
        fontSize: hp(1.5),
        marginHorizontal: wp(2)
    },
    castBox: {
        alignItems: "center",
        marginHorizontal: wp(-4),
    },
    closeModal: {
        borderWidth: wp(0.4),
        alignItems: "center",
        width: wp(80),
        alignSelf: "center",
        marginTop: hp(15),
        backgroundColor: Constants.secondaryColor,
        borderRadius: wp(2)
    },
    buttonText: {
        fontSize: hp(2),
        color: Constants.textColor,
        margin: hp(1)
    }
});

export default Styles;