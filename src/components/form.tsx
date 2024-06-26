"use client";

import { useState } from "react";

const handleFetch = (content: string) => {
  fetch("/api/twitter/tweet", {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};
export default function Form() {
  const [text, setText] = useState("Don't need to look back to yesterday.");
  // TODO 添加上传图片的功能
  // const [img, setImg] = useState("");

  return (
    <div>
      <input
        className="border border-slate-400"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-slate-600 text-white p-1 rounded-md"
        onClick={() => handleFetch(text)}
      >
        Tweet
      </button>
    </div>
  );
}
