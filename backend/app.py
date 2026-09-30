from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from deep_translator import GoogleTranslator, MyMemoryTranslator
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from transcriber import transcribe_audio

import os
import tempfile
import threading
import traceback
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

lock = threading.Lock()   # process one chunk at a time
cache = {}


def to_hindi(text, src_lang):
    if src_lang == "hi":
        return text
    if text in cache:
        return cache[text]

    for name, make in (
        ("Google", lambda: GoogleTranslator(source="en", target="hi")),
        ("MyMemory", lambda: MyMemoryTranslator(source="en-GB", target="hi-IN")),
    ):
        try:
            out = make().translate(text)
            if out:
                cache[text] = out
                return out
        except Exception as e:
            print(f"{name} translate failed:", str(e)[:100])

    return text  # last resort: show the original text


@app.post("/audio")
def audio(file: UploadFile = File(...), language: str = Form("english")):
    data = file.file.read()

    with lock:
        tmp = tempfile.mkdtemp()
        webm_path = os.path.join(tmp, "in.webm")
        wav_path = os.path.join(tmp, "out.wav")
        try:
            with open(webm_path, "wb") as f:
                f.write(data)

            result = subprocess.run(
                ["ffmpeg", "-y", "-i", webm_path, "-ar", "16000", "-ac", "1", wav_path],
                capture_output=True, text=True,
            )
            if result.returncode != 0:
                print("FFmpeg failed (bad chunk), skipping")
                return {"caption": ""}

            text, lang = transcribe_audio(wav_path)

            if lang == "ur":  # Whisper mislabels Hindi as Urdu
                text, lang = transcribe_audio(wav_path, language="hi")

            if not text:
                return {"caption": ""}

            if language == "hindi":
                final_text = to_hindi(text, lang)
            elif language == "hinglish":
                final_text = transliterate(
                    to_hindi(text, lang), sanscript.DEVANAGARI, sanscript.ITRANS
                )
            else:
                final_text = text

            return {"caption": final_text}

        except Exception:
            traceback.print_exc()
            return {"caption": ""}
        finally:
            for p in (webm_path, wav_path):
                if os.path.exists(p):
                    os.remove(p)
            os.rmdir(tmp)