# piggybank-frontend
Installation Guide: https://docs.expo.io/get-started/installation/

1. Download the git repo

2. Open in text editor of choice 

3. Navigate to the project directory

```
$cd piggybank-frontend
```
4. Intsall libraries.
 
```
$npm install firebase
$npm install react-navigation
$npm install react-native-safe-area-view
$npm install react-native-elements
$npm i --save @fortawesome/fontawesome-svg-core
$npm install --save @fortawesome/free-solid-svg-icons
$npm install --save @fortawesome/react-fontawesome
$npm i react-native-keyboard-avoiding-view
```

For next few steps, refer to https://docs.expo.io/get-started/create-a-new-app/ after ‘Starting the development server’ section…

5. Run the application 

```
$expo start (or npm start)
```

When you run expo start (or npm start), Expo CLI starts Metro Bundler, which is an HTTP server that compiles the JavaScript code of our app using Babel and serves it to the Expo app. It also pops up Expo Dev Tools, a graphical interface for Expo CLI. 

6. Open the app on your phone or tablet

On your iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal or in Expo Dev Tools.
On your Android device, press "Scan QR Code" on the "Projects" tab of the Expo Go app and scan the QR code you see in the terminal or in Expo Dev Tools.

It may take a few minutes for Metro Bundler to start building the JavaScript bundle and to open the application on your device. Give it a second before trying to open.

Once done with that, refer to the backend repo for starting the backend.

