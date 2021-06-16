import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './images/logo.png';
import './Styles/Header.css';

const Header = () => {
	// const filterByList = (listName) => {
	// 	const filteredState = bookData.filter((book) => book.listName === listName);
	// 	const finalState = filteredState.map((one) => {
	// 		return one.name;
	// 	});
	// 	setChampNames(finalState);
	// };
	// const search = (e) => {
	// 	const filteredState = extraStateArray.filter((book) =>
	// 		book.toLowerCase().startsWith(e.target.value.toLowerCase())
	// 	);
	// 	setStateThing(filteredState);
	// };
	return (
		<div>
			<div className='headbar'>
				<Link to='/'>
					<img src={Logo} alt='Bookstars' className='logo' />
				</Link>
			</div>
			<nav>
				<form>
					<input
						type='text'
						className='inputSearch'
						// onChange={search}
						placeholder='Search for a book'
					/>
				</form>
      <Link to={`/fiction`} className='navLinks'>
				Fiction
			</Link>
			<Link to={`/nonfiction`} className='navLinks'>
				Nonfiction
			</Link>
			<Link to={`/childrens`} className='navLinks'>
				Children's
			</Link>
			<Link to={`/culture`} className='navLinks'>
				Culture
			</Link>
			<Link to={`/education`} className='navLinks'>
				Education
			</Link>
			</nav>

		</div>
	);
};
export default Header;
