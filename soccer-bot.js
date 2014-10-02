// =======================
// Sumobot Jr demo program
// =======================

var five = require("johnny-five");
var keypress = require('keypress');
var Robot = require('./utils/servo-robot');

keypress(process.stdin);

//var board = new five.Board();
//var board = new five.Board({ port: "/dev/tty.Goetze-DevB"}); //yellow
var board = new five.Board(
  //{ port: "/dev/tty.COLIN-LEE-DevB"}
);
//var board = new five.Board({ port: "/dev/tty.KhayaBot-DevB"});
//var board = new five.Board({ port: "/dev/tty.OptiBot-DevB"});

//var board = new five.Board({ port: "/dev/tty.VivaBot-DevB"}); //green

board.on("ready", function() {

  console.log("Welcome to Sumobot Jr!")
  console.log("Control Soccerbot with the arrow keys, and SPACE to stop.")

  //var left_wheel  = new five.Servo({ pin: 10, type: 'continuous' }).stop();
  var left_wheel  = new five.Servo({ pin: 12, type: 'continuous' }).stop();
  var right_wheel = new five.Servo({ pin: 13, type: 'continuous'  }).stop();
  var robot = new Robot(left_wheel, right_wheel);

  process.stdin.resume(); 
  process.stdin.setEncoding('utf8'); 
  process.stdin.setRawMode(true); 

  process.stdin.on('keypress', function (ch, key) {
    
    if ( !key ) return;
    if ( key.name == 'q' ) {

      console.log('Quitting');
      process.exit();

    } else if ( key.name == 'down' ) {

      console.log('Forward');
      robot.forward();
      
      //robot.move('forward', 1500);

    } else if ( key.name == 'up' ) {

      console.log('Backward');
      robot.reverse()    

    } else if ( key.name == 'left' ) {
      console.log('Left');   
      robot.left();

    } else if ( key.name == 'right' ) {

      console.log('Right');
      robot.right(); 

    } else if ( key.name == 'space' ) {

      console.log('Stopping');
      robot.stop();

    }


  });


});
