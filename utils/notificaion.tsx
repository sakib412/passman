"use client"

import { message } from "antd"

export const error = (s: string) => {
    message.error(s)
}

export const success = (s: string) => {
    message.success(s)
}
