"use client";


import {useEditor,EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";



export const Editor = () => {
    const editor = useEditor({
        autofocus:true,
        editorProps:{
            attributes:{
                class : " outline-none focus:outline-none bg-white min-h-screen w-max mx-auto min-w-[768px] p-12 my-12 max-h-[1054px] border border-gray-300 rounded-md"
            }
        },
        extensions:[StarterKit],
        content:"<p>Hello world</p>",
        immediatelyRender:false
    })

    return <EditorContent editor={editor}/>
}

