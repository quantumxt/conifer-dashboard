
// Connect to ROS.
var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

var el = document.getElementById('rosnet');
var vspd = document.getElementById('spd');
var vgoal = document.getElementById('dist');



ros.on('connection', function() {
   console.log('Connected to websocket server.');
            el.style.color = "white";
            el.style.background = "green";
            el.style.padding = "5px";
            el.innerHTML = 'Online';

 });

 ros.on('error', function(error) {
   console.log('Error connecting to websocket server: ', error);
   el.style.color = "white";
   el.style.background = "red";
   el.style.padding = "5px";
   el.innerHTML = 'Error';

 });

 ros.on('close', function() {
   console.log('Connection to websocket server closed.');
   el.style.color = "white";
   el.style.background = "Orange";
   el.style.padding = "5px";
   el.innerHTML = 'Offline';

 });

 // Publishing a Topic
  /* ------------------

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });

  var twist = new ROSLIB.Message({
    linear : {
      x : 0.1,
      y : 0.2,
      z : 0.3
    },
    angular : {
      x : -0.1,
      y : -0.2,
      z : -0.3
    }
  });
  cmdVel.publish(twist);

*/

  // Subscribers

  //Speed
  var tSpd = new ROSLIB.Topic({
    ros : ros,
    name : '/speed',
    messageType : 'std_msgs/Int8'
  });

  tSpd.subscribe(function(message) {
    console.log('Received speed on ' + tSpd.name + ': %i',message.data);
    vspd.innerHTML = parseInt(message.data);
    //tSpd.unsubscribe();
  });

  //Distance to goal
  var tGoal = new ROSLIB.Topic({
    ros : ros,
    name : '/tgoal',
    messageType : 'std_msgs/Int8'
  });

  tGoal.subscribe(function(message) {
    console.log('Received distance to goal on ' + tGoal.name + ': %i',message.data);
    vgoal.innerHTML = parseInt(message.data);
  });