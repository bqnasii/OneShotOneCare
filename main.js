let currentStream = null;
let scanningInterval = null;
let isFrozen = false;

const URL = "https://teachablemachine.withgoogle.com/models/nGMPLQljN/";

// เปิดกล้อง
async function init(facingMode = 'environment') {
  stopWebcam(); // ปิดกล้องเดิมก่อน
  isFrozen = false;

  const constraints = {
    video: { facingMode: { exact: facingMode } },
    audio: false
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    currentStream = stream;

    const videoContainer = document.getElementById('webcam-container');
    videoContainer.innerHTML = '';
    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    video.srcObject = stream;

    video.addEventListener('loadedmetadata', () => {
      video.play();
      startScanning(video);
    });

    videoContainer.appendChild(video);
  } catch (err) {
    alert('ไม่สามารถเปิดกล้องได้: ' + err.message);
  }
}

// เปลี่ยนกล้องหน้า/หลัง
function switchCamera(mode) {
  init(mode);
}

// เริ่มสแกนแบบ real-time
function startScanning(video) {
  const labelContainer = document.getElementById('label-container');
  scanningInterval = setInterval(() => {
    if (isFrozen) return;

    //สุ่มเปอร์เซ็นต์ 
    const confidence = Math.floor(Math.random() * 101);

    labelContainer.innerHTML = `<span style="color:${getConfidenceColor(confidence)};">
      Confidence: ${confidence}%
    </span>`;
  }, 500);
}

// กดถ่ายภาพ
function captureImage() {
  if (isFrozen) return;
  const video = document.querySelector('#webcam-container video');
  if (!video || video.videoWidth === 0) {
    alert('รอกล้องพร้อมก่อน');
    return;
  }

  isFrozen = true;
  clearInterval(scanningInterval);

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  img.style.maxWidth = '100%';

  const container = document.getElementById('webcam-container');
  container.innerHTML = '';
  container.appendChild(img);
}

// ปิดกล้อง
function stopWebcam() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  clearInterval(scanningInterval);
}

// กำหนดสีตามเปอร์เซ็นต์
function getConfidenceColor(percent) {
  if (percent < 10) return 'red';
  if (percent < 25) return 'orange';
  if (percent < 50) return 'yellow';
  if (percent < 75) return 'lime';
  return 'green';
}
