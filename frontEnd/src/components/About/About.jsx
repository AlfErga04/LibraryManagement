import React from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  Accordion,
} from 'react-bootstrap';
import './About.css';

const LibraryInfo = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-5 heading-primary">
        📚 Aplikasi Perpustakaan Online Repository.io
      </h2>

      <Row className="g-4 mb-5">
        {/* About Section */}
        <Col lg={6}>
          <Card className="p-4 shadow card-custom border-0 h-100">
            <Card.Body>
              <Card.Title className="mb-3 fs-4 fw-bold heading-secondary">
                👋 Selamat Datang di Perpustakaan Digital
              </Card.Title>
              <Card.Text className="text-body">
                Kini <strong>SMA Capadokia 11</strong> menghadirkan Aplikasi Perpustakaan Berbasis Website
                yang modern dan praktis, memudahkan siswa dalam mencari dan meminjam buku tanpa harus mengantri.
              </Card.Text>
              <Card.Text className="text-body">
                Dengan fitur <strong>booking online</strong>, siswa dapat memilih buku dari mana saja dan menerima 
                <strong> strook digital</strong> sebagai bukti peminjaman.
              </Card.Text>
              <Card.Text className="text-body">
                Tunjukkan bukti reservasi kepada petugas dan ambil buku dengan cepat dan mudah!
              </Card.Text>
              <Card.Text className="text-body">
                Mari manfaatkan teknologi ini dan jadi bagian dari <strong>generasi literasi digital!</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Panduan Section */}
        <Col lg={6}>
          <Card className="p-4 shadow card-custom border-0 h-100">
            <Card.Body>
              <Card.Title className="mb-3 subheading">
                📘 Panduan Penggunaan Website
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>✅ Buka website perpustakaan SMA Capadokia 11.</ListGroup.Item>
                <ListGroup.Item>✅ Login menggunakan akun siswa.</ListGroup.Item>
                <ListGroup.Item>✅ Cari buku yang ingin dipinjam menggunakan fitur pencarian.</ListGroup.Item>
                <ListGroup.Item>✅ Klik tombol <em>"Reservasi Buku"</em>.</ListGroup.Item>
                <ListGroup.Item>✅ Dapatkan strook digital sebagai bukti reservasi.</ListGroup.Item>
                <ListGroup.Item>✅ Tunjukkan strook kepada petugas perpustakaan.</ListGroup.Item>
                <ListGroup.Item>✅ Ambil buku dan selamat membaca!</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <section className="faq-section p-4 rounded-4 shadow-sm mb-5">
        <h4 className="mb-4 subheading">❓ FAQ - Pertanyaan Umum</h4>
        <Accordion defaultActiveKey="0" alwaysOpen className="accordion-custom">
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
      </section>
    </Container>
  );
};

export default LibraryInfo;
