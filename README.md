# OneShotOneCare

# 🔍 ระบบตรวจสอบ และวิเคราะห์บาดแผล (Wound Detection System) V1.0.3

A web-based AI application for real-time **skin wound detection** using webcam and a machine learning model from Teachable Machine (TensorFlow.js).  
Designed to assist healthcare professionals in **visual classification** of skin conditions, such as **Necrotizing Fasciitis (โรคเนื้อเน่า)**.

---

## 🌟 Features

- 📷 Select **Front / Back Camera**
- 🧠 Real-time **Machine Learning Prediction**
- 📊 Visual feedback with **color-coded progress bars**
- 🔍 Access to wound-specific details
- 🛑 Start / Stop camera control
- 📱 Mobile-friendly & Responsive layout

## 🛠️ Tech Stack

- HTML5 / CSS3
- Vanilla JavaScript
- TensorFlow.js
- Teachable Machine

---

## 🧪 How It Works

1. User selects a camera and clicks "สแกน" (Scan).
2. Webcam initializes and starts streaming.
3. Trained model classifies the image from webcam in real-time.
4. Each class result is displayed with:
   - Class name
   - Confidence value (as percentage)
   - A progress bar with color coded by confidence level:

| Confidence (%) | Color    |
|----------------|----------|
| 0–10%          | 🔴 Red   |
| 10–25%         | 🟠 Orange|
| 25–50%         | 🟡 Yellow|
| 50–75%         | 🟢 Lime  |
| 75–100%        | ✅ Green |
