import '../app/styles.css';
import ClientAlert from '../components/alert/ClientAlert';

export const metadata = {
  title: 'Frontend Developer',
  description: 'Skill Assessment Test',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
        <ClientAlert /> {/* This renders the client-side alert functionality */}
      </body>
    </html>
  );
}
