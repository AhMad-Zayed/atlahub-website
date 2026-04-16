import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const pathSegments = resolvedParams?.path || [];
  const fileName = pathSegments.join('/');
  
  // Guard against path traversal attacks
  if (fileName.includes('..') || fileName.includes('*')) {
    return new NextResponse('Unauthorized access', { status: 403 });
  }

  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

  try {
    const fileBuffer = await fs.readFile(filePath);
    
    let contentType = 'application/octet-stream';
    const lowerName = fileName.toLowerCase();
    
    if (lowerName.endsWith('.pdf')) contentType = 'application/pdf';
    else if (lowerName.endsWith('.png')) contentType = 'image/png';
    else if (lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (lowerName.endsWith('.svg')) contentType = 'image/svg+xml';
    else if (lowerName.endsWith('.webp')) contentType = 'image/webp';
    else if (lowerName.endsWith('.doc')) contentType = 'application/msword';
    else if (lowerName.endsWith('.docx')) contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch (error) {
    return new NextResponse('File not found physically on server', { status: 404 });
  }
}
