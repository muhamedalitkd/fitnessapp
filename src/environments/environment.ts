// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://localhost:8084/'
  firebaseConfig : {
    apiKey: "AIzaSyAyATPhrNMFc5wXZovi8wZwcdQhSpfhXxU",
    authDomain: "fitnessapp-bf530.firebaseapp.com",
    projectId: "fitnessapp-bf530",
    storageBucket: "fitnessapp-bf530.appspot.com",
    messagingSenderId: "519367266340",
    appId: "1:519367266340:web:97f5d32b051eac940b08b1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
