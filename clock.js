
var Clock = function Clock () {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 70;
	var hourHandLength = radius / 2;
	var minuteHandLength = radius  * 0.9;
	var tickMarkStart = radius * 0.8;

	function getAngles() {
		var time = new Date();
		return {
			hours: getAngleForHours(time),
			minutes: getAngleForMinutes(time),
			time: time
		}
	}

	function getAngleForHours(time) {
		var hardHourAngle = (time.getHours() % 12) * 30; // 360 / 12;
		var minuteSlip = time.getMinutes() * 0.5; // ((360 / 12) / 60) 
		// have to subtrack 90 degrees because of clock orientation 
		return (hardHourAngle + minuteSlip - 90) *  Math.PI / 180; //minuteSlip) 
	}

	function getAngleForMinutes(time) {
		var hardMinuteAngle = time.getMinutes() * 6;  // (360 / 60) 
		var secondsSlip = time.getSeconds() * 0.1; // ((360 / 60) / 60)
		// have to subtrack 90 degrees because of clock orientation 
		return (hardMinuteAngle + secondsSlip - 90) * Math.PI / 180;
	}

	function startTicking() {
		function drawIt() {
			drawClock();
			setTimeout(drawIt, 200);
		}
		drawIt();
	}

	function clearCanvas() {
		// Store the current transformation matrix
		context.save();

		// Use the identity matrix while clearing the canvas
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Restore the transform
		context.restore();
	}

	var tick_color = "#009b95";
	var face_color = '#33CDC7';
	var hand_color = '#006561';

	function drawClock() {
		clearCanvas();
		drawClockFace();
		drawTicks();
		drawHands();
		drawCenterDot()
	}

	function drawClockFace() {
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = face_color;
		context.fill();

		context.lineWidth = 5;
		context.strokeStyle = hand_color;
		context.stroke();
	}

	function drawCenterDot() {
		context.beginPath();
		context.arc(centerX, centerY, 1, 0, 2 * Math.PI, false);
		context.fillStyle = face_color;
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = hand_color;
		context.stroke();
	}

	function drawHands() {
		context.beginPath();
		context.lineWidth = 5;
		var angles = getAngles();
		context.strokeStyle = hand_color;
		//debugger;
   		context.moveTo(centerX, centerY);
	   	context.lineTo(minuteHandLength * Math.cos(angles.minutes) + centerX, minuteHandLength * Math.sin(angles.minutes) + centerY);
	   	context.stroke();

		context.moveTo(centerX, centerY);
	   	context.lineTo(hourHandLength * Math.cos(angles.hours) + centerX, hourHandLength * Math.sin(angles.hours) + centerY); 
	   	context.stroke()
	}

	function drawTicks() {
		var hour_diff_angle = 30;
		context.lineWidth = 3;
		context.strokeStyle = tick_color;

		var radians = 0;
		for (var i = 0; i < 12; ++i) {
			radians = i * hour_diff_angle * Math.PI / 180;
			context.moveTo(tickMarkStart * Math.cos(radians) + centerX, tickMarkStart * Math.sin(radians) + centerY);
	   		context.lineTo(minuteHandLength * Math.cos(radians) + centerX, minuteHandLength * Math.sin(radians) + centerY);
	   		context.stroke();
		}
	}

	return {
		startTicking: startTicking
	}
}().startTicking();


