
var analyser, dataArray, bufferLength, canvasCtx, canvas;

function draw() {

  requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200, 200, 200)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0, 0, 0)";

  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

window.onload = function() {
  // create web audio api context
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  analyser = audioCtx.createAnalyser();

  analyser.fftSize = 2048;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  // Get a canvas defined with ID "oscilloscope"
  canvas = document.getElementById("oscilloscope");
  canvasCtx = canvas.getContext("2d");

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  var gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(293.7, audioCtx.currentTime); // value in hertz
  var nodeOscillator = oscillator.connect(gainNode);
  gainNode.gain.value = 0.3;

  var oscillator2 = audioCtx.createOscillator();

  var gainNode2 = audioCtx.createGain();
  var delayNode = audioCtx.createDelay(90);

  oscillator2.type = 'sine';
  oscillator2.frequency.setValueAtTime(293.7, audioCtx.currentTime); // value in hertz
  var nodeOscillator2 = oscillator2.connect(gainNode2).connect(delayNode);
  gainNode2.gain.value = 0.1;

  nodeOscillator.connect(nodeOscillator2).connect(analyser).connect(audioCtx.destination);

  oscillator.start();
  oscillator2.start();

  document.querySelector('button').addEventListener('click', function() {
    audioCtx.resume().then(() => {
      draw();
      gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + 0.14);
      gainNode2.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.14);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.14);
      gainNode2.gain.exponentialRampToValueAtTime(0.4, audioCtx.currentTime + 1.14);
      setTimeout(() => {
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.14);
        gainNode2.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.14);
      }, 3000);
    });
  });
}