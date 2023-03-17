import Home, { ItemType, type Folder } from "@/components/Home/Home";

const getAllFolders = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/folder/`, { cache: 'no-store' });
  return response.json();
}

const getAllItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/item/`, { cache: 'no-store' });
  return response.json();
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
