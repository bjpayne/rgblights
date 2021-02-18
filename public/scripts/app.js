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
        lights: {
            light_1: {
                color: "",
                active: false,
                rotation: 0
            },
            light_2: {
                color: "",
                active: false,
                rotation: 0
            },
            light_3: {
                color: "",
                active: false,
                rotation: 0
            },
            light_4: {
                color: "",
                active: false,
                rotation: 0
            },
            light_5: {
                color: "",
                active: false,
                rotation: 0
            },
            light_6: {
                color: "",
                active: false,
                rotation: 0
            },
            light_7: {
                color: "",
                active: false,
                rotation: 0
            },
            light_8: {
                color: "",
                active: false,
                rotation: 0
            },
        }
    },
    mounted: function () {
        let app = this;

        app.$nextTick(function () {
            lights.once('value').then((snapshot) => {
                for (let i = 1; i <= 8; i++) {
                    let light = "light_"+i;

                    app.lights[light].color = snapshot.val()[light];
                }

                let lightElements = $('.light');

                lightElements.draggable({snap: '.light'});

                // let canvas = $('#canvas');
                //
                // canvas.attr("width", canvas.width());
                // canvas.attr("height", canvas.height());
                //
                // let stage = new createjs.Stage(canvas.get(0));
                //
                // let x = 500, y = 100;
                //
                // for (const light in app.lights) {
                //     let shape = new createjs.Shape();
                //
                //     let color = app.lights[light];
                //
                //     shape.graphics.beginFill(color)
                //         .drawPolyStar(x, y, 100, 3, 0, -90);
                //
                //     stage.addChild(shape);
                //
                //     shape.on("pressmove",function(evt) {
                //         // currentTarget will be the container that the event listener was added to:
                //         evt.currentTarget.x = evt.stageX;
                //         evt.currentTarget.y = evt.stageY;
                //         // make sure to redraw the stage to show the change:
                //         stage.update();
                //     });
                //
                //     y += 100;
                //
                //     stage.update();
                // }
            });

            lights.on('child_changed', (data) => {
                app.lights[data.key].color = data.val();
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

            let style = "border-bottom-color: #"+background+"; color: "+color;

            return style;
        },
    },
});

