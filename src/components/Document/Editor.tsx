"use client";
import dynamic from "next/dynamic";
import FullScreenLoading from "../FullScreenLoading";

function Editor() {
  const Editor = dynamic(() => import("../tiptap-templates/simple/simple-editor"),{
    ssr:false,
    loading:() => <FullScreenLoading label="Editr is getting Ready"/>
  });
  return (
    <Editor/>
  
  )
}

export default Editor