import ChatLayot from "@/components/Chat/ChatLayot";
import PreferencesTab from "@/components/PreferencesTab";
import { User } from "@/db/dummy";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getUsers() : Promise<User[]> {
   const userKeys : string[] = [];
   let cursor = "0"
   do {
       const [nextcursor , keys] = await redis.scan(cursor , {match: "user:*" , type:"hash",count :100})
       cursor=nextcursor
       userKeys.push(...keys)

   }while(cursor!=="0" )
    
     const {getUser} = getKindeServerSession();
     const currentUser = await getUser()



    const pipeline = redis.pipeline()
    userKeys.forEach(key => pipeline.hgetall(key));
    const result = await pipeline.exec() as User[]
    const users : User[] =[];
    for(const user of result)
    {
            if(user.id!=currentUser?.id)
            {
                 users.push(user);
            }
    }
    return users

}

export default async function Home() {
  const {isAuthenticated} = getKindeServerSession()
  if(! await isAuthenticated())
  {
    return redirect("/auth")
  }
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultlayout = layout ? JSON.parse(layout.value) : undefined;
  const users = await getUsers();
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <PreferencesTab></PreferencesTab>
      <div
				className='absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
				dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]'
				aria-hidden='true'
			/>
      <div className="z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex">
        <ChatLayot defaultLayout = {defaultlayout} users = {users}></ChatLayot>
      </div>
    </main>
    
  );
}
