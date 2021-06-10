import './App.css';
import { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import Header from './Components/Header';
import Gallery from './Components/Gallery';
import BookGrid from './Components/BookGrid';
import BookDetail from './Components/BookDetail';

function App() {
	useEffect(() => {
		fetch('http://localhost:3000/api/books')
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch();
	}, []);

	return (
		<div className='App'>
			<h1>this is app</h1>
			<Route path='/' render={() => <Header />} />
			<Route path='/' exact render={() => <Gallery />} />
			<Route path='/' exact render={() => <BookGrid />} />
			<Route path='/:genre' exact render={() => <BookGrid />} />
			<Route path='/books/:id' exact render={() => <BookDetail />} />
		</div>
	);
}

export default App;
