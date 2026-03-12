import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) return NextResponse.json({ error: "No file" })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = Date.now() + "-" + file.name
  const uploadPath = path.join(process.cwd(), "public/uploads/videos", fileName)

  fs.writeFileSync(uploadPath, buffer)

  return NextResponse.json({
    url: `/uploads/videos/${fileName}`,
  })
}