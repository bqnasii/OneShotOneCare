let currentStream = null;

// สลับกล้องหน้า/หลัง
function switchCamera(facingMode) {
  stopWebcam();
  init(facingMode);
}

// เริ่มเปิดกล้อง
async function init(facingMode = 'environment') {
  const constraints = {
    video: { facingMode: { exact: facingMode } },
    audio: false,
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    currentStream = stream;

    const videoContainer = document.getElementById('webcam-container');
    videoContainer.innerHTML = ''; // ล้างของเก่า
    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    video.srcObject = stream;
    videoContainer.appendChild(video);
  } catch (err) {
    alert('ไม่สามารถเปิดกล้องได้: ' + err.message);
  }
}

// หยุดกล้อง
function stopWebcam() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  const videoContainer = document.getElementById('webcam-container');
  videoContainer.innerHTML = '';
}

// ถ่ายภาพจากวิดีโอ (ตัวอย่างง่าย)
function captureImage() {
  const video = document.querySelector('#webcam-container video');
  if (!video) {
    alert('กรุณาเปิดกล้องก่อนถ่ายภาพ');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // แสดงภาพที่ถ่าย (เปิดหน้าต่างใหม่ หรือใส่ในหน้าก็ได้)
  const dataUrl = canvas.toDataURL('image/png');
  window.open(dataUrl, '_blank');
}

// แสดงข้อมูลโรค
function showDisease(diseaseName) {
  const diseaseInfo = document.getElementById('disease-info');
  const diseaseContent = document.getElementById('disease-content');
  const scanSection = document.querySelector('.scan-section');
  const diseaseList = document.querySelector('.disease-list');

  const diseases = {
    'ติดเชื้อแบคทีเรีย': <!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>แผลติดเชื้อแบคทีเรีย</title>
  <style>
    body {
      font-family: 'Tahoma', sans-serif;
      line-height: 1.8;
      background-color: #f9f9f9;
      padding: 20px;
      max-width: 800px;
      margin: auto;
      color: #333;
    }
    h1 {
      color: #27ae60;
    }
    h2 {
      color: #2c3e50;
      margin-top: 30px;
    }
    ul {
      list-style-type: disc;
      margin-left: 20px;
    }
    .warning {
      background-color: #ffe6e6;
      border-left: 6px solid #e74c3c;
      padding: 10px 15px;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <h1>แผลติดเชื้อแบคทีเรีย</h1>

  <h2>สาเหตุ:</h2>
  <p>เกิดจากแผลเปิดที่เชื้อแบคทีเรียเข้าไปในร่างกาย เช่น แผลถลอก แผลถูกบาด หรือแผลจากการเกา</p>

  <h2>อาการ:</h2>
  <p>แผลบวมแดง มีหนอง มีกลิ่นเหม็น หรือรู้สึกร้อนบริเวณรอบๆ แผล อาจมีอาการปวดและไข้ร่วมด้วย</p>

  <h2>การรักษาเบื้องต้น:</h2>
  <ul>
    <li>ล้างแผลให้สะอาดด้วยน้ำเกลือล้างแผล</li>
    <li>ทายาฆ่าเชื้อ เช่น โพวิโดน-ไอโอดีน</li>
    <li>ปิดแผลด้วยพลาสเตอร์หรือผ้าก๊อซ</li>
  </ul>

  <h2>วิธีการดูแลรักษา:</h2>
  <ul>
    <li>ทำความสะอาดแผลอย่างสม่ำเสมอจนกว่าแผลจะหายสนิท</li>
    <li>หลีกเลี่ยงการสัมผัสแผลด้วยมือที่ไม่สะอาด</li>
  </ul>

  <div class="warning">
    <h2>คำเตือน:</h2>
    <p>หากแผลมีหนองเยอะ มีอาการบวมแดงลุกลาม หรือมีไข้สูง ควรรีบไปพบแพทย์</p>
  </div>

</body>
</html>
    'ตุ่มนูนแดงบวม': 'ตุ่มนูนแดงบวมจากแมลงเกิดจากการกัดหรือสัมผัสกับแมลง ทำให้เกิดผื่นแดงและบวม',
    'ตุ่มน้ำพอง': 'ตุ่มน้ำพองเป็นผื่นที่มีลักษณะเป็นตุ่มน้ำใส ซึ่งอาจเกิดจากการแพ้หรือการติดเชื้อ',
    'ผิวไหม้แดด': 'ผิวไหม้แดดเกิดจากการถูกแสงแดดเผา ทำให้ผิวหนังแดงและเจ็บ',
    'ผื่นจากเหงื่อ': 'ผื่นจากเหงื่อเกิดจากการสะสมของเหงื่อในผิวหนัง ทำให้เกิดผื่นแดงและคัน',
    'ผื่นลมพิษ': 'ผื่นลมพิษเป็นผื่นที่มีลักษณะเป็นตุ่มนูนสีแดงหรือชมพู มักเกิดจากการแพ้',
    'ผื่นแพ้สารเคมี': 'ผื่นแพ้สารเคมีเกิดจากการสัมผัสสารเคมีที่ทำให้เกิดการระคายเคืองหรือแพ้',
    'ผื่นแพ้สิ่งแวดล้อม': 'ผื่นแพ้สิ่งแวดล้อมเกิดจากปัจจัยภายนอก เช่น ฝุ่น หรือสารก่อภูมิแพ้',
    'ผื่นแพ้แดด': 'ผื่นแพ้แดดเกิดจากการแพ้แสงแดด ทำให้ผิวหนังเป็นผื่นแดง',
    'พยาธิปรสิต': 'พยาธิปรสิตในบาดแผลอาจทำให้เกิดการติดเชื้อและอาการอักเสบ',
    'แผลเชื้อรา': 'แผลเชื้อราเกิดจากการติดเชื้อราที่ผิวหนัง ทำให้เกิดผื่นลอกและคัน',
    'แมลงกัดต่อย': 'แมลงกัดต่อยทำให้เกิดแผลบวมแดงและเจ็บปวด',
    'โรคน้ำกัดเท้า': 'โรคน้ำกัดเท้าเกิดจากการติดเชื้อบริเวณเท้า เนื่องจากความชื้น',
    'โรคเนื้อเน่า': 'โรคเนื้อเน่าเป็นการติดเชื้อที่ทำลายเนื้อเยื่อรุนแรง ต้องได้รับการรักษาอย่างเร่งด่วน',
    'ไข้รากสาดใหญ่': 'ไข้รากสาดใหญ่เป็นโรคติดเชื้อที่มีไข้สูงและผื่นตามร่างกาย',
  };

  diseaseContent.textContent = diseases[diseaseName] || 'ข้อมูลโรคไม่พบ';
  diseaseInfo.style.display = 'block';
  scanSection.style.display = 'none';
  diseaseList.style.display = 'none';
}

// กลับไปหน้า scan
function backToScan() {
  document.getElementById('disease-info').style.display = 'none';
  document.querySelector('.scan-section').style.display = 'block';
  document.querySelector('.disease-list').style.display = 'block';
}
