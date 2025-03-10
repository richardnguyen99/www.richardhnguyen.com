// Download resume button
import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-static";

export async function GET(_req: NextRequest) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "resume",
    "resume.pdf",
  );
  const file = await fs.readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=Richard_H_Nguyen_Resume.pdf.pdf",
    },
  });
}
