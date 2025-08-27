import Book from "../models/book.model.js";

// add a new book

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      offerPrice,
      rating,
      reviews,
      description,
      category,
    } = req.body;
    if (
      !title ||
      !author ||
      !price ||
      !offerPrice ||
      !rating ||
      !reviews ||
      !description ||
      !category
    ) {
      return res.status(400).json({ message: "All feild are required" });
    }
    const image = req.file.filename;
    const book = await Book.create({
      title,
      author,
      price,
      offerPrice,
      rating,
      reviews,
      description,
      category,
      image,
    });
    return res.status(200).json({
      success: true,
      book,
      message: "book added successfully",
    });
  } catch (error) {
    console.error("error during adding book", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};

// get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("error during fetching books", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};
