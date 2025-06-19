import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';

const ReturnBook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:8000/api/peminjaman/jadwal-pengembalian', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Gagal mengambil data pengembalian.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5">🔄 Memuat data jadwal pengembalian...</div>;
  if (error) return <div className="container mt-5">❌ {error}</div>;

  return (
    <div className="container mt-5">
      <Card className="shadow p-4">
        <h3 className="mb-4">📚 Jadwal Pengembalian Buku</h3>
        {data.length === 0 ? (
          <p>Tidak ada buku yang sedang dipinjam.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Judul Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Tenggat</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.book}</td>
                  <td>{item.tanggal_pinjam}</td>
                  <td>{item.tenggat}</td>
                  <td><span className="badge bg-warning text-dark">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ReturnBook;
