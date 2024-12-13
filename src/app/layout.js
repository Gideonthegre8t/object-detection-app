import '../app/styles.css';
import ClientAlert from '../components/alert/ClientAlert';

export const metadata = {
  title: 'The Invigilator',
  description: 'Skill Assessment Test',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
        <ClientAlert /> 
      </body>
    </html>
  );
}
