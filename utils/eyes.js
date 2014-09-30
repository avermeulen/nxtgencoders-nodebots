var five = require("johnny-five");

var Eyes = function (servoPin, sonarPin) {

  var servo = new five.Servo({
    pin: servoPin,
    range: [0, 180],
    startAt: 0
  }),
  sonar = new five.Ping({
    pin : sonarPin,
    pulse : '200'
  });


  /*
    sonar.on('change', function(){
      console.log('--> ' + sonar.cm)
      if (this.cm < 5){
        console.log('****************')
        //self.stop();
      }
    });
  */


  this.context = {
    servo : servo,
    sonar : sonar
  }

  var intervalToken = null;

  this.center = function (argument) {
    servo.center();  
  }

  this.look = function (orientation, cb) {
    switch(orientation){
      case 'left' :
        //cb('left', sonar.cm);
        servo.max();
        break;
      case 'right' :
        servo.min();
        break;
      case 'forward' :
        servo.center();
        break;
    }

    if (cb){
      setTimeout(function() {
          cb(sonar.cm)
      }, 750);
    }

  }

  this.monitor = function (cb) {
    intervalToken = setInterval(function() {
      cb(sonar.cm);
    }, 500);
  }

  this.getDistance = function(){
    return sonar.cm;
  }


  this.stopMonitoring = function () {
    clearInterval(intervalToken);
  }
}

module.exports = Eyes;