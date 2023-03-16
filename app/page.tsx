import Home, { ItemType, type Folder } from "@/components/Home/Home";
import axiosInstance from "@/utils/axios";
import axios from "axios";

const getAllFolders = async () => {
  const response = await axiosInstance.get("/folder/");
  return response.data;
}

const getAllItems = async () => {
  const response = await axiosInstance.get("/item/");
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

  const items: {
    is_success: boolean; data: {
      currentPage: number,
      totalData: number,
      totalPage: number,
      prevPage: number | null,
      nextPage: number | null,
      data: ItemType[]
    }
  } = await getAllItems();


  return (
    <Home folders={folders.data} items={items.data} />
  )
}
