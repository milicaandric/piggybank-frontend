import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  pageBack: {
    backgroundColor: '#93E9BE',
    height: heightPercentageToDP('75%'),
    position: 'absolute'
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
  passImage: {
    marginBottom: 20,
    maxHeight: heightPercentageToDP('28%'),
    maxWidth: widthPercentageToDP('59%'),
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
    fontSize: heightPercentageToDP('3%'),
  },

  signupHeader: {
    marginTop: heightPercentageToDP('-5%'),
    paddingBottom: 40,
    textAlign: 'center',
    fontSize: 40
  },

  backButton: {
    marginLeft: widthPercentageToDP('-45%'),
    marginTop: 15,
    maxWidth: 40,
    maxHeight: 40,
  },
  mainCircle:{
    height:heightPercentageToDP('20%'),
    width: heightPercentageToDP('20%'),
    borderRadius: heightPercentageToDP('10%'),
    backgroundColor: '#FFF',
    borderColor: '#53DC98',
    borderWidth: 5,
    marginLeft: widthPercentageToDP('50%'),
    marginRight: widthPercentageToDP('50%'),
    alignItems:'center'
  },
  circleText:{
    marginTop:heightPercentageToDP('7%'),
    fontSize: heightPercentageToDP('4%'),
    textAlign:'center'
  },
  dashText:{
    marginTop:heightPercentageToDP('2%'),
    fontSize: heightPercentageToDP('6%'),
    textAlign:'center'
  },
  genInput:{
    borderRadius: 30, 
    height:50, 
    width: widthPercentageToDP('70%'),
  },
  sendButton:{
    borderColor: '#FFF',
    borderWidth: 3,
    height:50,
    width: widthPercentageToDP('35%'),
    borderRadius: 30,
    backgroundColor: "#53DC98",
    alignItems:"center",
    marginTop: 25
  },
  lowerHold:{
    alignItems: 'center'
  },
  sendText:{
    fontSize: 20,
    marginTop: 8,
  }
});