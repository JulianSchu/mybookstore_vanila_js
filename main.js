let vm = new Vue({
    el: '#books',
    data: {
        books: [],
        search: ''
    },
    methods: {
        fetchData() {
            fetch('https://api.myjson.com/bins/udbm5')
                .then(res => res.json())
                .then(data => {
                    this.books = data.books;
                    console.log(this.books)

                })
                .catch(err => console.log(err))
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
