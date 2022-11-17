import React, { useState, useEffect } from "react";
import { createVideogame, getGenres, getPlatforms } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateVideogame.module.css";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required";
    }
    if ((input.name && input.name.length < 5) || input.name.length > 50) {
        errors.name = "Invalid name";
    }
    if (!input.rating) {
        errors.rating = "Rating is required";
    }
    if (input.rating > 5 || input.rating < 0) {
        errors.rating = "Invalid Rating";
    }
    if (!input.description) {
        errors.description = "Description is required";
    }
    if (input.description && input.description.length < 20) {
        errors.description = "Invalid Description";
    }
    if (!input.genres) {
        errors.diets = "Genres is required";
    }
    if (!input.price) {
        errors.price = "Price is required";
    }
    if (!input.platforms) {
        errors.platforms = "Platforms is required";
    }
    return errors;
}

export default function CreateVideogame() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const [input, setInput] = useState({
        name: "",
        image: "",
        rating: 0,
        price: 0,
        description: "",
        released: "",
        platforms: [],
        genres: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleSelectGenres(e) {
        if (!input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value],
            });
            setErrors(
                validate({
                    ...input,
                    [e.target.name]: e.target.value,
                })
            );
        } else {
            return alert("Cannot add the same genre twice");
        }
    }

    function handleSelectPlatforms(e) {
        if (!input.platforms.includes(e.target.value)) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value],
            });
            setErrors(
                validate({
                    ...input,
                    [e.target.name]: e.target.value,
                })
            );
        } else {
            return alert("Cannot add the same platform twice");
        }
    }

    function handleDeleteGenres(e) {
        setInput({
            ...input,
            genres: input.genres.filter((el) => el !== e),
        });
    }

    function handleDeletePlatforms(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter((el) => el !== e),
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        setErrors(validate(input));
        let error = validate(input);
        if (Object.values(error).length !== 0) {
            alert("The Videogame is not created");
        } else {
            dispatch(createVideogame(input));
            setInput({
                name: "",
                image: "",
                rating: 0,
                price: 0,
                description: "",
                released: "",
                platforms: [],
                genres: [],
            });
            navigate("/home");
        }
    }

    return (
        <div className={styles.background}>
            <Link to="/home" className={styles.link}>
                Back to view all videogames
            </Link>

            <h1 className={styles.title}>Create your videogame</h1>
            <div className={styles.all}>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Between 5 and 50 letters"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleInputChange(e)}
                            className={styles.select}
                        />
                        <p>{errors?.name}</p>
                    </div>

                    <div>
                        <label>Rating</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            placeholder="Between 0 and 5"
                            value={input.rating}
                            name="rating"
                            onChange={(e) => handleInputChange(e)}
                            className={styles.select}
                        />
                        <p>{errors?.rating}</p>
                    </div>

                    <div>
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="Minimun 20 letters"
                            value={input.description}
                            name="description"
                            onChange={(e) => handleInputChange(e)}
                            className={styles.select}
                        />
                        <p>{errors?.description}</p>
                    </div>

                    <div>
                        <label>Release Date</label>
                        <input
                            type="date"
                            value={input.released}
                            name="released"
                            onChange={(e) => handleInputChange(e)}
                            className={styles.select}
                        />
                    </div>

                    {/* <div>
            <label>Price</label>
            <input
              type="number"
              value={input.price}
              name="price"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <p>{errors?.price}</p> */}

                    <div>
                        <label>Image</label>
                        <input
                            type="url"
                            value={input.image}
                            name="image"
                            onChange={(e) => handleInputChange(e)}
                            className={styles.select}
                        />
                    </div>

                    <div>
                        <label>Choose Platforms</label>
                        <select
                            onChange={(p) => handleSelectPlatforms(p)}
                            className={styles.select}
                        >
                            <option hidden>Platforms</option>
                            {platforms?.map((p) => {
                                return (
                                    <option key={p.id} value={p}>
                                        {p}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.platforms && <p>{errors.platforms}</p>}
                    </div>
                    <div>
                        <label>Choose Genres</label>
                        <select
                            onChange={(e) => handleSelectGenres(e)}
                            className={styles.select}
                        >
                            <option hidden>Genres</option>
                            {genres?.map((e) => {
                                return (
                                    <option key={e.id} value={e}>
                                        {e}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.genres && <p>{errors.genres}</p>}
                    </div>
                    <div>
                        {errors ? null : (
                            <button type="submit" className={styles.select}>
                                Create Videogame
                            </button>
                        )}
                    </div>
                </form>
                <div className={styles.delete}>
                    <div className={styles.deletes}>
                        <label>Platforms</label>
                        {input.platforms.map((e) => (
                            <div key={e.id}>
                                <p>{e}</p>
                                <button
                                    onClick={() => handleDeletePlatforms(e)}
                                    className={styles.select}
                                >
                                    {" "}
                                    x{" "}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.deletes}>
                        <label>Genres</label>
                        {input.genres.map((e) => (
                            <div key={e.id}>
                                <p>{e}</p>
                                <button
                                    onClick={() => handleDeleteGenres(e)}
                                    className={styles.select}
                                >
                                    {" "}
                                    x{" "}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
