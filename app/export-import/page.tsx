import ExportImport from "@/components/ExportImport/ExportImport"

export const metadata = {
    title: 'Export Import | Password manager',
    description: 'Export and import your passwords',
}

const getAllItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/item?size=1000`, { cache: 'no-store' })
    return response.json()
}

export default async function ExportImportPage() {
    const items = await getAllItems()
    return (
        <ExportImport items={items.data.data} />
    )
}