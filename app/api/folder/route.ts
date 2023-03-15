import dbConnect from "@/lib/db"
import Folder from "@/models/Folder"

export async function GET(request: Request) {
    const a = await dbConnect()
    console.log("hhsdhdsf", a)

    // const folders = await Folder.find({})
    // console.log(folders)

    return new Response('Hello, Next.js!')
}
