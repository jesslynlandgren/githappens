import firebase from "firebase";

const config = {
	apiKey: "AIzaSyAVyJbV3ieeDBdfo5sQ2th61Mqwyo0h0p0",
	appId: "1:73399040730:web:9049a1138aadab0d",
	authDomain: "git-happens.firebaseapp.com",
	databaseURL: "https://git-happens.firebaseio.com",
	messagingSenderId: "73399040730",
	projectId: "git-happens",
	storageBucket: "",
};

firebase.initializeApp(config);

export default firebase;
