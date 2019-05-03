fetch('https://api.myjson.com/bins/udbm5')
    .then(res => res.json())
    .then(data => {
        let books = data.books;
        books.forEach(function (each) {
            if (books.indexOf(each) === 0) {
                each.carousel_class = 'carousel-item active'
            } else {
                each.carousel_class = 'carousel-item'
            }
        });
        createCard(books);
        createCarousel(books);
    })
    .catch(err => console.log(err))


function createCard(books) {
    let bookcards = document.getElementById('bookcards')
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

        bookcards.appendChild(card);
    })
}

function createCarousel(books) {
    let carousel = document.getElementById('carousel-inner');
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
    })

}

let search = document.getElementById('search')

search.addEventListener('keyup', filteredBooks)

function filteredBooks() {
    let str = document.getElementById('search').value.toLowerCase();
    let allCards = document.getElementsByClassName('card');
    for (i = 0; i < allCards.length; i++) {
        let paras = allCards[i].getElementsByTagName('p');
        let longText = '';
        for (p = 0; p < paras.length; p++) {
            longText = longText + ' ' + paras[p].innerHTML;
        };
        if (longText.toLowerCase().match(str)) {
            allCards[i].setAttribute('class', 'card border-0')
        } else {
            allCards[i].setAttribute('class', 'card border-0 d-none')
        }
    };

    let bookcards = document.getElementById('bookcards')
    let notResult = bookcards.getElementsByClassName('d-none');

    let footer = document.getElementById('footer');
    if (notResult.length === allCards.length) {
        footer.setAttribute('class', 'container-fluid bg-light')
    } else {
        footer.setAttribute('class', 'd-none')

    }
}
