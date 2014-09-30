var Wheel = function(pinNr1, pinNr2){
    var pin1 =  new five.Pin(pinNr1),
        pin2 = new five.Pin(pinNr2);

    this.stop = function(){
      pin1.low();
      pin2.low();
    }

    this.forward = function(){
      pin1.high();
      pin2.low();
    }

    this.reverse = function(){
      pin1.low();
      pin2.high();
    }
};

module.exports = Wheel