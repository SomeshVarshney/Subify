# Subify
Subify is a Chrome extension that generates real-time multilingual captions for videos using Faster-Whisper, FastAPI, and FFmpeg.

# Features
Real-time YouTube audio transcription
English captions
Hindi captions
Hinglish captions (Beta)
Start/Stop caption controls
Caption history (last 3 segments)
Language persistence using localStorage
FastAPI backend
Faster-Whisper speech recognition
FFmpeg audio conversion

# Tech Stack
# Frontend
Chrome Extension
JavaScript
HTML/CSS

#Backend
Python
FastAPI
Faster-Whisper
FFmpeg
Deep Translator

# Architecture

YouTube Video
↓
captureStream()
↓
Chrome Extension
↓
FastAPI
↓
FFmpeg
↓
Faster-Whisper
↓
Translation Layer
↓
Caption Overlay

# Installation
# Backend Setup

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app

# Extension Setup
Open Chrome
Go to chrome://extensions
Enable Developer Mode
Click Load Unpacked
Select extension folder

# Usage
Open a YouTube video
Click Start Captions
Select language:
English
Hindi
Hinglish (Beta)
View captions in real time

# Future Improvements
Better Hinglish generation
Tab-audio capture support
Support for additional platforms
Cloud deployment
Chrome Web Store release
