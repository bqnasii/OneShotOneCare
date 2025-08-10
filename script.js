let videoElement = null;
let currentStream = null;
let currentFacingMode = 'environment'; // กล้องหลังเริ่มต้น

function init() {
  const constraints = {
    video: {
      facingMode: currentFacingMode
    }
  };

  const container = document.getElementById('webcam-container');
  container.innerHTML = ''; // เคลียร์เก่า

  videoElement = document.createElement('video');
  videoElement.setAttribute('autoplay', true);
  videoElement.setAttribute('playsinline', true);
  videoElement.style.maxWidth = '100%';

  container.appendChild(videoElement);

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      videoElement.srcObject = stream;
    })
    .catch(err => {
      console.error('ไม่สามารถเข้าถึงกล้องได้:', err);
      alert('ไม่สามารถเปิดกล้องได้ กรุณาอนุญาตการเข้าถึงกล้อง');
    });
}

function switchCamera(facingMode) {
  currentFacingMode = facingMode;

  // ปิด stream เก่า
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  init();
}

function captureImage() {
  if (!videoElement) return;

  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const context = canvas.getContext('2d');
  context.drawImage(videoElement, 0, 0);

  const imageData = canvas.toDataURL('image/png');
  document.getElementById('label-container').innerHTML = `
    <p>📷 ภาพถ่ายจากกล้อง</p>
    <img src="${imageData}" style="max-width: 100%; border: 1px solid #ccc;" />
  `;
}

function backToScan() {
  document.getElementById('disease-info').style.display = 'none';
}

function showDisease(name) {
  document.getElementById('disease-info').style.display = 'block';
  document.getElementById('disease-content').innerHTML = `<h4>${name}</h4><p>คำอธิบายของโรค ${name} จะมาแสดงตรงนี้</p>`;
}
