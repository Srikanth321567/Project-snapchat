'use client'
import { Dialog } from '@radix-ui/react-dialog';
import Image from 'next/image';
import React, { useState } from 'react';
import { DialogContent } from './ui/dialog';

interface PREVIEWIMAGE{
    open:boolean,
    imgURL:string
}

const ChatBody = ({messages,authUser}:{messages:any,authUser:any}) => {
  const [previewImage, setPreviewImage] = useState<PREVIEWIMAGE>(
    {
      open:false,
      imgURL:''
    }
  );

  return (
    <div className='flex-1 my-3 border-2 border-gray-300 overflow-y-auto p-2 rounded-lg'>
      {
        messages.map((message:any,index:number)=>{
           const Me = message.senderId._id === authUser.user?._id;
           const senderFullName = message?.senderId?.username.toUpperCase();
           const isMessageImage = message.messageType === 'image';
           const isPreviousMessageFromSameUser = index > 0 && messages[index-1].senderId._id===message.senderId._id;
           return(
              <div key={message._id} className='w-full'>
                {
                  !isPreviousMessageFromSameUser && (
                     <p className={`font-bold mt-2 text-xs ${Me ? 'text-red-500':'text-[#00b4d8]'}`}>{Me ? 'ME' : senderFullName}</p>
                  )
                }
                <div className={`border-l-2 ${Me ? 'border-l-red-500' :'border-l-[#00b4d8]'}`}>
                    <div className='flex items-center w-1/2 p-2 rounded-sm'>
                        {
                          isMessageImage ? (
                            <Image src={message.content} alt='img' width={80} height={80} className='h-auto w-auto object-cover cursor-pointer' onClick={()=>setPreviewImage({open:true,imgURL:message.content})}/>
                          ):(<p>{message.content}</p>)
                        }
                        
                    </div>
                </div>
              </div>
           )
        })
      }
      <Dialog open={previewImage.open} onOpenChange={()=> setPreviewImage({open:false, imgURL:''})}>
        <DialogContent className='max-w-2xl h-96'>
           {
             previewImage.imgURL && (
                <Image className='border-2 border-white rounded-lg'src={previewImage.imgURL} alt='img' fill={true}/>
             )
           }
        </DialogContent>

      </Dialog>
      
    </div>
  );
}

export default ChatBody;
