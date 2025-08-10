let video = null;
let stream = null;
let currentFacingMode = 'environment'; // กล้องหลังเริ่มต้น

function init() {
  const constraints = {
    video: { facingMode: currentFacingMode }
  };

  const container = document.getElementById('webcam-container');
  container.innerHTML = '';

  video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  video.style.maxWidth = '100%';

  container.appendChild(video);

  navigator.mediaDevices.getUserMedia(constraints)
    .then(mediaStream => {
      stream = mediaStream;
      video.srcObject = mediaStream;
    })
    .catch(err => {
      alert('ไม่สามารถเปิดกล้องได้: ' + err.message);
    });
}

function switchCamera(facingMode) {
  currentFacingMode = facingMode;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  init();
}

function captureImage() {
  if (!video) return;

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);

  const imgData = canvas.toDataURL('image/png');

  const labelContainer = document.getElementById('label-container');
  labelContainer.innerHTML = `
    <p>📷 ภาพถ่ายจากกล้อง:</p>
    <img src="${imgData}" style="max-width: 100%; border: 1px solid #ccc;" />
  `;
}

function stopWebcam() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }

  const container = document.getElementById('webcam-container');
  container.innerHTML = '<p>กล้องถูกปิดแล้ว</p>';
}

function backToScan() {
  document.getElementById('disease-info').style.display = 'none';
}

function showDisease(name) {
  const info = document.getElementById('disease-info');
  const content = document.getElementById('disease-content');
  info.style.display = 'block';
  content.innerHTML = `<h4>${name}</h4><p>คำอธิบายเกี่ยวกับโรค ${name} จะแสดงตรงนี้</p>`;
}

