from fastapi import FastAPI, UploadFile,File, Form
from fastapi.middleware.cors import CORSMiddleware
from deep_translator import GoogleTranslator
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from transcriber import transcribe_audio

import traceback
import subprocess
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/audio")
async def audio(
    file: UploadFile=File(...),
    language: str = Form("english")
):

    webm_path = "temp.webm"
    wav_path = "temp.wav"

    with open(webm_path, "wb") as f:
        f.write(await file.read())

    try:

        result=subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                webm_path,
                "-ar",
                "16000",
                "-ac",
                "1",
                wav_path
            ],
            capture_output=True,
            text=True
        )

        print(result.stderr)

        if result.returncode !=0:
            print("FFmpeg Error:")
            print(result.stderr)

            return {
                "caption": ""
            }

        text = transcribe_audio(
            wav_path
        )

        if language == "english":

            final_text = text

        elif language == "hindi":

            final_text = GoogleTranslator(
                source="auto",
                target="hi"
            ).translate(text)

        elif language == "hinglish":
        
            hindi = GoogleTranslator(
                source="auto",
                target="hi"
           ).translate(text)

            final_text = transliterate(
                hindi,
                sanscript.DEVANAGARI,
                sanscript.ITRANS
            )

        else:
        
            final_text = text

        return {
            "caption": final_text
        }

    except Exception as e:

        print("ERROR:")
        traceback.print_exc()

        return {
            "caption": ""
        }