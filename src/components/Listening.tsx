import { useEffect } from "react";
import "../styles/currently.scss";

const ListeningTo = () => {
  useEffect(() => {
    const fetchMusic = async () => {
      const isCached = localStorage.getItem("listeningToCached");
      const cachedTime = localStorage.getItem("listeningToCacheTimestamp");
      
      if (isCached && cachedTime) {
        const currentTime = new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000;

        if (currentTime - parseInt(cachedTime) > fiveMinutes) {
          console.log("Refresh cache");
        } else {
          const image = localStorage.getItem("listeningToImage")!;
          const link = localStorage.getItem("listeningToLink")!;
          const title = localStorage.getItem("listeningToTitle")!;
          const artist = localStorage.getItem("listeningToArtist")!;
          const listening = localStorage.getItem("listeningToListening")!;

          document.getElementById("currently-image")!.setAttribute("src", image);
          document.getElementById("track-link")!.setAttribute("href", link);
          document.getElementById("track-title")!.innerHTML = title;
          document.getElementById("track-artist")!.innerHTML = "by " + artist;
          document.getElementById("track-listening")!.innerHTML = listening;
          return;
        }
      }

      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=yihuihu&api_key=4154ee8ba6685b36c18d650291b67dc6&format=json&limit=1`
      );
      const data = await response.json();
      const track = data.recenttracks.track[0];
      const artist = track.artist["#text"];
      const image = track.image[2]["#text"];
      const { name: title, url: link } = track;

      let listening;
      if (track["@attr"] !== undefined) {
        listening = "🎵 Now Listening";
      } else {
        const timestamp = parseInt(track.date.uts);
        const date = new Date(timestamp * 1000);
        const dateFormat =
          date.getHours() +
          ":" +
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) +
          ", " +
          date.toDateString();
        listening = dateFormat;
      }

      document.getElementById("currently-image")!.setAttribute("src", image);
      document.getElementById("track-link")!.setAttribute("href", link);
      document.getElementById("track-title")!.innerHTML = title;
      document.getElementById("track-artist")!.innerHTML = "by " + artist;
      document.getElementById("track-listening")!.innerHTML = listening;

      localStorage.setItem("listeningToImage", image);
      localStorage.setItem("listeningToLink", link);
      localStorage.setItem("listeningToTitle", title);
      localStorage.setItem("listeningToArtist", artist);
      localStorage.setItem("listeningToListening", listening);
      localStorage.setItem("listeningToCacheTimestamp", new Date().getTime().toString());
      localStorage.setItem("listeningToCached", "true");
    };
    fetchMusic();
  }, []);

  return (
    <div>
      <span className="currently-header">I'm listening to:</span>
      <div id="currently-container">
        <a
          id="track-link"
          href="https://open.spotify.com/user/notyihui"
          target="_blank"
        >
          <img
            id="currently-image"
            src="https://yihui-work.s3.us-east-2.amazonaws.com/placeholder-track-art.png"
            className="sidebar_asset"
          />
        </a>
        <div id="currently-info">
          <span id="track-title">Loading...</span>
          <span id="track-artist"></span>
          <span id="track-listening" style={{ opacity: 0.4 }}></span>
        </div>
      </div>
    </div>
  );
};

export default ListeningTo;
