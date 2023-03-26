import { cookies } from 'next/headers'
import ExportImport from "@/components/ExportImport/ExportImport"
import axiosInstance from "@/utils/axios"

export const metadata = {
    title: 'Export Import | Password manager',
    description: 'Export and import your passwords',
}

export const dynamic = "force-dynamic"

const getAllItems = async () => {
    const cookieStore = cookies()
    const { data } = await axiosInstance.get("/item?size=1000", {
        headers: {
            cookie: cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join('; ')
        }
    })
    return data.data
}

export default async function ExportImportPage() {
    const items = await getAllItems()
    return (
        <ExportImport items={items.data} />
    )
}