"use strict";

var five = require("johnny-five"),
  Wheel = require("./utils/hbridge-wheel"),
  Robot = require("./utils/robot"),
  Eyes = require("./utils/eyes"),
  Orientate = require("./utils/orientate.js"),
  
  temporal = require('temporal'),
  array = require('array-extended'),
  keypress = require('keypress'),
  board = new five.Board({
    //port : "/dev/tty.CAPEBOT-DevB"
  });

// The board's pins will not be accessible until
// the board has reported that it is ready

board.on("ready", function() {

  var wheel1 = new Wheel(9, 8),
      wheel2 = new Wheel(6,7);

  var robot = new Robot(wheel1, wheel2, new Eyes(13, 12));

  this.repl.inject({
    robot : robot
  });


  keypress(process.stdin);

  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);

    if (!key.ctrl)
    {
      switch(key.name){
        case "up":
          robot.direction("forward", 250);
          break;
        case "down":
          robot.direction("reverse", 250);
          break;  
        case "left":
        case "right":
          robot.direction(key.name, 250);
      }
    }
        
    if (key && key.ctrl && key.name == 'c') {
      //process.stdin.pause();
      robot.eyes.center();
    }
    
    if (key && key.ctrl && key.name == 's') {
      //process.stdin.pause();
      //robot.eyes.center();
      robot.eyes.center();

      temporal.loop(6000, function () {
            
        var orientate = new Orientate(robot);
        orientate.do(function (orientations) {
          console.log(orientations);
          array.max(orientations, 'distance');
          
          var maxDistance = array.max(orientations, 'distance');
          
          var minDistance = array.min(orientations, 'distance');

          if (minDistance.direction === "forward"){
            robot.direction("reverse", 500);
          }
          else{
            robot.direction(maxDistance.direction, 500);
          }
        });

      });

    }

  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  /*

  
  */

});


// Schematic
// http://arduino.cc/en/uploads/Tutorial/ExampleCircuit_bb.png
