import { useActiveStore, useNameStore } from "@/store";
import Typewriter from "./TypeWriter";
import TypewriterDecoration from "./TypeWriterDecoration";
import { useEffect } from "react";

export default function InfoBar() {
  const { name_photo, index, profession } = useNameStore();
  const { activeFullPhoto } = useActiveStore();

  return (
    <div
      className="absolute left-1/3 top-10 transition-opacity duration-300 z-10"
      style={{ opacity: activeFullPhoto ? "0" : "1" }}
    >
      <TypewriterDecoration index={index} profession={profession} />
      <Typewriter text={name_photo} />
    </div>
  );
}
