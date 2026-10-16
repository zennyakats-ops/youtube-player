
const params = new URLSearchParams(window.location.search);
const video = params.get("video");
const list = params.get("list");

const container = document.getElementById("player-container");

if (!video && !list) {
  container.textContent = "Open the extension and paste a YouTube link to play music.";
} else {
  const iframe = document.createElement("iframe");

  iframe.id = "player-frame";
  iframe.title = "YouTube music player";
  iframe.allow = "autoplay; encrypted-media; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  const embedParams = new URLSearchParams({
    autoplay: "1",
    playsinline: "1"
  });

  if (list) {
    embedParams.set("list", list);
  }

  const videoPath = video
    ? `/embed/${encodeURIComponent(video)}`
    : "/embed/videoseries";

  iframe.src = `https://www.youtube.com${videoPath}?${embedParams.toString()}`;

  container.appendChild(iframe);
}
