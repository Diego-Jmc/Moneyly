import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="en">
          <body className="bg-gray-100 flex items-center justify-center min-h-screen">
         
              {children}
          
          </body>
        </html>
      );
    }
    