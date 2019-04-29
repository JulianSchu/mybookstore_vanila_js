let vm = new Vue({
    el: '#books',
    data: {
        books: []
    },
    methods: {
        fetchData() {
            fetch('https://api.myjson.com/bins/udbm5')
            .then (res => res.json())
            .then (data => {
                this.books = data.books;
                console.log(this.books)
                
            })
            .catch(err => console.log(err))
        }
    },
    mounted() {
        this.fetchData();
    }
})

