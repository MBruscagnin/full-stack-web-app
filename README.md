# Full Stack Web Application Cross-platform
*This is the base model of my thesis project of my B.Sc. in Computer Science @ [Ca' Foscari University of Venice, Italy](https://unive.it).*

### TL;DR
This is a web application for students to sell books via auction, using the PayPal API to handle payments, and porting to mobile and desktop with the Cordova and Electron frameworks.

## Technologies
Web Application developed with the MEAN stack.

### Back-end
* a Node.js web server with RESTful API
* routing managed by Express.js middleware addressing the authentication processes to Passport.js middleware
* open commuinications through WebSocket protocol (Socket.IO library)

### Front-end
* SPA (Single Page Application)
* Angular framework
* MVC pattern with SoC paradigm (Separation of Concerns)
* porting to mobile devices (Android) via Cordova framework
* Adapted to desktop using Electron.js
