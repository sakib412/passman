import Home, { type Folder } from "@/components/Home/Home";
import axios from "axios";

const getAllFolders = async () => {
  const response = await axios.get("http://localhost:5000/api/folder/");
  return response.data;
}

export default async function HomePage() {
  const folders: {
    is_success: boolean; data: {
      currentPage: number,
      totalData: number,
      totalPage: number,
      prevPage: number | null,
      nextPage: number | null,
      data: Folder[]
    }
  } = await getAllFolders();

  return (
    <Home folders={folders.data} />
  )
}
