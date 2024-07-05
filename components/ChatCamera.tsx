'use client'
import { readFileAsDataURL } from '@/lib/utils';
import { Camera, CameraIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
//import { ImagePreviewDialogue } from './ImagePreviewDialogue';
import { PreviewUsersDialogue } from './PreviewUsers';
import { ImagePreviewDialogue } from './ImagePreviewDialogue';

const ChatCamera = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const[selectedFile, setSelectedFile]= useState<string>("");
  const[flag,setFlag]=useState(false);

  const fileCangeHandler= async(e:React.ChangeEvent<HTMLInputElement>)=>{
     const file=e.target?.files?.[0];
     if(file){
       const dataUrl= await readFileAsDataURL(file);
       setSelectedFile(dataUrl);
     }
  }
  const closeDialogue=()=>{
     setSelectedFile("");
     setFlag(false);
  }

  console.log('Selected File -->',selectedFile);
  
  return (
    <>
      <div className='flex flex-col items-center justify-center m-2 rounded-md bg-clip-padding backdrop-blur-sm bg-opacity-5 border p-5'>
         <div onClick={()=>imageRef.current?.click()} className='rounded-full p-8 bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-200 cursor-pointer text-white'>
           <CameraIcon size={'50px'}/>
           <input ref={imageRef} type="file" accept='image/' hidden onChange={fileCangeHandler}/>
         </div>
         <p className='w-2/3 text-center text-white mt-4 font-semibold'>lets get started</p>
      </div>
      {
        flag === false ? (
          <ImagePreviewDialogue selectedFile={selectedFile} close={closeDialogue} imageChange={()=>imageRef.current?.click} setFlag={setFlag}/>

       ) : (
          <PreviewUsersDialogue selectedFile={selectedFile} close={closeDialogue} onPreview={()=>setFlag(false)}/>
        )
      }
    </>
  );
}

export default ChatCamera;
