// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBDaaxUHra0Oyw5MMgizBkfi9JRZkQtKJc",
    authDomain: "rgb-lights-a302c.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://rgb-lights-a302c-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
});

// Get a reference to the lights object
let lights = firebase.database().ref('users/teamb/lights/');


new Vue({
    el: "#app",
    data: {
        lights: {
            light_1: "",
            light_2: "",
            light_3: "",
            light_4: "",
            light_5: "",
            light_6: "",
            light_7: "",
            light_8: "",
        }
    },
    mounted: function () {
        let app = this;

        app.$nextTick(function () {
            lights.once('value').then((snapshot) => {
                for (let i = 1; i <= 8; i++) {
                    let light = "light_"+i;

                    app.lights[light] = snapshot.val()[light];
                }
            });

            lights.on('child_changed', (data) => {
                app.lights[data.key] = data.val();
            });
        });
    },
    methods: {
        lightStyle: function (background) {
            // If a leading # is provided, remove it
            if (background.slice(0, 1) === '#') {
                background = background.slice(1);
            }

            // Convert to RGB value
            let r = parseInt(background.substr(0,2),16);
            let g = parseInt(background.substr(2,2),16);
            let b = parseInt(background.substr(4,2),16);

            // Get YIQ ratio
            let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

            // Check contrast
            let color = (yiq >= 128) ? '#000' : '#fff';

            let style = "background: #"+background+"; color: "+color;

            return style;
        },
    },
});

