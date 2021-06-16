import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const GoogleBook = ({ bookDetail, setBookDetails }) => {
	const history = useHistory();
	const bookTitle = bookDetail.title;
	const [reviews, setReviews] = useState([]);
	const [ratings, setRatings] = useState([]);
	const [formState, setFormState] = useState({ review: '', rating: '' });
	const [error, setError] = useState(false);
	const [errText, setErrText] = useState(false);
	const [avgRating, setAvgRating] = useState(0);
	const [editState, setEditState] = useState(-1);
	const [editText, setEditText] = useState('');
	const [newState, setNewState] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('book') && !bookDetail) {
			const newBook = localStorage.getItem('book');
			setBookDetails(JSON.parse(newBook));
		}
		//http://localhost:3000/api/books/title/${bookTitle}
		//https://glacial-tundra-96946.herokuapp.com/api/books/title/${bookTitle}
		fetch(
			`https://glacial-tundra-96946.herokuapp.com/api/books/title/${bookTitle}`
		)
			.then((res) => res.json())
			.then((res) => {
				if (res?.ratings) {
					setRatings(res.ratings);
				}
				if (res?.reviews) {
					setReviews(res.reviews);
				}
			})
			.catch();
	}, [bookDetail, newState]);

	useEffect(() => {
		if (ratings.length === 1) {
			setAvgRating(ratings[0]);
		} else if (ratings.length > 1) {
			setAvgRating(ratings.reduce((a, b) => (a + b) / 2));
		}
	}, [ratings, reviews]);

	const submitBook = (bookReviews, bookRatings) => {
		const payload = {
			title: bookTitle,
			reviews: [...bookReviews, formState.review],
			ratings: [...bookRatings, formState.rating],
		};
		//http://localhost:3000/api/books/title/${bookTitle}
		//https://glacial-tundra-96946.herokuapp.com/api/books/title/${bookTitle}
		const url = `https://glacial-tundra-96946.herokuapp.com/api/books/title/${bookTitle}`;
		fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(payload),
		})
			.then((res) => res.json())
			.then((data) => {
				setNewState(!newState);
			})
			.catch((err) => setError(true));
	};

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!formState.review || !formState.rating) {
			setErrText(true);
			return;
		}
		submitBook(reviews, ratings);
	};

	// if there is no empty string on the end of reviews, this will create it, but not more than one
	// submitting a new review will overwrite the empty string with the created review
	const handleEdit = (reviewIndex) => {
		let newReviews = [...reviews];
		newReviews[reviewIndex] = editText;

		setReviews(newReviews);
		setEditState(-1);

		submitBook(newReviews, ratings);
	};

	const handleDelete = (reviewIndex) => {
		let newReviews = [...reviews];
		newReviews.splice(reviewIndex, 1);

		setReviews(newReviews);

		submitBook(newReviews, ratings);
	};

	return (
		<section>
			{!bookDetail ? null : (
				<div className='book-detail'>
					<h1>{bookDetail.title}</h1>
					<h3>{bookDetail.authors[0]}</h3>
					<img src={bookDetail.imageLinks.thumbnail} alt={bookDetail.title} />
					<p>{bookDetail.description}</p>
					<a
						href={bookDetail.infoLink}
						target='_blank'
						rel='noopener noreferrer'>
						Check out on Google
					</a>
				</div>
			)}
			<div>
				<form onSubmit={handleSubmit} className='rating-form'>
					<h3>Leave a Review</h3>
					{errText ? (
						<p>Please leave a rating and review before submitting</p>
					) : null}
					<p>Rating:</p>
					<div className='rate'>
						<input
							type='radio'
							id='star5'
							name='rating'
							value='5'
							onChange={handleChange}
						/>
						<label title='text'>5 stars</label>
						<input
							type='radio'
							id='star4'
							name='rating'
							value='4'
							onChange={handleChange}
						/>
						<label title='text'>4 stars</label>
						<input
							type='radio'
							id='star3'
							name='rating'
							value='3'
							onChange={handleChange}
						/>
						<label title='text'>3 stars</label>
						<input
							type='radio'
							id='star2'
							name='rating'
							value='2'
							onChange={handleChange}
						/>
						<label title='text'>2 stars</label>
						<input
							type='radio'
							id='star1'
							name='rating'
							value='1'
							onChange={handleChange}
						/>
						<label title='text'>1 star</label>
					</div>
					<div className='review'>
						<p>Your review:</p>
						<input
							name='review'
							type='text'
							className='review-text'
							value={formState.review}
							onChange={handleChange}
						/>
						<button type='submit'>Submit</button>
					</div>
				</form>
			</div>
			<h4>Average Rating</h4>
			{!ratings.length ? (
				<p>This book has not yet been rated.</p>
			) : (
				<p>{avgRating}</p>
			)}
			<h4>Reviews</h4>
			{!reviews.length ? (
				<p>Please leave a review</p>
			) : (
				reviews.map((review, i) =>
					editState === i ? (
						<div key={i}>
							<input
								type='text'
								value={editText}
								onChange={(e) => setEditText(e.target.value)}
							/>
							<button onClick={() => handleEdit(i)}>Submit</button>
						</div>
					) : (
						<div key={i}>
							<p>{review}</p>
							<button
								onClick={() => {
									setEditState(i);
									setEditText(review);
								}}>
								Edit
							</button>
							<button
								onClick={() => {
									handleDelete(i);
								}}>
								Delete
							</button>
						</div>
					)
				)
			)}
		</section>
	);
};

export default GoogleBook;
