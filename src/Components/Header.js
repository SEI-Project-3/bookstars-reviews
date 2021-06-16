import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './images/logo.png';
import './Styles/Header.css';

const Header = ({ setBookDetails, bookDetail, history }) => {
	const [bookState, setBookState] = useState('');

	const search = (e) => {
		e.preventDefault();

		setBookState(e.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch(
			`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookState}&key=AIzaSyCbwixLUo_AQ7vhv3MnioBwURJEZ3n8jng`
		)
			.then((res) => res.json())
			.then((res) => {
				setBookDetails(res.items[0].volumeInfo);
				localStorage.setItem('book', JSON.stringify(res.items[0].volumeInfo));
				history.push(`/search/${res.items[0].volumeInfo.title}`);
			})
			.catch();
	};

	return (
		<div>
			<div className='headbar'>
				<Link to='/'>
					<img src={Logo} alt='Bookstars' className='logo' />
				</Link>
			</div>
			<nav>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='search'
						onChange={search}
						className='inputSearch'
						placeholder='Search for a book'
					/>
					<input type='submit' value='Search' />
				</form>
				<Link to={`/fiction`} className='navLinks'>
					Fiction
				</Link>
				<Link to={`/nonfiction`} className='navLinks'>
					Nonfiction
				</Link>
				<Link to={`/youngadult`} className='navLinks'>
					Young Adult
				</Link>
				<Link to={`/middlegrade`} className='navLinks'>
					Middle Grade
				</Link>
				<Link to={`/childrens`} className='navLinks'>
					Childrens
				</Link>
			</nav>
		</div>
	);
};
export default Header;
