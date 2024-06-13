import { loadOpenCv, MotionDetection } from 'https://github.com/kazu-iroiro/Image-Recognition-Red-LED/raw/main/MotionDetection.js';

window.Module = {
  onRuntimeInitialized() {
    const medias = {
      audio: false,
      video: {
        facingMode: 'user'
      }
    };

    navigator.mediaDevices.getUserMedia(medias).then(successCallback)
                                               .catch(errorCallback);
  }
};

function successCallback(stream) {
  const video = document.querySelector('video');
  const txt = document.getElementById('txt');
  const display_color = document.getElementById('display');
  const picture = document.getElementById('pic');
  const redCanvas = document.createElement('canvas');
  redCanvas.id = 'redCanvas';
  document.body.appendChild(redCanvas);

  const fps = 8;

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

  video.oncanplay = () => {
    new MotionDetection({
      video,
      onMove,
      onStop,
      fps,
      redCanvas
    });
  };

  async function onMove() {
    // txt.innerText = 'MOVE';
    // display_color.style.backgroundColor = "white";
    picture.style.opacity = 1;
    sendJsonData(Math.round( new Date().getTime() / 1000 ),10);
    await sleep(2000)
  }
  
  function onStop() {
    txt.innerText = '';
    display_color.style.backgroundColor = "black";
    picture.style.opacity = 0;
  }

  video.srcObject = stream;
}

function errorCallback(err) {
  alert(err);
};

function sendJsonData(currentTime, number) {
  google.script.run.withSuccessHandler(success).registData(currentTime,number)
  function success(success) {
    console.log("Success!")}
}

loadOpenCv();
