import { useEffect } from "react";
import "../styles/listeningTo.scss";

const ListeningTo = () => {
  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=yihuihu&api_key=4154ee8ba6685b36c18d650291b67dc6&format=json&limit=1`
      );
      const data = await response.json();
      const track = data.recenttracks.track[0];
      const artist = track.artist["#text"];
      const title = track.name;
      const image = track.image[2]["#text"];
      const link = track.url;

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

      document.getElementById("track-art")!.setAttribute("src", image);
      document.getElementById("track-link")!.setAttribute("href", link);
      document.getElementById("track-title")!.innerHTML = title;
      document.getElementById("track-artist")!.innerHTML = artist;
      document.getElementById("track-listening")!.innerHTML = listening;
    };
    fetchMusic();
  }, []);

  return (
    <div id="track-wrapper">
      <p className="header">I'm listening to:</p>
      <div id="track-container">
        <a
          id="track-link"
          href="https://open.spotify.com/user/notyihui"
          target="_blank"
        >
          <img
            id="track-art"
            src="/assets/placeholders/placeholder-track-art.png"
          />
        </a>
        <div className="track-info">
          <p id="track-title">Loading...</p>
          <p id="track-artist"></p>
          <p id="track-listening"></p>
        </div>
      </div>
    </div>
  );
};

export default ListeningTo;