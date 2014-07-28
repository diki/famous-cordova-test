define(function(require, exports, module) {
    var Easing = require('famous/transitions/Easing');
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Modifier = require('famous/core/Modifier');
    var Surface = require('famous/core/Surface');
    var Transitionable = require('famous/transitions/Transitionable');
    var Transform = require('famous/core/Transform');
    var Scrollview = require('famous/views/Scrollview');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ViewSequence = require('famous/core/ViewSequence');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(500);

    var PI = 3.14159265359;

    var transitonable = new Transitionable(0);

    function degToRad(degrees) {
        return degrees * PI / 180;
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {}

    var surfaces = [];
    var scrollview = new Scrollview({
        margin: 180
    });

    Engine.pipe(scrollview);

    var viewSequence = new ViewSequence({
        array: surfaces,
        loop: true
    });
    scrollview.sequenceFrom(viewSequence);

    var size = [300, 100];

    var centerModifier = new StateModifier({
        size: size,
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    mainContext.add(centerModifier).add(scrollview);

    for (var i = 0; i < 40; i++) {
        var surface = new Surface({
            size: size,
            content: 'Surface ' + i,
            properties: {
                textAlign: 'center',
                lineHeight: '100px',
                color: 'white',
                backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
            }
        });

        surfaces.push(surface);
    }

    scrollview.outputFrom(function(offset) {
        return Transform.moveThen([0, -50, 350], Transform.rotateX(-0.004 * offset));
    });

    var logo = new ImageSurface({
        size: [100, 100],
        content: 'http://code.famo.us/assets/famous_logo.svg',
        classes: ['double-sided']
    });

    var text = new Surface({
        size: [300, 200],
        content: 'famous + cordova map'
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        origin: [0.5, 0.5],
        align: [0.85, 0.1],
        transform: function() {
            return Transform.rotateY(.002 * (Date.now() - initialTime));
        }
    });

    var textModifier = new Modifier({
        origin: [0.5, 0.0],
        align: [0.5, 0.0]
    });

    mainContext.add(textModifier).add(text);
    mainContext.add(centerSpinModifier).add(logo);
});
