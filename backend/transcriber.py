from faster_whisper import WhisperModel

print("Loading Whisper model...")
model = WhisperModel("base", device="cpu", local_files_only=True)
print("Whisper loaded!")

def transcribe_audio(audio_file, language=None):
    segments, info = model.transcribe(
        audio_file, beam_size=1, language=language, vad_filter=True
    )
    text = " ".join(s.text.strip() for s in segments).strip()
    print("Detected:", info.language, "| Transcript:", text)
    return text, info.language