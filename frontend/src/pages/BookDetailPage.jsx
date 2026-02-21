import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState();
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book", error);
        toast.error("failed to fetch the book");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("are you sure you want to delte this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      toast.success("Book deletd successfuly");
      navigate("/");
    } catch (error) {
      console.error("error deleting book", error);
      toast.error("failed to delete book");
    }
  };

  const handleSave = async () => {
    if (!book.title.trim() || !book.author.trim()) {
      toast.error("plaese add title and author");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/books/${id}`, {
        title: book.title,
        author: book.author,
        publishYear: Number(book.publishYear)
      });

      toast.success("Book updated successfully");
      navigate("/")
    } catch (error) {
      console.error("error updating book", error);
      toast.error("failed to update book");
    } finally {
      setSaving(false);

    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex ietms-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto">
        {/*HEADER*/}
        <div className="flex ietm-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />back to books
          </Link>

          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5" />Delete Book
          </button>
        </div>

        {/*FORM CARD*/}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            {/*TITLE*/}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>

              </label>
              <input type="text" placeholder="Book Title" className="input input-bordered" value={book.title} onChange={(e) =>
                setBook({ ...book, title: e.target.value })} />
            </div>
            {/*AUTHOR*/}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-tetx">Author</span>
              </label>
              <input type="text" placeholder="Book author" className="input input-bordered" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />

            </div>
            {/*PUBLISH YEAR*/}
            <div className="form-contol mb-6">
              <lable className="label">
                <span className="label-text">Publish Year</span>
              </lable>
              <input type="number" placeholder="Year" className="input input-bordered" value={book.publishYear} onChange={(e) =>
                setBook({ ...book, publishYear: target.value })} />
              {/*ACTION*/}
              <div className="card-action justify-end">
                <button className="btn btn-primary" disabled={saving}
                  onClick={handleSave}>
                  {saving ? "Saving..." : "save change"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
export default BookDetailPage;