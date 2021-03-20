import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  pageBack: {
    backgroundColor: '#93E9BE',
    height: heightPercentageToDP('75%')
  },
  hold: {
    backgroundColor: '#93E9BE',
    height: heightPercentageToDP('75%'),
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#93E9BE",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 850,
  },
  image: {
    marginBottom: 20,
    maxHeight: heightPercentageToDP('39%'),
    maxWidth: widthPercentageToDP('70%'),
  },
  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#fff",
    marginBottom: 30,
    fontFamily: "TrebuchetMS",
    backgroundColor: "#53DC98",
  },
  iconBack: {
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    maxHeight: 45,
    height: heightPercentageToDP('5%'),
    marginTop: heightPercentageToDP('4.5%'),
    marginRight: widthPercentageToDP('23%'),
    marginLeft: widthPercentageToDP('5%'),
    width: widthPercentageToDP('8%'),
    maxWidth: 45
  },
  icon: {
    marginTop: heightPercentageToDP('1.25%'),
    fontSize: heightPercentageToDP('5%'),
    marginLeft: widthPercentageToDP('1.75%')
  },
  popUpText: {
    marginBottom: 60,
    color: "#FFF",
    textAlign: "center",
    fontFamily: "TrebuchetMS",
    fontSize: heightPercentageToDP('3%'),
  },
});