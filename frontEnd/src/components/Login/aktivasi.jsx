// AccountActivation.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AccountActivation = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    

    const activateAccount = async () => {
      try {
        Swal.fire({
          title: 'Memproses Aktivasi',
          html: 'Sedang mengaktifkan akun Anda...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        await axios.get(`http://127.0.0.1:8000/api/activate/${token}`);
        
        Swal.fire({
          icon: 'success',
          title: 'Aktivasi Berhasil!',
          text: 'Akun Anda telah aktif. Silakan login.',
        }).then(() => navigate('/login'));
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Aktivasi Gagal',
          text: error.response?.data?.message || 'Token tidak valid',
        }).then(() => navigate('/login'));
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memproses aktivasi akun...</p>
      </div>
    </div>
  );
};

export default AccountActivation;