import Home, { ItemType, type Folder } from "@/components/Home/Home";
import axiosInstance from "@/utils/axios";
import { redirect } from "next/navigation";

import type { ApiResponsePaginated } from '@/types/response'
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"


const getAllFolders = async (): Promise<ApiResponsePaginated<Folder> | void> => {
  const cookieStore = cookies()
  try {
    const response = await axiosInstance.get("/folder/", {
      headers: {
        cookie: cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join('; ')
      }
    });
    return response.data;
  } catch (e: any) {
    if (e.response.status === 401) {
      return
    }
  }
}

const getAllItems = async (): Promise<ApiResponsePaginated<ItemType> | void> => {
  const cookieStore = cookies()
  try {
    const response = await axiosInstance.get("/item?size=1000", {
      headers: {
        cookie: cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join('; ')
      }
    });
    return response.data;
  } catch (e: any) {
    if (e.response.status === 401) {
      return
    }
  }
}

export default async function HomePage() {
  const [folders, items] = await Promise.all([
    getAllFolders(),
    getAllItems()
  ])

  if (!folders || !items) {
    redirect("/login")
  }

  return (
    <Home folders={folders.data} items={items.data} />
  )
}
