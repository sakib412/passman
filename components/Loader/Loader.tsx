"use client";

import { Spin } from "antd";

export default function Loader() {

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', }}>
            <Spin size="large" />
        </div>
    )
}