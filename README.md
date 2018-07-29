# mdh-s2t-demo

This is a demonstration app for [Google's speech to text api](https://cloud.google.com/speech-to-text/). It's a firebase angular application.

## Setup

I've removed my environment files from source control so you'll need to create some of your own. Create the /src/environments directory and add an environment.ts and an environment.prod.ts that looks like the below:
`export const environment = {
    production: false,
    firebase: {
      apiKey: "xxx",
      authDomain: "xxx.firebaseapp.com",
      databaseURL: "https://xxx.firebaseio.com",
      projectId: "xxx",
      storageBucket: "gs://xxx.appspot.com",
      messagingSenderId: "xxx"
    }
  };
`

Details on how to get the settings for this file can be found in the [firebase documentation](https://firebase.google.com/docs/storage/web/start)

You will also need to update .firebaserc with the correct project name

## Running Locally - excluding firebase function
The project can be run locally using the `ng serve` command

## Deploying to firebase
The project can be deployed to your firebase project with `firebase --project <your project> deploy`
