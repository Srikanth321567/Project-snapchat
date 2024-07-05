import type { DefaultSession } from "next-auth";
declare module "@auth/core/types"{
    interface Session{
        user:{
            _id:string,
        }&DefaultSession["user"];
    }
}