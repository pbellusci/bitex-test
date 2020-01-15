import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAZorNo6EEXVIQP_M8VGo25uiKBpcdHJcA",
	authDomain: "bitex-3b6b8.firebaseapp.com",
	databaseURL: "https://bitex-3b6b8.firebaseio.com",
	projectId: "bitex-3b6b8",
	storageBucket: "bitex-3b6b8.appspot.com",
	messagingSenderId: "212193865946",
	appId: "1:212193865946:web:8f31478cefc61a331475e3",
	measurementId: "G-3317KNQZTK"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };
