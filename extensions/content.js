let captioningStarted = false;
let captionHistory = [];
let selectedLanguage =
    localStorage.getItem(
        "captionLanguage"
    ) || "english";

let currentRecorder = null;

async function startCaptioning(video, overlay) {
  const stream = video.captureStream();

  const audioTracks = stream.getAudioTracks();

  const audioStream = new MediaStream(audioTracks);

  currentRecorder = new MediaRecorder(audioStream);

  const recorder = currentRecorder;

  recorder.ondataavailable = async (event) => {
    try {
      const formData = new FormData();

      formData.append("file", event.data, "audio.webm");

      formData.append("language", selectedLanguage);

      const response = await fetch("http://127.0.0.1:8000/audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.caption) {
        captionHistory.push(data.caption);

        if (captionHistory.length > 3) {
          captionHistory.shift();
        }

        overlay.innerText = captionHistory.join("\n");
      }
    } catch (err) {
      console.error(err);

      overlay.innerText = "Caption Error";
    }
  };

  recorder.start();

  setTimeout(() => {
    recorder.stop();
  }, 3000);

  recorder.onstop = () => {
    if (!captioningStarted) {
      overlay.innerText = " ⏹️ Captions Stopped";

      return;
    }

    setTimeout(() => {
      startCaptioning(video, overlay);
    }, 100);
  };
}

function createButton() {
  const video = document.querySelector("video");

  if (!video) return;

  if (document.getElementById("ai-caption-btn")) return;

  const btn = document.createElement("button");

  btn.id = "ai-caption-btn";

  btn.innerText = "▶ Start Captions ";

  const languageSelect = document.createElement("select");

  languageSelect.id = "ai-language";

  languageSelect.innerHTML = `
<option value="english">English</option>
<option value="hindi" selected>Hindi</option>
<option value="hinglish">Hinglish</option>
`;
languageSelect.value =
    selectedLanguage;

  languageSelect.onchange = () => {

  selectedLanguage =
      languageSelect.value;

  localStorage.setItem(
      "captionLanguage",
      selectedLanguage
  );

  console.log(
      "Language:",
      selectedLanguage
  );
};

  btn.onclick = () => {
    if (captioningStarted) {
      captioningStarted = false;

      if (currentRecorder) {
        currentRecorder.stop();
      }

      btn.innerText = "Start Captions";

      return;
    }

    captioningStarted = true;

    btn.innerText = "Stop Captions";

    createOverlay();

    const overlay = document.getElementById("ai-caption-overlay");

    const video = document.querySelector("video");

    overlay.innerText = "🎙️Caption Started...";

    startCaptioning(video, overlay);
  };
  const controls = document.createElement("div");

  controls.id = "ai-controls";

  controls.style.position = "fixed";

  controls.style.top = "20px";

  controls.style.right = "20px";

  controls.style.display = "flex";

  controls.style.gap = "10px";

  controls.style.alignItems = "center";

  controls.style.zIndex = "2147483647";

  controls.appendChild(languageSelect);

  controls.appendChild(btn);

  document.body.appendChild(controls);

  languageSelect.style.position = "fixed";

  languageSelect.style.top = "20px";

  languageSelect.style.right = "170px";

  languageSelect.style.zIndex = "2147483647";

  languageSelect.style.padding = "10px";
  languageSelect.style.borderRadius = "8px";
  languageSelect.style.borderRadius = "8px";

  languageSelect.style.background = "#1f2937";

  languageSelect.style.color = "white";

  languageSelect.style.border = "1px solid #4b5563";

  btn.style.position = "fixed";

  btn.style.top = "20px";

  btn.style.right = "20px";

  btn.style.zIndex = "2147483647";

  btn.style.padding = "10px 18px";

  btn.style.borderRadius = "8px";

  btn.style.border = "none";

  btn.style.cursor = "pointer";

  btn.style.fontWeight = "bold";

  btn.style.background = "#2563eb";

  btn.style.color = "white";
}

function createOverlay() {
  if (document.getElementById("ai-caption-overlay")) return;

  const overlay = document.createElement("div");

  overlay.id = "ai-caption-overlay";

  overlay.innerText = "NO CAPTIONS";

  overlay.style.position = "fixed";

  overlay.style.bottom = "80px";

  overlay.style.left = "50%";

  overlay.style.transform = "translateX(-50%)";

  overlay.style.background = "rgba(0,0,0,0.85)";
  overlay.style.backdropFilter = "blur(6px)";

  overlay.style.color = "white";

  overlay.style.padding = "18px";

  overlay.style.fontSize = "15px";
  overlay.style.fontWeight = "400";

  overlay.style.fontFamily = "Arial, sans-serif";

  overlay.style.borderRadius = "12px";
  overlay.style.border = "1px solid rgba(255,255,255,0.2)";

  overlay.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";

  overlay.style.zIndex = "2147483647";

  overlay.style.maxWidth = "700px";

  overlay.style.minWidth = "450px";

  overlay.style.whiteSpace = "pre-wrap";

  overlay.style.lineHeight = "1.5";

  overlay.style.textAlign = "center";

  document.body.appendChild(overlay);
}

setInterval(createButton, 2000);
