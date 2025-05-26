"use client";

import { X, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

export function BookModal({ book, isOpen, onClose }) {
    const [borrowStep, setBorrowStep] = useState(0);
    const [returnDate, setReturnDate] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [qrCodeData, setQrCodeData] = useState("");
    const [reservationId, setReservationId] = useState("");

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate());
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    const formatDate = (date) => {
        return date.toISOString().split("T")[0];
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setBorrowStep(0);
            setReturnDate("");
            setAgreedToTerms(false);
            setQrCodeData("");
            setReservationId("");
        }
    }, [isOpen]);

    const handleBorrow = () => {
        if (book.stok > 0) {
            setBorrowStep(1);
        }
    };

    const handleFinish = async () => {
        if (returnDate && agreedToTerms) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/borrow",
                    {
                        book_id: book.id,
                        return_date: returnDate,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                const { qr_code, reservation_id } = response.data;
                setQrCodeData(JSON.stringify(qr_code));
                setReservationId(reservation_id);
                setBorrowStep(2);

                // Update stock locally
                book.stok -= 1;
            } catch (error) {
                console.error("Error borrowing book:", error);
                alert("Failed to reserve book. Please try again.");
            }
        }
    };

    const handleCloseModal = () => {
        onClose();
        setTimeout(() => {
            setBorrowStep(0);
        }, 300);
    };

    if (!isOpen || !book) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="relative bg-white rounded-xl shadow-2xl w-full mt-20 max-h-[80vh] overflow-auto transition-all duration-300"
                style={{ maxWidth: isOpen ? "24rem" : "16rem" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 text-slate-700 hover:bg-slate-200 transition-colors z-10"
                >
                    <X className="h-5 w-5" />
                </button>

                {borrowStep === 0 && (
    <>
        <div className="relative h-36 w-full overflow-hidden">
            <img
                src={`http://localhost:8000/storage/${book.image}`}
                alt={book.judul}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="p-4">
            <h2 className="font-serif text-xl font-medium text-slate-800 mb-2 mt-0">
                {book.judul}
            </h2>
            <p className="text-sm text-amber-600 mb-2">
                By {book.penulis} • {book.tahun_terbit}
            </p>

            <div className="mb-4">
                <h3 className="text-sm font-medium text-slate-700 mb-1">ISBN</h3>
                <p className="text-sm text-slate-600">{book.isbn || "ISBN not available"}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-sm font-medium text-slate-700 mb-1">Description</h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                    {book.description || "No description available"}
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-medium text-slate-700 mb-1">Category</h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                    {book.category || "No description available"}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-stone-50 p-2 rounded-lg">
                    <h3 className="text-xs font-medium text-slate-700 mb-1">Stock</h3>
                    <p className="text-base font-medium text-slate-800">{book.stok} copies</p>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                    <h3 className="text-xs font-medium text-slate-700 mb-1">Status</h3>
                    <p
                        className={`text-base font-medium ${
                            book.stok > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {book.stok > 0 ? "Available" : "Out of Stock"}
                    </p>
                </div>
            </div>

            <Button
                className="w-full bg-amber-300 hover:bg-amber-400 text-slate-900 font-medium py-3 text-sm"
                onClick={handleBorrow}
                disabled={book.stok === 0}
            >
                {book.stok > 0 ? "Borrow Now" : "Currently Unavailable"}
            </Button>
        </div>
    </>
)}

                {borrowStep === 1 && (
                    <div className="p-4">
                        <div className="mb-4 text-center">
                            <h2 className="font-serif text-xl font-medium text-slate-800 mb-1 mt-0">
                                Borrow "{book.judul}"
                            </h2>
                            <p className="text-sm text-slate-600">Select return date and agree to terms</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Return Date</label>
                            <input
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                min={formatDate(minDate)}
                                max={formatDate(maxDate)}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-sm"
                            />
                            <p className="text-xs text-slate-500 mt-1">Books can be borrowed for 3–30 days</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-slate-700 mb-2">Terms & Agreement</h3>
                            <div className="bg-stone-50 p-3 rounded-lg mb-2 max-h-32 overflow-y-auto text-xs text-slate-600">
                                <p className="mb-2">By borrowing this book, you agree to the following terms:</p>
                                <ol className="list-decimal pl-5 space-y-1">
                                    <li>Return the book by the selected return date.</li>
                                    <li>Late returns incur $0.50 per day.</li>
                                    <li>You’re responsible for damage to the book.</li>
                                    <li>Lost books incur replacement + fee.</li>
                                    <li>QR code valid 24h for pickup.</li>
                                    <li>Bring valid ID to pick up.</li>
                                    <li>Books may be recalled early.</li>
                                    <li>Max 5 books per user.</li>
                                </ol>
                            </div>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="rounded border-slate-300 text-amber-400 focus:ring-amber-300"
                                />
                                <span className="text-sm text-slate-700">I agree to the terms</span>
                            </label>
                        </div>

                        <Button
                            className="w-full bg-amber-300 hover:bg-amber-400 text-slate-900 font-medium py-3 text-sm"
                            onClick={handleFinish}
                            disabled={!returnDate || !agreedToTerms}
                        >
                            Finish
                        </Button>
                    </div>
                )}

                {borrowStep === 2 && (
                    <div className="p-4">
                        <div className="text-center mb-3">
                            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-2">
                                <Check className="h-5 w-5 text-green-600" />
                            </div>
                            <h2 className="font-serif text-xl font-medium text-slate-800 mb-1 mt-1">Book Reserved!</h2>
                            <p className="text-sm text-slate-600">Show this QR code at the library</p>
                        </div>

                        <div className="flex flex-col items-center justify-center mb-3">
                            <div className="bg-white p-2 rounded-lg shadow-md">
                                <div className="relative w-40 h-40 bg-white flex items-center justify-center border border-slate-200 rounded-lg">
                                    <QRCodeCanvas value={qrCodeData} size={128} />
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-slate-500 mb-0">Valid for 24 hours</p>
                        </div>

                        <div className="bg-stone-50 p-2 rounded-lg text-sm space-y-1 mb-2">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Book:</span>
                                <span className="font-medium text-slate-800">{book.judul}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Return by:</span>
                                <span className="font-medium text-slate-800">{returnDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Reservation ID:</span>
                                <span className="font-medium text-slate-800">#{reservationId}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 text-sm"
                            onClick={handleCloseModal}
                        >
                            Close
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}