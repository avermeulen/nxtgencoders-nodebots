var temporal = require('temporal'),
    orientationAction = function(direction, robot, orientationRegistry){
      return [
        {
        delay : 500,
        task : function () {
            robot.eyes.look( direction, function (argument) {
            
            });
          }
        },
        {
          delay : 1000,
          task : function () {
            orientationRegistry.push({"direction" : direction, "distance" : robot.eyes.getDistance()})
          }
        }
      ];
    };

var Orientate = function (robot) {
  var orientations = [];

  var taskQueue = orientationAction('left', robot, orientations);
  taskQueue = taskQueue.concat(orientationAction('forward', robot, orientations));
  taskQueue = taskQueue.concat(orientationAction('right', robot, orientations));

  this.do = function (cb) {

    taskQueue.push({
      delay : 500,
      task : function() {
        cb(orientations);
      }
    });
    temporal.queue(taskQueue);
  }
}

module.exports = Orientate;

  