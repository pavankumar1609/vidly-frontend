import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getGenres } from "./../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";
import Input from "../common/Input";
import Select from "../common/Select";
import Loading from "../common/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  _id: yup.string(),
  title: yup.string().min(5).max(50).trim().required().label("Title"),
  genreId: yup.string().required().label("Genre"),
  numberInStock: yup
    .number()
    .typeError("Stock must be a number type")
    .integer()
    .min(0)
    .max(250)
    .required()
    .label("Stock"),
  dailyRentalRate: yup
    .number()
    .typeError("Rating must be a number type")
    .min(0)
    .max(250)
    .required()
    .label("Rating"),
});

function MovieForm() {
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const formOptions = {
    mode: "onChange",
    resolver: yupResolver(schema),
  };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    const getData = async () => {
      const { data } = await getGenres();
      setGenres(data);

      try {
        if (movieId === "new") return;
        const { data: movie } = await getMovie(movieId);
        setMovie(mapToViewModel(movie));
        setLoading(true);
      } catch (error) {
        if (error.response && error.response.status === 404)
          navigate("/not-found", { replace: true });
      }
    };

    getData();
  }, [movieId, navigate]);

  useEffect(() => {
    reset(movie);
  }, [movie, reset]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const onSubmit = async (data) => {
    await saveMovie(data);
    navigate("/movies");
  };

  if (!loading && movieId !== "new") return <Loading />;

  return (
    <React.Fragment>
      <h1>MovieForm</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          name="title"
          label="Title"
          register={register}
          error={errors.title?.message}
        />
        <Select
          name="genreId"
          label="Genre"
          genres={genres}
          register={register}
          error={errors.genreId?.message}
        />
        <Input
          name="numberInStock"
          label="Stock"
          type="number"
          register={register}
          error={errors.numberInStock?.message}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          register={register}
          error={errors.dailyRentalRate?.message}
        />
        <button className="btn btn-primary btn-sm mt-3">Save</button>
      </form>
    </React.Fragment>
  );
}

export default MovieForm;
