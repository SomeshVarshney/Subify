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

Add screenshots here:

* English Captions<img width="622" height="150" alt="image" src="https://github.com/user-attachments/assets/afb24202-80a9-4ec6-94d8-2a7aca0590a9" />

* Hindi Captions<img width="620" height="142" alt="image" src="https://github.com/user-attachments/assets/21b4bd10-d6a5-41be-97db-96b9d788a3ff" />

* Language Selector<img width="125" height="153" alt="image" src="https://github.com/user-attachments/assets/320bde6e-81bc-4295-86c8-c3ee1fbfb7cb" />

* Start button<img width="162" height="60" alt="image" src="https://github.com/user-attachments/assets/41bb7717-7a99-4e1e-a733-d8d789c5846c" />
* Stop button<img width="172" height="57" alt="image" src="https://github.com/user-attachments/assets/a8c8dec7-158e-406c-bd93-0733564f30be" />


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
