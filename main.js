fetch('https://api.myjson.com/bins/udbm5')
    .then(res => res.json())
    .then(data => {
        let books = data.books;
        createCard(books);
        createCarousel(books);
        let dataStr = JSON.stringify(data)

        let para = document.createElement('p');
        para.innerHTML = dataStr;
        para.setAttribute('hidden', 'true');
        para.setAttribute('id', 'dataStr')

        document.body.appendChild(para);
    })
    .catch(err => console.log(err))

let search = document.getElementById('search')
console.log('abc')

search.addEventListener('keyup', filteredBooks)


function createCard(books) {
    let bookcards = document.getElementById('bookcards');

    let defaulDiv = document.createElement('div');
    defaulDiv.setAttribute('id', 'defaultDiv');
    defaulDiv.setAttribute('class', 'container bg-light d-flex flex-wrap justify-content-around');

    books.forEach(function (each) {
        let n = books.indexOf(each)
        let card = document.createElement('div');
        card.setAttribute('class', 'card border-0');
        let image = document.createElement('img');
        image.setAttribute('src', each.portada);
        image.setAttribute('alt', 'book.jpg');
        image.setAttribute('class', 'front w-100 h-auto');
        card.appendChild(image);
        let content = document.createElement('div');
        content.setAttribute('class', 'back w-100 p-2 text-center d-flex flex-wrap align-content-between');
        card.appendChild(content);

        let title = document.createElement('div');
        title.setAttribute('class', 'w-100 align-items-center')
        let pTitle = document.createElement('p');
        pTitle.setAttribute('class', 'font-weight-bold');
        pTitle.innerHTML = each.titulo;
        title.appendChild(pTitle);
        content.appendChild(title);

        let text = document.createElement('div');
        text.setAttribute('class', 'w-100 align-items-center')
        let pTextlan = document.createElement('p');
        pTextlan.innerHTML = each.idioma;
        let pTextText = document.createElement('p');
        pTextText.innerHTML = each.descripcion;
        text.appendChild(pTextlan);
        text.appendChild(pTextText);
        content.appendChild(text);

        let secPicLink = document.createElement('p');
        secPicLink.innerHTML = each.detalle;
        secPicLink.setAttribute('hidden', 'true');
        content.appendChild(secPicLink);

        let firstPicLink = document.createElement('p');
        firstPicLink.innerHTML = each.portada;
        firstPicLink.setAttribute('hidden', 'true');
        content.appendChild(firstPicLink);


        let more = document.createElement('div');
        more.setAttribute('class', 'w-100 d-flex justify-content-center')
        let moreLink = document.createElement('a');
        moreLink.setAttribute('href', '#myBooks');
        moreLink.setAttribute('data-slide-to', n)
        let moreBtn = document.createElement('button');
        moreBtn.setAttribute('type', 'button');
        moreBtn.setAttribute('data-toggle', 'modal');
        moreBtn.setAttribute('data-target', '#secBookPic');
        moreBtn.setAttribute('class', 'btn btn-secondary py-1')
        moreBtn.innerHTML = 'more';
        moreLink.appendChild(moreBtn);
        more.appendChild(moreLink);
        content.appendChild(more);

        defaulDiv.appendChild(card);
    });
    bookcards.appendChild(defaulDiv);
}

function createCarousel(books) {

    books.forEach(function (each) {
        if (books.indexOf(each) === 0) {
            each.carousel_class = 'carousel-item active'
        } else {
            each.carousel_class = 'carousel-item'
        }
    });

    let carousel = document.createElement('div');
    carousel.setAttribute('id', 'carousel-inner');
    carousel.setAttribute('class', 'carousel-inner');

    let myBooks = document.getElementById('myBooks');

    books.forEach(function (each) {
        let item = document.createElement('div');
        item.setAttribute('class', each.carousel_class);

        let modalHeader = document.createElement('div');
        modalHeader.setAttribute('class', 'modal-header');
        let header = document.createElement('h4');
        header.innerHTML = each.titulo;
        modalHeader.appendChild(header);
        item.appendChild(modalHeader);

        let modalBody = document.createElement('div');
        modalBody.setAttribute('class', 'modal-body');
        let secIMG = document.createElement('img');
        secIMG.setAttribute('src', each.detalle);
        secIMG.setAttribute('alt', 'book.jpg');
        secIMG.setAttribute('class', 'w-100 h-auto');
        modalBody.appendChild(secIMG);
        item.appendChild(modalBody);
        carousel.appendChild(item);
    });
    myBooks.appendChild(carousel);

}

function filteredBooks() {

    let dataStr = document.getElementById('dataStr').innerHTML;
    let bookdata = JSON.parse(dataStr).books;

    let bookcards = document.getElementById('defaultDiv');
    bookcards.parentNode.removeChild(bookcards);

    let defaultSecDiv = document.getElementById('carousel-inner');
    defaultSecDiv.parentNode.removeChild(defaultSecDiv);

    let str = document.getElementById('search').value.toLowerCase();

    let secBookSet = bookdata.filter((book) => {
        if (book.titulo.toLowerCase().match(str) || book.descripcion.toLowerCase().match(str) || book.idioma.toLowerCase().match(str)) return true
    });

    createCard(secBookSet);
    createCarousel(secBookSet);

    let footer = document.getElementById('footer');
    if (secBookSet.length === 0) {
        footer.setAttribute('class', 'container-fluid bg-light')
    } else {
        footer.setAttribute('class', 'd-none')

    }

}
