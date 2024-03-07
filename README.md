<h1 align="center">Portfolio Use Only</h1>

> :warning: **Important Note**

This repository and its contents, including installation and deployment instructions, are provided for portfolio review and demonstration purposes only. While the repository is publicly viewable and its code can be executed for review purposes, no license is granted for any further use, distribution, or reproduction of the materials contained herein. Any such activities are prohibited without express permission from the repository owner. Please contact the owner for any questions or requests for use.

# s2e (Study To Evolve)

## Description

React Native 's2e' (StudyToEvolve) is a mobile application that seeks to optimize personal learning and study habits. This app features an intuitive user interface with a focus on goal-setting and tracking to aid users in managing their educational journey more effectively.

The application is built around three main sections: Statistics, Goals, and Settings. Currently, the Goals section is functional and it is designed to help users create, manage, and track their study objectives. Users can add course-based goals and utilize an interactive timer feature to monitor their daily study habits. A unique feature of this application is its ability to generate interactive quizzes that offer a self-assessment tool based on the course information provided.
As it stands, 's2e' is in its initial development stages. Exciting features and improvements are planned for future updates, making the study process even more engaging and productive for users.

Please refer to the Usage section for more detailed information on how to navigate the application.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Installing](#installing)- [Usage](#usage)
- [Technologies](#technologies)
- [Usage](#usage)
- [Contact](#contact)

## Installation

### Prerequisites

Ensure that you have the following installed on your local development machine:

1. **Node.js**: Visit the [official Node.js website](https://nodejs.org/) to download and install Node.js. This will include `npm`, the Node.js package manager.

   ```
   # To check your version of Node.js and npm
   node -v
   npm -v
   ```
2. **Xcode**: If you're on macOS, you'll need Xcode for iOS development (and an Apple developer account). You can install Xcode from the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835).

3. **React Native CLI**: It is necessary to have setup the React Native development environment, please follow instructions in the correspondend tab in the page [React Native CLI](https://reactnative.dev/docs/environment-setup)

### Backend setup

This project relies on backend services that are deployed to AWS using Serverless Framework. These services interact with OpenAI API to fetch course indexes and quiz data.

To setup and deploy these services, please follow the instructions in the [s2e-backend repository](https://github.com/jparraporcar/s2e-backend).

Once the backend is deployed, you need to create a new file .env in the root of the app with the two endpoints coming from the backend:

```
INDEX_API_URL=xxx
SECTION_API_URL=xxx
```

### Installing

1. **Clone the repo**: Clone this repository to your local machine.

   ```
   git clone https://github.com/jparraporcar/s2e.git
   ```

2. **Navigate to the cloned directory**: Use the command line to navigate into the directory you just cloned.

   ```
   cd s2e
   ```

3. **Install npm packages**: Run `npm install` to install all the dependencies defined in the package.json file.

   ```
   npm install
   ```
4. **Install pods**: Go to the /ios folder and execute the following command

   ```
   pod install
   ```

5. **Start the metro bundler**: 

   ```
   npm start
   ```

6. **Start the iOS application**: In a different terminal window, run `npx react-native run-ios` to start the iOS application. The simulator should start automatically once the build is complete.

   ```
   npx react-native run-ios
   ```

## Technologies

This project is created with:

- [React Native](https://reactnative.dev/) - A popular framework for building native mobile applications using JavaScript and React.
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps.
- [Redux Persist](https://github.com/rt2zz/redux-persist) - A library to persist and rehydrate a redux store.
- [Async Storage](https://github.com/react-native-async-storage/async-storage) - An asynchronous, unencrypted, persistent, key-value storage system for React Native.
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.
- [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
- [React Navigation](https://reactnavigation.org/) - Routing and navigation for React Native apps.
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Customizable Icons for React Native.
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference.
- [React Native Background Timer](https://github.com/ocetnik/react-native-background-timer) - Emit event periodically in the background.
- [React Native Config](https://github.com/luggit/react-native-config) - Module to expose config variables to your javascript code in React Native.
- [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler) - Declarative API exposing platform native touch and gesture system to React Native.
- [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated) - React Native's Animated library reimplemented.
- [React Native Toast Message](https://github.com/calintamas/react-native-toast-message) - A toast message component for React Native.
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale.

## Usage

<figure>
  <figcaption>App flow</figcaption>
  <br />
  <br />
  <img src="./screenshots/app-flow.jpg" alt="App flow">
</figure>

## Contact

If you want to contact me you can reach me at:

- **Name**: `Jordi Parra Porcar`
- **Email**: `jordiparraporcar@gmail.com`
- **LinkedIn**: [`Jordi Parra Porcar`](https://www.linkedin.com/in/jordiparraporcar/)
