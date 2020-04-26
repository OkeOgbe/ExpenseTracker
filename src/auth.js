// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBDcx9iewWysFUEzVCHGxTSrvk7NABUqs0",
	authDomain: "expense-tracker-8c7a5.firebaseapp.com",
	databaseURL: "https://expense-tracker-8c7a5.firebaseio.com",
	projectId: "expense-tracker-8c7a5",
	storageBucket: "expense-tracker-8c7a5.appspot.com",
	messagingSenderId: "1037024490612",
	appId: "1:1037024490612:web:232708ad464b8027a7cd21",
	measurementId: "G-J11BC2NLKJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const signUp = document.querySelector(".authUser");
const signOut = document.querySelector(".signOut");
const displayName = document.querySelector(".displayName");
const auth = firebase.auth();
signUp.addEventListener("click", function() {
	auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(function() {
			const provider = new firebase.auth.GoogleAuthProvider();
			return auth.signInWithPopup(provider);
		})
		.then(function() {
			window.location.assign("./dashboard.html");
		})
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
});
signOut.addEventListener("click", function() {
	auth.signOut().then(function() {
		window.location.assign("./index")
	}).catch(function(error) {});
})
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
if (user != null) {
	console.log(user.displayName)
	displayName.textContent = user.displayName;
	name = user.displayName;
	email = user.email;
	photoUrl = user.photoURL;
	emailVerified = user.emailVerified;
	uid = user.uid;
}
