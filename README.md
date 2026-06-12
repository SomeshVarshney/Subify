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
![English](screenshots/english.jpeg)

### Hindi Captions
![Hindi](screenshots/hindi.jpeg)

### Language Selector
![Language Selector](screenshots/language-selector.jpeg)

### Start / Stop Controls
![Controls](screenshots/start-control.jpeg)
![Controls](screenshots/stop-control.jpeg)

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
