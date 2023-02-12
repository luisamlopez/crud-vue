const app = new Vue({
  el: "#app",
  data: {
    //Arreglo de peliculas
    movies: [],
    //Datos de peliculas
    newMovie: "",
    newRating: "",
    newDate: "",
    newComment: "",
    //Variable para saber si estoy editando las peliculas
    isEditing: false,
    //Datos para la edicion de peliculas
    newMovieEdited: "",
    newRatingEdited: "",
    newDateEdited: "",
    newCommentEdited: "",
  },
  methods: {
    //Metodo para agregar peliculas (Create)
    addMovie() {
      this.movies.push({
        name: this.newMovie,
        rating: this.newRating,
        date: this.newDate,
        comment: this.newComment,
      });
      //Añado las peliculas al localStorage para preservar la información
      localStorage.setItem("movies-local", JSON.stringify(this.movies));
      console.log(this.movies);
      //Limpio los campos del formulario
      this.newMovie = "";
      this.newRating = "";
      this.newDate = "";
      this.newComment = "";
      //Coloco la variable isEditing en false para que no se muestre el formulario de edicion
      //ya que la acabo de agregar
      this.isEditing = false;
    },
    //Metodo para eliminar peliculas (Delete)
    deleteMovie(index) {
      this.movies.splice(index, 1);
      //Actualizo el localStorage
      localStorage.setItem("movies-local", JSON.stringify(this.movies));
    },
    //Metodo para editar peliculas (Update)
    updateMovie(index) {
      //Coloco la variable isEditing en true para que se muestre el formulario de edicion
      this.isEditing = true;
      //Coloco los datos de la pelicula en los campos del formulario de edición para que
      //no se confundan con los campos del formulario de nueva pelicula
      this.newMovieEdited = this.movies[index].name;
      this.newRatingEdited = this.movies[index].rating;
      this.newDateEdited = this.movies[index].date;
      this.newCommentEdited = this.movies[index].comment;
    },
    //Metodo para guardar los cambios de la pelicula editada, solo aparece en modo edicion el boton de guardar  (Update)
    saveMovie(index) {
      //Actualizo los datos de la pelicula
      this.movies[index].name = this.newMovieEdited;
      this.movies[index].rating = this.newRatingEdited;
      this.movies[index].date = this.newDateEdited;
      this.movies[index].comment = this.newCommentEdited;
      //Actualizo el localStorage y coloco que ya no esoty editando
      this.isEditing = false;
      localStorage.setItem("movies-local", JSON.stringify(this.movies));
    },
  },
  //Al cargar la pagina, si hay datos en el localStorage los cargo en el arreglo de peliculas
  created: function () {
    let data = JSON.parse(localStorage.getItem("movies-local"));
    if (data === null) {
      this.movies = [];
    } else {
      this.movies = data;
    }
  },
});
