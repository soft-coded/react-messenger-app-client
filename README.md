# React Messenger App

A messenger app built using react.js.

This repository is one of the two required to run this app (client-version).


## Tools Used

* React.js

* React-bootstrap

* Socket.io-client



## Setup Instructions

1. Make sure you have the latest version of node.js and npm installed. [You can check for newer versions on the official node.js website.](https://nodejs.org/en/)

2. Clone the repository

```
    git clone https://github.com/soft-coded/react-messenger-app-client.git
```
3. Clone the [server repository](https://github.com/soft-coded/react-messenger-app-server)

```
    git clone https://github.com/soft-coded/react-messenger-app-server.git
```
4. Navigate to the react-messenger-app-client folder and install the dependencies

```
    cd react-messenger-app-client
    npm i
```    
5. Run the app

```
    npm start
 ``` 
6. Navigate to the react-messenger-app-server folder and install its dependencies

```
    cd ..
    cd react-messenger-app-server
    npm i
```    
7. Run the server

```
    node server.js
``` 
8. Open a browser and go to [localhost:3000](http://localhost:3000). The server runs on localhost:5000.

## Using The App
The app uses IDs to identify senders and receivers. These are generated by uuid v4.
* After going to localhost:3000, click on the "Create Account" button. This is a one time requirement since the app then stores this ID into the browser's localstorage.
* Open a different browser or an incognito window and do the same.
* You'll be taken to the dashboard. Your ID is displayed on the bottom left corner.
* To send a message, you need to know the receiver's ID. Copy the ID from the incognito window.
* On the main window, go to the "Contacts" tab and click on "New Contact".
* Paste the ID and enter any name of your choice. 
* You can create multiple contacts using this.
* To send a message, go to the "Conversations" tab and click on "New Conversation".
* Select all the contacts you want to send a message to and click on "Create".
* Type in your message on the bottom right text box and hit send. All the contacts will receive your message.
* If they have not saved you as a contact, your ID will be displayed instead of a name.
