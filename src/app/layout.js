import '../app/styles.css';
export const metadata = {
  title: 'Frontend Developer',
  description: 'Skill Assessment Test',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
