import React, { useState, useEffect } from "react";
import { Table, Card, Alert, Badge } from "react-bootstrap";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { BsCheckCircleFill } from "react-icons/bs";

function BorrowHistory() {
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBorrowHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/peminjaman/riwayat', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = Array.isArray(response.data?.data)
        ? response.data.data.filter(item =>
          item.status === "dikembalikan" || item.status === "telat"
        )
        : [];

      setBorrowHistory(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch borrow history");
      console.error("Error fetching borrow history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-stone-50">
        <HashLoader color="#0854ff" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Riwayat Peminjaman</h3>

      <Card>
        <Card.Body>
          {!borrowHistory || borrowHistory.length === 0 ? (
            <div className="text-center py-4">
              <p>Tidak ada riwayat peminjaman</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Judul Buku</th>
                  <th>Tanggal Pinjam</th>
                  <th>Tenggat</th>
                  <th>Status</th>
                  <th>Denda</th>
                </tr>
              </thead>
              <tbody>
                {borrowHistory.map((borrow, index) => (
                  <tr key={borrow.id || index}>
                    <td>{index + 1}</td>
                    <td>{borrow.book || 'N/A'}</td>
                    <td>{borrow.tanggal_pinjam ? new Date(borrow.tanggal_pinjam).toLocaleDateString() : 'N/A'}</td>
                    <td>{borrow.tenggat ? new Date(borrow.tenggat).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <Badge
                        bg={
                          borrow.status === "dikembalikan" ? "success" :
                            borrow.status === "telat" ? "danger" : "warning"
                        }
                      >
                        {borrow.status || 'unknown'}
                      </Badge>
                    </td>
                    <td>
                      {borrow.pengembalian?.pembayaran ? (
                        <span className="badge text-success  d-flex align-items-center gap-1">
                          <BsCheckCircleFill color="green" size={16} />
                          Dibayar
                        </span>
                      ) : borrow.denda > 0 ? (
                        `Rp ${borrow.denda.toLocaleString('id-ID')}`
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BorrowHistory;