let currentStream = null;

// สลับกล้อง
function switchCamera(facingMode) {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }
  const constraints = {
    video: { facingMode: facingMode }
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      const videoContainer = document.getElementById('webcam-container');
      videoContainer.innerHTML = ''; // เคลียร์ก่อน
      const video = document.createElement('video');
      video.autoplay = true;
      video.srcObject = stream;
      videoContainer.appendChild(video);
    })
    .catch(err => {
      alert('ไม่สามารถเปิดกล้องได้: ' + err.message);
    });
}

// เริ่มสแกน (เปิดกล้องโดย default)
function init() {
  switchCamera('environment'); // เริ่มด้วยกล้องหลัง (เปลี่ยนได้)
}

// ถ่ายภาพจากวิดีโอ
function captureImage() {
  const video = document.querySelector('#webcam-container video');
  if (!video) {
    alert('กล้องยังไม่เปิด');
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);
  const imageDataUrl = canvas.toDataURL('image/png');

  // แสดงภาพ หรือประมวลผลต่อ
  alert('ถ่ายภาพสำเร็จ!');
  // หรือแสดงใน #label-container
  const labelContainer = document.getElementById('label-container');
  labelContainer.innerHTML = `<img src="${imageDataUrl}" alt="captured image" style="max-width: 100%;">`;
}

// หยุดกล้อง
function stopWebcam() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  document.getElementById('webcam-container').innerHTML = '';
  document.getElementById('label-container').innerHTML = '';
}

// แสดงข้อมูลโรคตามชื่อ
function showDisease(diseaseName) {
  const diseaseInfo = document.getElementById('disease-info');
  const diseaseContent = document.getElementById('disease-content');

  // ตัวอย่างข้อมูล (เติมรายละเอียดจริงได้)
  const diseases = {
    'ติดเชื้อแบคทีเรีย': 'ข้อมูลโรคติดเชื้อแบคทีเรีย...',
    'ตุ่มนูนแดงบวม': 'ข้อมูลตุ่มนูนแดงบวมจากแมลง...',
    'ตุ่มน้ำพอง': 'ข้อมูลตุ่มน้ำพอง...',
    // ... เพิ่มข้อมูลโรคอื่น ๆ ตามต้องการ
  };

  diseaseContent.textContent = diseases[diseaseName] || 'ข้อมูลโรคไม่พบ';
  diseaseInfo.style.display = 'block';
  document.querySelector('.scan-section').style.display = 'none';
  document.querySelector('.disease-list').style.display = 'none';
}

// กลับไปหน้าสแกน
function backToScan() {
  document.getElementById('disease-info').style.display = 'none';
  document.querySelector('.scan-section').style.display = 'block';
  document.querySelector('.disease-list').style.display = 'block';
}
