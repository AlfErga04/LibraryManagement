import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'; 

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get('transaction_status');
    
    if (status === 'settlement') {
      Swal.fire({
        title: 'Pembayaran berhasil!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/borrow-history');
      });
    } else {
      Swal.fire({
        title: 'Pembayaran gagal!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/borrow-history');
      })
    }
  }, [searchParams, navigate]);

  return <div>Memproses pembayaran...</div>;
}