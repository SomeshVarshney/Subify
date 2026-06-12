# Subify

**Subify** is a Chrome extension that generates real-time multilingual captions for videos using Faster-Whisper, FastAPI, and FFmpeg.

## 🚀 Features

* Real-time YouTube audio transcription
* English captions
* Hindi captions
* Hinglish captions (Beta)
* Start/Stop caption controls
* Caption history (last 3 segments)
* Language persistence using localStorage
* FastAPI backend
* Faster-Whisper speech recognition
* FFmpeg audio conversion

---

## 🛠️ Tech Stack

### Frontend

* Chrome Extension
* JavaScript
* HTML/CSS

### Backend

* Python
* FastAPI
* Faster-Whisper
* FFmpeg
* Deep Translator

---

## 🏗️ Architecture

```text
YouTube Video
      ↓
captureStream()
      ↓
Chrome Extension
      ↓
FastAPI Backend
      ↓
FFmpeg
      ↓
Faster-Whisper
      ↓
Translation Layer
      ↓
Caption Overlay
```

---

## ⚙️ Installation

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app:app
```

### Extension Setup

1. Open Chrome
2. Navigate to `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `extension` folder

---

## 📖 Usage

1. Open a YouTube video
2. Click **Start Captions**
3. Select a language:

   * English
   * Hindi
   * Hinglish (Beta)
4. View captions in real time

---

## 📸 Screenshots

### English Captions
![English]<img width="622" height="150" alt="image" src="https://github.com/user-attachments/assets/47b9c122-2fdb-490b-9a78-cab0cb4cc55a" />


### Hindi Captions
![Hindi]<img width="620" height="142" alt="image" src="https://github.com/user-attachments/assets/836b0d78-6baf-4dbd-9853-d2087879b057" />


### Language Selector
![Language Selector]<img width="125" height="153" alt="image" src="https://github.com/user-attachments/assets/efc14724-0ad1-4f5c-95d6-ba521e4e0c3b" />


### Start / Stop Controls
![Controls]<img width="162" height="60" alt="image" src="https://github.com/user-attachments/assets/02e833c7-e336-4e48-bf95-bc196f2d0209" />
<img width="172" height="57" alt="image" src="https://github.com/user-attachments/assets/a02f7d34-3e17-4f02-86d9-7fec4fee4e2a" />


---

## 🔮 Future Improvements

* Improved Hinglish generation
* Tab audio capture support
* Additional platform support
* Cloud deployment
* Chrome Web Store release

---

## 👨‍💻 Author

Somesh Varshney
