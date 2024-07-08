'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog"
import Image from "next/image"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { UserDocument } from "@/models/user.model"
import { Loader2 } from "lucide-react"
import { snapSendMessage } from "@/lib/serveractions"
import { useRouter } from "next/navigation"

  export function PreviewUsersDialogue({selectedFile,close,onPreview}:{selectedFile:string,close:()=>void,onPreview:()=>void}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sendMessageLoading, setSendMessageLoading] = useState(false);
    const [selectedUser,setSelectedUser]=useState<UserDocument>();
    const router = useRouter();
    let selectedUserHandler = (user:UserDocument) =>{
        setSelectedUser(user);
    }
    const sendSnapMessageHandler = async () =>{
      setSendMessageLoading(true);
        try {
          await snapSendMessage(
            selectedFile,selectedUser?._id,'image'
          );
          router.push( `/chat/${selectedUser?._id}`);
        } catch (error) {
          console.log(error);
          throw error;
        }finally{
          setSendMessageLoading(false);
        }
    }
    useEffect(()=>{
        const fetchUsers = async()=>{
           setLoading(true);
           try {
             const res = await fetch('/api/chat/getusers');
             const jsonData = await res.json();
             setUsers(jsonData);
           } catch (error) {
              console.log(error);
              throw error;         
           }finally{
              setLoading(false);
           }
        }
        fetchUsers();
    },[])

    return (
      <Dialog open={!!selectedFile}>
      <DialogContent onInteractOutside={close} className="sm:max-w-[425px] bg-white border max-w-xl flex flex-col">
        <DialogHeader>
          <div className="flex items-center relative h-3/4 my-auto">
             <Input type="text" placeholder="search user to send snap" id="name"/>
          </div>
        </DialogHeader>
        <div className="grid gap-1 py-4">
          {
            users.map((user:UserDocument)=>{
              return(
                <div key={String(user._id)} onClick={()=>selectedUserHandler(user)} className={`${selectedUser?._id === user._id ? 'bg-gray-200' : null} flex items-center gap-5 cursor-pointer p-2 rounded-md hover:bg-gray-200`}>
                   <Avatar>
                      <AvatarImage src={user.profilePhoto} alt="user"/>
                   </Avatar>
                   <div>
                     <h1 className="font-medium">{user.username}</h1>
                   </div>
                </div>
              )
            })
          }
          {
            loading && <div className="mx-auto">
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            </div>
          }
        </div>
        <DialogFooter>
          <Button onClick={close}>Cancel</Button>
          {
            sendMessageLoading ? (
              <Button  type="submit"><Loader2 className="mr-2 w-4 h-4 animate-spin"/>Please wait</Button>

            ):(
              <Button onClick={sendSnapMessageHandler} type="submit">Send</Button>
            )
          }
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
  }
  