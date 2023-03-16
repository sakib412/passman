import { message } from "antd";

export async function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text)
        .then(() => {
            // antd success notification
            message.success("Copied to clipboard", 1.5)
        })
        .catch((error) => {
            // antd error notification
            message.error("Error copying text", 1.5)
            console.error("Error copying text: ", error);
        });
}