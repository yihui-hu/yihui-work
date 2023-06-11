// ---
// import WorksOverview from "../components/WorksOverview";
// import "../styles/content.scss";
// ---

// <div class="content-wrapper">
//   <div class="content-container">z
//     <p class="content-message">
//       Thanks for helping me clear the table.
//     </p>
//     <WorksOverview client:only />
//   </div>
// </div>

import { useEffect } from "react";
import WorksOverview from "./WorksOverview";
import "../styles/content.scss";
import { useStore } from "@nanostores/react";
import { selectedWorkItem } from "../store/store";

const width = window.innerWidth;

const Content = () => {
  const $workItem = useStore(selectedWorkItem);

  useEffect(() => {
    document.getElementById("content-message")!.style.display = "none";
    setTimeout(() => {
      document.getElementById("content-message")!.style.display = "";
    }, 1000);
  }, []) 

  return (
    <div className="content-wrapper">
      <div className="content-container">
        <p
          id="content-message"
          className={
            $workItem === "none"
              ? "content-message"
              : "content-message-hidden"
          }
        >
          Thanks for helping me clear the table. { width < 864 && "Scroll down to see more of my works."}
        </p>
        <WorksOverview />
      </div>
    </div>
  );
};

export default Content;
