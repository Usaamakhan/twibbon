import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { dimensions } = await params;
  
  // Parse dimensions (e.g., "400/300" or "300")
  const [width, height] = dimensions.join('/').split('/').map(Number);
  const finalHeight = height || width; // If only one dimension, make it square
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${finalHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <rect x="20%" y="20%" width="60%" height="60%" fill="#d1d5db" rx="8"/>
      <circle cx="35%" cy="35%" r="8%" fill="#9ca3af"/>
      <rect x="50%" y="45%" width="35%" height="8%" fill="#9ca3af" rx="4"/>
      <rect x="50%" y="60%" width="25%" height="6%" fill="#d1d5db" rx="3"/>
      <text x="50%" y="80%" font-family="system-ui, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">
        ${width}×${finalHeight}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}