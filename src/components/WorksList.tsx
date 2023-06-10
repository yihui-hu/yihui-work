import { useState, useEffect } from "react";
import { works } from "../data/works";
import { useStore } from "@nanostores/react";
import { selectedWorks, selectedTag, selectedWorkItem } from "../store/store";
import "../styles/worksList.scss";

const WorksList = () => {
  const $selected = useStore(selectedWorks);
  const $tag = useStore(selectedTag);
  const $workItem = useStore(selectedWorkItem);

  useEffect(() => {
    if ($selected === "all") {
      updateTags($tag);
    } else {
      const workItems = document.getElementsByClassName("work-item");
      for (const item of workItems) {
        item.className = "work-item deselected";
      }
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

    const tags = document.getElementsByClassName('tag');
    for (const tag of tags) {
      tag.className = tag.id === category ? "tag" : "tag deselected";
    }
  }

  return (
    <div className="works-container">
      <div className="tags">
        <p id="all" className="tag" onClick={() => updateTags("all")}>
          all
        </p>
        <p
          id="code"
          className="tag deselected"
          onClick={() => updateTags("code")}
        >
          code
        </p>
        <p
          id="design"
          className="tag deselected"
          onClick={() => updateTags("design")}
        >
          design
        </p>
        <p
          id="art"
          className="tag deselected"
          onClick={() => updateTags("art")}
        >
          art
        </p>
      </div>
      <hr></hr>
      <div className="works-list">
        {works.map((work) => {
          return (
            <div
              key={work.title}
              id={work.title}
              className={`work-item`}
              data-category={work.category}
              onMouseEnter={() => selectedWorkItem.set(work.title)}
              onMouseLeave={() => selectedWorkItem.set("none")}
            >
              <p className="work-title">{work.title}</p>
              <p className="work-description">{work.description}</p>
              <p className="work-blurb">{work.blurb}</p>
              <p className="work-year">{work.year}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorksList;