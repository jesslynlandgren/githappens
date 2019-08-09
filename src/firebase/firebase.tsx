import app from "firebase/app";

const config = {
	apiKey: "AIzaSyAVyJbV3ieeDBdfo5sQ2th61Mqwyo0h0p0",
	appId: "1:73399040730:web:9049a1138aadab0d",
	authDomain: "git-happens.firebaseapp.com",
	databaseURL: "https://git-happens.firebaseio.com",
	messagingSenderId: "73399040730",
	projectId: "git-happens",
	storageBucket: "",
};

class Firebase {
	constructor() {
		app.initializeApp(config);
	}
}

export default Firebase;
