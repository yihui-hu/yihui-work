import { useEffect } from "react";
import { works } from "../data/works";
import { useStore } from "@nanostores/react";
import { selectedWorks, selectedTag, selectedWorkItem } from "../data/store";
import { isMobile } from 'react-device-detect';
import "../styles/work-list.scss";

const WorkList = () => {
  const $selected = useStore(selectedWorks);
  const $tag = useStore(selectedTag);

  useEffect(() => {
    if ($selected === "all") {
      updateTags($tag);
    } else {
      const workItems = document.getElementsByClassName("work-item");
      for (const item of workItems) item.className = "work-item deselected";

      const workSelected = document.getElementById($selected)!;
      workSelected.className = "work-item";
    }
  }, [$selected]);

  function updateTags(category: string) {
    selectedTag.set(category);
    const workItems = document.getElementsByClassName("work-item");

    if (category === "all") {
      for (const item of workItems) item.className = "work-item";
    } else {
      for (const item of workItems) {
        const categories = item.getAttribute("data-category");
        item.className = categories!.includes(category)
          ? "work-item"
          : "work-item deselected";
      }
    }

    const tags = document.getElementsByClassName("tag");
    for (const tag of tags) {
      tag.className = tag.id === category ? "tag" : "tag deselected";
    }
  }

  function handleHover(title: string, onHover: boolean) {
    const workItems = document.getElementsByClassName("work-item");
    for (const item of workItems)
      item.className = onHover ? "work-item deselected" : "work-item";

    if (onHover) {
      const workHovered = document.getElementById(title);
      workHovered!.className = "work-item";
    } else {
      updateTags($tag);
    }

    onHover ? selectedWorkItem.set(title) : selectedWorkItem.set("none");
  }

  return (
    <div className="works-container">
      <div className="tags">
        <span id="all" className="tag" onClick={() => updateTags("all")}>
          all
        </span>
        <span
          id="code"
          className="tag deselected"
          onClick={() => updateTags("code")}
        >
          code
        </span>
        <span
          id="design"
          className="tag deselected"
          onClick={() => updateTags("design")}
        >
          design
        </span>
        <span
          id="art"
          className="tag deselected"
          onClick={() => updateTags("art")}
        >
          art
        </span>
      </div>
      <hr className="works-hr"></hr>
      <div className="works-list">
        {works.map((work) => {
          return (
            <a key={work.title} className="work-link" href={work.url}>
              <div
                id={work.title}
                className={`work-item`}
                data-category={work.category}
                onMouseEnter={isMobile ? () => {} : () => handleHover(work.title, true)}
                onMouseLeave={isMobile ? () => {} : () => handleHover(work.title, false)}
              >
                <span className="work-title">{work.title}</span>
                <span className="work-description">{work.description}</span>
                <span className="work-blurb">{work.blurb}</span>
                <div className="work-label">
                  {work.new ? (
                    <div className="new-label">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 5,
                        }}
                      >
                        <span className="new-text">NEW</span>
                        <span className="new-emoji">🌀</span>
                      </div>
                    </div>
                  ) : work.wip ? (
                    <div className="wip-label">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 5,
                        }}
                      >
                        <span className="wip-text">WIP</span>
                        <span className="wip-emoji">🚧</span>
                      </div>
                    </div>
                  ) : (
                    <span className="work-year">{work.year}</span>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default WorkList;
