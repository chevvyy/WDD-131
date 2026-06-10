
const articles = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 2,
		title: 'Magnus Chase Book One: Sword of Summer',
		date: 'December 12, 2021',
		description:
			'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
		imgSrc:
			'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
		imgAlt: 'Book cover for Magnus Chase 1',
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		id: 3,
		title: "Belgariad Book One: Pawn of Prophecy",
		date: "Feb 12, 2022",
		description:
		"A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
		imgSrc:
		"https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
		imgAlt: "Book cover for Pawn of Prophecy",
		ages: "12-16",
		genre: "Fantasy",
		stars: "⭐⭐⭐⭐⭐"
	}
];

//articles.forEach(article => {
//	const container = document.getElementById('article-list');
//	const articleElement = document.createElement('article');
//	articleElement.setAttribute('aria-labelledby', `article-${article.id}-title`);
//	articleElement.innerHTML = `
//		<section id="descriptors">
  //          <p><strong>Release Date:</strong> ${article.date}</p>
	//	    <p><strong>Recommended Age:</strong> ${article.ages}</p>
	//	    <p><strong>Genre:</strong> ${article.genre}</p>
	//	    <p><strong>Rating:</strong> <span aria-label="${article.stars} out of 5 stars">${article.stars}</span></p>
//		</section>
//        <section id="book-info">
//            <h2 id="article-${article.id}-title">${article.title}</h2>
//		    <div><img src="${article.imgSrc}" alt="${article.imgAlt}"></div>
  //          <p id="article-${article.id}-desc">${article.description}</p>
    //    </section>
		
	//`;
	//container.appendChild(articleElement);
//});

articles.forEach(article => {
    const container = document.getElementById('article-list');
    const articleElement = document.createElement('article');
    articleElement.setAttribute('aria-labelledby', `article-${article.id}-title`);

    // Descriptors section
    const descriptors = document.createElement('section');
    descriptors.id = 'descriptors';

    const fields = [
        ['Release Date', article.date],
        ['Recommended Age', article.ages],
        ['Genre', article.genre],
        ['Rating', article.stars]
    ];

    fields.forEach(([label, value]) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${label}:</strong> ${value}`;
        descriptors.appendChild(p);
    });

    // Book info section
    const bookInfo = document.createElement('section');
    bookInfo.id = 'book-info';

    const h2 = document.createElement('h2');
    h2.id = `article-${article.id}-title`;
    h2.textContent = article.title;

    const imgDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = article.imgSrc;
    img.alt = article.imgAlt;
    imgDiv.appendChild(img);

    const desc = document.createElement('p');
    desc.id = `article-${article.id}-desc`;
    desc.textContent = article.description;

    bookInfo.append(h2, imgDiv, desc);
    articleElement.append(descriptors, bookInfo);
    container.appendChild(articleElement);
}); //chatGPT helped with this code