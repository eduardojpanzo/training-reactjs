import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Subdomain {
  subdomain: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { subdomain }: Subdomain = await request.json();

  if (!subdomain) {
    return NextResponse.json(
      { error: "Subdomain is required" },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), "subdomains.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const subdomains: Subdomain[] = JSON.parse(fileData);

  subdomains.push({ subdomain });

  fs.writeFileSync(filePath, JSON.stringify(subdomains, null, 2));

  return NextResponse.json(
    { message: "Subdomain added successfully" },
    { status: 200 }
  );
}
