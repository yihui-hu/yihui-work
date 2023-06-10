import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { selectedWorks, selectedTag, selectedWorkItem } from "../store/store";
import workImages from "../data/workImages";

const width = window.innerWidth;
const height = window.innerHeight;

interface workImageData {
  url: string;
  id: string;
  category: string;
}

const WorksOverview = () => {
  const $selected = useStore(selectedWorks);
  const $tag = useStore(selectedTag);
  const $workItem = useStore(selectedWorkItem);

  const [images, setImages] = useState<workImageData[]>([]);
  const [angles, setAngles] = useState<number[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setImages(shuffleArray(workImages));
    setPositions(generateRandomPositions(workImages.length));
    setAngles(generateRandomAngles(workImages.length));
  }, []);

  return (
    <>
      {images.map((imageData, index) => {
        // 🙏 forgive me
        if (
          ($tag === "all" ||
            ($tag !== "all" && imageData.category.includes($tag))) &&
          ($workItem === "none" ||
            ($workItem !== "none" && imageData.id == $workItem))
        ) {
          return (
            <motion.div
              style={{ transform: `rotate(${angles[index]}deg)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (index + 1) / 100, duration: 0.06 }}
            >
              <Draggable
                key={index}
                defaultPosition={positions[index]}
                onMouseDown={() => selectedWorks.set(imageData.id)}
                onStart={() => selectedWorks.set(imageData.id)}
              >
                <img
                  style={{
                    alignItems: "center",
                    position: "absolute",
                    cursor: "move",
                    width: "auto",
                    maxHeight: "300px",
                  }}
                  draggable={false}
                  src={imageData.url}
                  onMouseEnter={() => selectedWorks.set(imageData.id)}
                  onMouseLeave={() => selectedWorks.set("all")}
                />
              </Draggable>
            </motion.div>
          );
        }
      })}
    </>
  );
};

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const generateRandomPositions = (numImages: number) => {
  const positions = [];
  for (let i = 0; i < numImages; i++) {
    const randomX = Math.floor(
      Math.random() * ((width / 2.2) * 1.2 - width / 3)
    );
    const randomY = Math.floor(Math.random() * (height - 400));
    positions.push({ x: randomX, y: randomY });
  }
  return positions;
};

const generateRandomAngles = (numImages: number) => {
  const angles = [];
  for (let i = 0; i < numImages; i++) {
    const randomRotation = Math.floor(Math.random() * (10 + 10 + 1) + -10);
    angles.push(randomRotation);
  }
  return angles;
};

export default WorksOverview;
