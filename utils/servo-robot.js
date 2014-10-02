var Robot = function(left_wheel, right_wheel, eyes){
  
  this.eyes = eyes;

  this.forward = function(){
      //console.log('Forward');
      left_wheel.ccw(0.5);
      right_wheel.cw(0.5);
    }

    this.reverse = function(){
      //console.log('Backward');
      left_wheel.cw(0.5);
      right_wheel.ccw(0.5); 
    }

    this.left = function(){
      //console.log('Left');   
      left_wheel.cw(0.5);
      right_wheel.cw(0.5); 
    }

    this.right = function(){
      //console.log('Right');
      left_wheel.ccw(0.5);
      right_wheel.ccw(0.5); 
    }

    this.stop = function(){
      //console.log('Stopping');
      left_wheel.stop();
      right_wheel.stop();
    }

  this.direction = function (actionName, duration) {
    var self = this;
    var action = this[actionName];
    action();
    if (duration){
      setTimeout(function() {
        self.stop();
      }, duration);
    }
  }
}

module.exports = Robot;