// // src/pages/AdminUpload.tsx (or /pages/admin/upload.tsx if file-based routing)
// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { useNavigate } from 'react-router-dom';

// export default function AdminUploadPage() {
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAdmin = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       const allowedEmails = ['your-email@example.com']; // 👈 your email
//       if (user && allowedEmails.includes(user.email || '')) {
//         setIsAdmin(true);
//       } else {
//         navigate('/'); // Redirect if not admin
//       }

//       setLoading(false);
//     };

//     checkAdmin();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   if (!isAdmin) return null;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Admin Upload</h1>
//       {/* Your upload form goes here */}
//     </div>
//   );
// }

// src/pages/AdminUpload.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {PromptUploadForm} from '@/components/PromptUploadForm';

const AdminUpload = () => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

    if(user){
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
        navigate('/login');
      }
    };

    checkAccess();
  }, [navigate]);

  if (isAllowed === null) return null;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Prompt</h1>
      <PromptUploadForm />
    </div>
  );
};

export default AdminUpload;
