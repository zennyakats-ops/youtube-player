
const params = new URLSearchParams(location.search);
const videoId = params.get("video") || "";
const playlistId = params.get("list") || "";

const iframe = document.getElementById("player");
const button = document.getElementById("start");
const status = document.getElementById("status");

const validVideo = /^[\w-]{11}$/.test(videoId);
const validPlaylist = /^[\w-]+$/.test(playlistId);

if (!validVideo && !validPlaylist) {
  status.textContent =
    "No valid video or playlist. Open the extension and paste a link.";
  button.disabled = true;
}

button.addEventListener("click", () => {
  if (!validVideo && !validPlaylist) return;

  const query = new URLSearchParams({
    autoplay: "1",
    playsinline: "1"
  });

  let embedUrl;

  if (validVideo) {
    if (playlistId && validPlaylist) {
      query.set("list", playlistId);
    }

    embedUrl =
      `https://www.youtube.com/embed/${videoId}?${query}`;
  } else {
    query.set("list", playlistId);

    embedUrl =
      `https://www.youtube.com/embed/videoseries?${query}`;
  }

  iframe.src = embedUrl;
  status.textContent =
    "Loading YouTube. If needed, press Play in the player.";
});

iframe.addEventListener("load", () => {
  // The iframe load event does not guarantee playback success.
});
