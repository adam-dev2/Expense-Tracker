import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        name:'Adam',
        email:'shaikadam273@gmail.com'
    })
}