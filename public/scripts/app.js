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

let app = new Vue({
    el: "#app",
    data: {
        activeLight: "light_1",
        lights: {
            light_1: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
            light_2: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
            light_3: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
            light_4: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
            light_5: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
            light_6: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
            light_7: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
            light_8: {
                color: "",
                left: "",
                top: "",
                rotated: false
            },
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

                let lightElements = $('.light');

                lightElements.draggable({
                    grid: [10, 10],
                    stop: function (event) {
                        let target = $(event.target);

                        let light = "light_"+target.data('name');

                        app.lights[light].top = target.prop('style').top;
                        app.lights[light].left = target.prop('style').left;
                    }
                });
            });
        });
    },
    methods: {
        lightStyle: function (light) {
            let background = light.color;

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

            let style = "border-bottom-color: #"+background+"; color: "+color;

            style += "; top: ";
            style += light.top;
            style += "; ";
            style += "left: ";
            style += light.left;
            style += ";";

            return style;
        },

		onColorChange:_.debounce( function (colorCode) {
			this.lights[this.activeLight].color = colorCode;
		}, 500)
    },
    watch: {
        lights: {
            handler:_.debounce( function () {
                lights.set(app.lights);
            }, 500),
            deep: true
        }
    }
});

