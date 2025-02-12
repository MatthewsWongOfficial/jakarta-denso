import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"
import { NextResponse } from "next/server"

export async function GET() {
  const contentDirectory = path.join(process.cwd(), "content")
  const files = await fs.readdir(contentDirectory)

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(contentDirectory, file)
        const fileContent = await fs.readFile(filePath, "utf8")
        const { data } = matter(fileContent)

        return {
          slug: file.replace(".md", ""),
          frontmatter: {
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            coverImage: data.coverImage || "/placeholder.svg?height=400&width=600",
            category: data.category || "Uncategorized",
          },
        }
      }),
  )

  return NextResponse.json(posts)
}

