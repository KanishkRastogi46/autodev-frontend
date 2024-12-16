'use client';

import { Suspense } from "react";
import Verify from "./verify";

function Loading() {
    return <div>Loading...</div>
}

export default function Page() {
    return (
        <Suspense fallback={Loading}>
            <Verify/>
        </Suspense>
    )
}