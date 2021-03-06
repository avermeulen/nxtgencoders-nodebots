"use strict";

var five = require("johnny-five"),
  Wheel = require("./utils/hbridge-wheel"),
  Robot = require("./utils/servo-robot"),
  
  //Eyes = require("./utils/eyes"),
  //Orientate = require("./utils/orientate.js"),
  
  temporal = require('temporal'),
  array = require('array-extended'),
  keypress = require('keypress'),
  board = new five.Board({
    port : "/dev/tty.CAPEBOT2-DevB"
  });

// The board's pins will not be accessible until
// the board has reported that it is ready

board.on("ready", function() {

  /*
  var wheel1 = new Wheel(9, 8, 140),
      wheel2 = new Wheel(6, 7, 140);
  */

  var left_wheel  = new five.Servo({ pin: 9, type: 'continuous' }).stop();
  var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  }).stop();
  var robot = new Robot(left_wheel, right_wheel);


  var servo = new five.Servo({
    pin: 11,
    range: [0, 180],
    startAt: 0
  });
      
  this.repl.inject({
    robot : robot,
    servo : servo,
    left_wheel : left_wheel,
    right_wheel : right_wheel
  });

  servo.center();

  keypress(process.stdin);

  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    //console.log('got "keypress"', key);

    if (!key)
      return;

    if (!key.ctrl)
    {
      switch(key.name){
        case "up":
          robot.direction("forward");
          break;
        case "down":
          robot.direction("reverse");
          break;  
        case "left":
        case "right":
          robot.direction(key.name);
          break;
        case "space":
          robot.stop();
      }
    }
        
        
    if (key && key.ctrl && key.name == 'c') {
      //process.stdin.pause();
      servo.center();
    }
    
    if (key && key.shift && key.name == 'd') {
      //process.stdin.pause();
      servo.max();
    }


    if (key && key.shift && key.name == 'u') {
      //process.stdin.pause();
      servo.center();
    }


    

    });

  process.stdin.setRawMode(true);
  process.stdin.resume();

});


// Schematic
// http://arduino.cc/en/uploads/Tutorial/ExampleCircuit_bb.png
