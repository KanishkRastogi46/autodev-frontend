"use client";

import Editor from '@monaco-editor/react';

export default function CodeEditor() {
  return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-800 p-8 gap-8'>
            <h1 className='font-light text-white text-3xl text-center capitalize tracking-wide'>Try the Code here</h1>
            <Editor 
                className=''
                height="80vh" 
                width={"80vw"}
                theme='vs-dark'
                defaultLanguage="javascript" 
                defaultValue="// some comment" 
            />
        </div>
    );
}