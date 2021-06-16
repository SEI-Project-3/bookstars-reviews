import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Styles/BookGrid.css';

const BookGrid = ({ extra, setExtra, setBooks, books, match }) => {
	let genreUrl = '';
	if (match) {
		switch (match.params.genre) {
			case 'fiction':
				genreUrl = 'combined-print-fiction';
				setExtra(genreUrl);
				break;
			case 'nonfiction':
				genreUrl = 'combined-print-nonfiction';
				setExtra(genreUrl);
				break;
			case 'youngadult':
				genreUrl = 'young-adult';
				setExtra(genreUrl);
				break;
			case 'middlegrade':
				genreUrl = 'childrens-middle-grade';
				setExtra(genreUrl);
				break;
			case 'childrens':
				genreUrl = 'picture-books';
				setExtra(genreUrl);
				break;
		}
	} else {
		genreUrl = 'combined-print-fiction';
	}

	useEffect(() => {
		fetch(
			`https://api.nytimes.com/svc/books/v3/lists/current/${genreUrl}.json?api-key=Har2JGxlbuOpjx3lnsMAWb4MPCzfGO3u`
		)
			.then((res) => res.json())
			.then((res) => {
				console.log(res.results);
				setBooks(res.results.books);
			})
			.catch();
	}, [extra]);

	return (
		<>
			<wrapper className='welcome'>
				<h1>Welcome</h1> <br />
			</wrapper>
			<section>
				{!books
					? null
					: books.map((book) => (
							<container className='book-card'>
								<Link to={`/books/${book.title}`} key={book.title}>
									<h3>{book.title}</h3>
									<img src={book.book_image} alt={book.title} />
									<h4>{book.author}</h4>
								</Link>
							</container>
					  ))}
			</section>
		</>
	);
};

export default BookGrid;
