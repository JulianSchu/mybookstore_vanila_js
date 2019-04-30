let vm = new Vue({
    el: '#books',
    data: {
        books: [],
        search: '',
        footer: false
    },
    methods: {
        fetchData() {
            fetch('https://api.myjson.com/bins/udbm5')
                .then(res => res.json())
                .then(data => {
                let books = data.books;
                books.forEach(function(each){
                    if (books.indexOf(each) === 0) {
                        each.carousel_class = 'carousel-item active'
                    } else {
                        each.carousel_class = 'carousel-item'
                    }
                })
                    this.books = books;
                    console.log(this.books)

                })
                .catch(err => console.log(err))
        },
        nullResult(){
            let result = this.filteredBooks;
            if (result.length === 0) {
                this.footer = true;
            } else {
                this.footer = false;
            }
        }
    },
    computed: {
        filteredBooks: function () {
            let str = this.search;
            return this.books.filter(function (book) {
                if (book.titulo.match(str) || book.descripcion.match(str) || book.idioma.match(str)) return true;
            })
        }
    },
    mounted() {
        this.fetchData();
    }
})
