import React from "react";
import { Table, Card } from "react-bootstrap";

function BorrowHistory() {
  // Contoh data riwayat peminjaman buku
  const borrowHistory = [
    { id: 1, bookTitle: "The Great Gatsby", borrowDate: "2025-04-01", returnDate: "2025-04-15", status: "Returned" },
    { id: 2, bookTitle: "1984", borrowDate: "2025-04-10", returnDate: "2025-04-24", status: "Pending" },
    { id: 3, bookTitle: "To Kill a Mockingbird", borrowDate: "2025-03-20", returnDate: "2025-04-03", status: "Returned" },
    { id: 4, bookTitle: "Moby Dick", borrowDate: "2025-04-05", returnDate: "2025-04-19", status: "Pending" }
  ];

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Borrow History</h3>
      
      {/* Card container for Borrow History */}
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowHistory.map((borrow, index) => (
                <tr key={borrow.id}>
                  <td>{index + 1}</td>
                  <td>{borrow.bookTitle}</td>
                  <td>{borrow.borrowDate}</td>
                  <td>{borrow.returnDate}</td>
                  <td>
                    <span className={`badge ${borrow.status === "Returned" ? "bg-success" : "bg-warning"}`}>
                      {borrow.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BorrowHistory;
