from faster_whisper import WhisperModel

print("Loading Whisper model...")

model = WhisperModel(
    "base",
    device="cpu",
    local_files_only=True
)

print("Whisper loaded!")

def transcribe_audio(audio_file):

    segments, info = model.transcribe(
        audio_file,
        beam_size=1
    )

    text = ""

    for segment in segments:
        text += segment.text + " "
    print("Transcript:", text)
    return text.strip()
    