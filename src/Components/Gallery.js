
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import './Styles/Gallery.css';

const Gallery = ({ books, match, bookDetail, setBookDetails }) => {
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const chevronWidth = 40;

	return (
		<div style={{ padding: `0 ${chevronWidth}px` }}>
			<ItemsCarousel
				requestToChangeActive={setActiveItemIndex}
				activeItemIndex={activeItemIndex}
				numberOfCards={2}
				gutter={20}
				leftChevron={<button>{'<'}</button>}
				rightChevron={<button>{'>'}</button>}
				outsideChevron
				chevronWidth={chevronWidth}>
				<div style={{ height: 300, background: '#E6E2E0' }}>First card</div>
				<div style={{ height: 300, background: '#E6E2E0' }}>Second card</div>
				<div style={{ height: 300, background: '#E6E2E0' }}>Third card</div>
				<div style={{ height: 300, background: '#E6E2E0' }}>Fourth card</div>
			</ItemsCarousel>
		</div>
	);
};

export default Gallery;
