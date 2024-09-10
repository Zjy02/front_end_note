var localDevice = null
const localVideo = document.querySelector('#localVideo')

function handleError() {
  // alert("摄像头无法正常使用，请检查是否占用或缺失")
  console.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

async function initInnerLocalDevice() {
  localDevice = {
    audioIn: [],
    videoIn: [],
    audioOut: []

  }
  let constraints = {
    video: true,
    audio: true
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("浏览器不支持获取媒体设备");
    return;
  }
  console.log(await navigator.mediaDevices.getUserMedia(constraints));
  console.log(await navigator.mediaDevices.enumerateDevices());
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    stream.getTracks().forEach(trick => {
      trick.stop()
    })
    // List cameras and microphones.
    window.navigator.mediaDevices.enumerateDevices()
      .then(function (devices) {
        console.log(devices);

        devices.forEach(function (device) {
          let obj = { id: device.deviceId, kind: device.kind, label: device.label }
          if (device.kind === 'audioinput') {
            if (localDevice.audioIn.filter(e => e.id === device.deviceId).length === 0) {
              localDevice.audioIn.push(obj)
            }
          } if (device.kind === 'audiooutput') {
            if (localDevice.audioOut.filter(e => e.id === device.deviceId).length === 0) {
              localDevice.audioOut.push(obj)
            }
          } else if (device.kind === 'videoinput') {
            if (localDevice.videoIn.filter(e => e.id === device.deviceId).length === 0) {
              localDevice.videoIn.push(obj)
            }
          }
        });
      })
      .catch(handleError);
  }).then(() => {
    console.log(localDevice)
    console.log("audioIn", localDevice.audioIn)
    console.log("audioOut", localDevice.audioOut)
    console.log("videoIn", localDevice.videoIn)
  })
    .catch(handleError);
}

async function startVideo() {
  let audioId = localDevice.audio
  let videoId = localDevice.videoId

  const constraints = {
    audio: { deviceId: audioId ? { exact: audioId } : undefined },
    video: {
      deviceId: videoId ? { exact: videoId } : undefined,
      width: 1080,
      height: 720,
      frameRate: { ideal: 60, max: 60 }
    }
  };
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  return await navigator.mediaDevices.getUserMedia(constraints)
}

initInnerLocalDevice()


let stream = localVideo.srcObject
if (stream) {
  stream.getAudioTracks().forEach(e => {
    stream.removeTrack(e)
  })
  stream.getVideoTracks().forEach(e => {
    stream.removeTrack(e)
  })
}

startVideo().then(newStream => {
  localVideo.srcObject = newStream
  localVideo.muted = true
})
