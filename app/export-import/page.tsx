import ExportImport from "@/components/ExportImport/ExportImport"
import axiosInstance from "@/utils/axios"

export const metadata = {
    title: 'Export Import | Password manager',
    description: 'Export and import your passwords',
}

const getAllItems = async () => {
    const { data } = await axiosInstance.get('/item?size=1000')
    return data.data
}

export default async function ExportImportPage() {
    const items = await getAllItems()
    return (
        <ExportImport items={items.data} />
    )
}