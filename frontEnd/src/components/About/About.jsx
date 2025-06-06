import React from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  Accordion,
  Image,
} from 'react-bootstrap';

const LibraryInfo = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-5 text-primary">
        📚 Aplikasi Perpustakaan Online SMK ABC 123
      </h2>

      {/* Section: Informasi Perpustakaan */}
      <Card className="p-4 mb-4 shadow rounded-4 border-0">
        <Card.Body>
          <Card.Title className="mb-3 fs-4 fw-bold text-secondary">
            👋 Selamat Datang di Perpustakaan Digital
          </Card.Title>
          <Card.Text className="text-muted">
            Kini SMK ABC 123 menghadirkan Aplikasi Perpustakaan Berbasis Website
            yang modern dan praktis, memudahkan siswa dalam mencari dan meminjam buku tanpa harus mengantri.
          </Card.Text>
          <Card.Text className="text-muted">
            Dengan fitur <strong>booking online</strong>, siswa dapat memilih buku dari mana saja dan menerima 
            <strong> strook digital</strong> sebagai bukti peminjaman.
          </Card.Text>
          <Card.Text className="text-muted">
            Tunjukkan bukti reservasi kepada petugas dan ambil buku dengan cepat dan mudah!
          </Card.Text>
          <Card.Text className="text-muted">
            Mari manfaatkan teknologi ini dan jadi bagian dari <strong>generasi literasi digital!</strong>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Section: Panduan Penggunaan */}
      <h4 className="mb-3 text-success">📘 Panduan Penggunaan Website</h4>
      <Card className="p-3 shadow-sm rounded-4 border-0 mb-5">
        <ListGroup variant="flush">
          <ListGroup.Item>✅ Buka website perpustakaan SMK ABC 123.</ListGroup.Item>
          <ListGroup.Item>✅ Login menggunakan akun siswa.</ListGroup.Item>
          <ListGroup.Item>✅ Cari buku yang ingin dipinjam menggunakan fitur pencarian.</ListGroup.Item>
          <ListGroup.Item>✅ Klik tombol <em>"Reservasi Buku"</em>.</ListGroup.Item>
          <ListGroup.Item>✅ Dapatkan strook digital sebagai bukti reservasi.</ListGroup.Item>
          <ListGroup.Item>✅ Tunjukkan strook kepada petugas perpustakaan.</ListGroup.Item>
          <ListGroup.Item>✅ Ambil buku dan selamat membaca!</ListGroup.Item>
        </ListGroup>
      </Card>

      {/* Section: FAQ */}
      <h4 className="mb-3 text-info">❓ FAQ - Pertanyaan Umum</h4>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Apakah saya bisa meminjam lebih dari satu buku?</Accordion.Header>
          <Accordion.Body>
            Belum. Siswa hanya boleh meminjam 1 buku untuk 1 waktu, sesuai dengan kebijakan perpustakaan.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Berapa lama durasi peminjaman buku?</Accordion.Header>
          <Accordion.Body>
            Durasi peminjaman adalah 30 hari. Jika ingin memperpanjang, harap lakukan sebelum tanggal jatuh tempo.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Bagaimana jika buku yang saya cari tidak tersedia?</Accordion.Header>
          <Accordion.Body>
            Anda bisa mengunjungi lain waktu, dan mencari buku yang anda cari.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Apakah saya bisa membatalkan reservasi buku?</Accordion.Header>
          <Accordion.Body>
            Ya, Anda dapat membatalkan melalui menu "Reservasi Saya" selama buku belum diambil.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default LibraryInfo;
