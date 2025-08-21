import '../styles/globals.css';

export const metadata = {
  title: 'Twibbon - Create & Share Campaign Frames',
  description: 'Create beautiful campaign frames and share them with the world. Join campaigns, customize your profile pictures, and spread awareness.',
  keywords: 'twibbon, campaign, frames, social media, profile picture, awareness',
  authors: [{ name: 'Twibbon Team' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Twibbon - Create & Share Campaign Frames',
    description: 'Create beautiful campaign frames and share them with the world.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twibbon - Create & Share Campaign Frames',
    description: 'Create beautiful campaign frames and share them with the world.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}