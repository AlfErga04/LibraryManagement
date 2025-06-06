import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

// Dummy data peminjaman berdasarkan ID
const dummyData = {
  101: {
    title: 'React untuk Pemula',
    borrower: 'Alice',
    due_date: '2024-07-20',
  },
  102: {
    title: 'Node.js Lanjutan',
    borrower: 'Bob',
    due_date: '2025-07-10',
  },
  103: {
    title: 'Laravel Mastery',
    borrower: 'Charlie',
    due_date: '2024-07-25',
  },
};

const ReturnBook = () => {
  const { id } = useParams(); // Simulasi ID dinamis dari URL
  const [borrowedBook, setBorrowedBook] = useState(null);

  useEffect(() => {
    // Simulasi ambil data dari backend (dummy)
    const data = dummyData[id];
    if (data) {
      setBorrowedBook(data);
    } else {
      console.error('Data tidak ditemukan untuk ID:', id);
    }
  }, [id]);

  if (!borrowedBook) {
    return <div className="container mt-5">📦 Data peminjaman tidak ditemukan untuk ID: {id}</div>;
  }

  const today = new Date();
  const dueDate = new Date(borrowedBook.due_date);
  const lateDays = Math.max(0, Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)));
  const finePerDay = 10000;
  const totalFine = lateDays * finePerDay;

  const handlePayment = () => {
    alert('Simulasi pembayaran dummy!');
    console.log('Pembayaran berhasil (dummy)');
  };

  return (
    <div className="container mt-5">
      <Card className="shadow p-4">
        <h3 className="mb-3">📚 Pengembalian Buku (ID: {id})</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama Peminjam</Form.Label>
            <Form.Control type="text" readOnly value={borrowedBook.borrower} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Judul Buku</Form.Label>
            <Form.Control type="text" readOnly value={borrowedBook.title} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tanggal Jatuh Tempo</Form.Label>
            <Form.Control type="text" readOnly value={borrowedBook.due_date} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Terlambat</Form.Label>
            <Form.Control type="text" readOnly value={`${lateDays} hari`} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Total Denda</Form.Label>
            <Form.Control type="text" readOnly value={`Rp ${totalFine.toLocaleString()}`} />
          </Form.Group>

          {totalFine > 0 ? (
            <Button variant="success" onClick={handlePayment}>
              💳 Bayar Sekarang
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              Tidak Ada Denda
            </Button>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default ReturnBook;
