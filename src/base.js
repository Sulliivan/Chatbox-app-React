import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCBxFTki7Q-rs-oFN4fQh1CXWZ4Ci_obvw",
    authDomain: "chatbox-5753f.firebaseapp.com",
    databaseURL: "https://chatbox-5753f.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base