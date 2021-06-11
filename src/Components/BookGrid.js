import React from 'react';
import { Link } from 'react-router-dom'

const BookGrid = ({books}) => {

    return (
        <section>
            {books.map((book) => (
                <Link to={`/books/${book.title}`}> 
                    <h4>{book.title}</h4>
                    <h6>{book.author}</h6>
                    <img src={book.book_image} alt={book.title}/>
                </Link>
            ))}
        </section>
    );
};

export default BookGrid;