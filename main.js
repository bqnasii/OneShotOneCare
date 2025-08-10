const URL = "https://teachablemachine.withgoogle.com/models/nGMPLQljN/";
let model, labelContainer, maxPredictions;
let currentStream = null;
let scanningInterval = null;
let isFrozen = false;
let lastSpokenLabel = "";


// โหลดโมเดล Teachable Machine
async function loadModel() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "";
  for (let i = 0; i < maxPredictions; i++) {
    const div = document.createElement("div");
    div.className = "prediction";
    labelContainer.appendChild(div);
  }

  console.log("✅ โหลดโมเดลสำเร็จ");
}

// เริ่มเปิดกล้องและโหลดโมเดล
async function init(facingMode = 'environment') {
  await loadModel(); // โหลดโมเดลก่อน
  stopWebcam();
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

// วิเคราะห์ภาพจากวิดีโอแบบเรียลไทม์
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'th-TH'; // เปลี่ยนเป็น 'en-US' ถ้าอยากให้พูดอังกฤษ
  speechSynthesis.speak(utterance);
}

async function startScanning(video) {
  labelContainer = document.getElementById("label-container");

  scanningInterval = setInterval(async () => {
    if (isFrozen || !model) return;

    const prediction = await model.predict(video);

    labelContainer.innerHTML = "";
    prediction.forEach(p => {
      const percent = (p.probability * 100).toFixed(2);
      const div = document.createElement("div");
      div.className = "prediction";
      div.innerHTML = `<span style="color:${getConfidenceColor(percent)};">
                        ${p.className}: <strong>${percent}%</strong>
                      </span>`;
      labelContainer.appendChild(div);
    });

    // 🔊 พูดเฉพาะ label ที่มั่นใจสูงสุด
    const topPrediction = prediction.reduce((a, b) => (a.probability > b.probability ? a : b));
    const confidence = (topPrediction.probability * 100).toFixed(2);

    if (confidence >= 70 && topPrediction.className !== lastSpokenLabel) {
      speak(`ตรวจพบ ${topPrediction.className}`);
      lastSpokenLabel = topPrediction.className;
    }

  }, 1000);
}


// ถ่ายภาพและหยุดวิเคราะห์
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
  percent = parseFloat(percent);
  if (percent < 10) return 'red';
  if (percent < 25) return 'orange';
  if (percent < 50) return 'yellow';
  if (percent < 75) return 'lime';
  return 'green';
}
