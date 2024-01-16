import { Link } from "react-router-dom"
import React, { useEffect } from 'react'
import styles from './Search.module.css'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allPoke, filterOrigin, filterTypes, getTypes, orderAlf, orderAtt, searchPoke } from "../../redux/actions";
const filterStyle = {
    position: 'absolute',
    top: 15,
    left: 15,
    color: 'white',
    backgroundColor: ' #5534db',
    opacity: 0.8,
    margin: '1px',
    padding: '30px 50px',
    border: '1px solid #3a4447',
    borderRadius: 35,
}
const SearchBar = ({ setCurrentPage, pokemons }) => {

    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);
    const [name, setName] = useState('');
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (pokemons === 0) {
            dispatch(allPoke());
            dispatch(getTypes());
        }
    }, [true]);

    const handleChange = (event) => {

        setName(event.target.value);
    };

    const handleButtonSubmit = () => {
        //e.preventDefault(e);
        dispatch(searchPoke(name));
        setName('');
        setTimeout(() => setCurrentPage(1), 2000);
    }

    const handleClick = (e) => {
        //refresco largando nuevamente una petición al back.
        e.preventDefault();
        dispatch(allPoke(e.target.value));
        setCurrentPage(1);
    };
    const handleOrderAlf = (e) => {
        e.preventDefault();
        dispatch(orderAlf(e.target.value));
        setCurrentPage(1);
        setRender(!render);
        // setOrden(`Ordenado ${e.target.value}`);
    };

    const handleOrderAtt = (e) => {
        e.preventDefault();
        dispatch(orderAtt(e.target.value));
        setCurrentPage(1);
        setRender(!render);
        // setOrden(`Ordenado ${e.target.value}`);
    };

    const handleFilterOrigin = (e) => {
        e.preventDefault();
        dispatch(filterOrigin(e.target.value));
        setCurrentPage(1);
    };

    const handleFilterType = (e) => {
        e.preventDefault();
        dispatch(filterTypes(e.target.value));
        setCurrentPage(1);
    };
    return (
        <div >
            <div className={styles.contain}>

                <input type="search" value={name} placeholder="Search by name..." onChange={handleChange} />
                <Link>
                    <button className={styles.specialButton} onClick={handleButtonSubmit}>🔍</button>
                </Link>

                <button onClick={handleClick}> REFRESH </button>

                <hr />
                <Link to="/form">
                    <button>CREATE POKEMON</button>
                </Link>
                <Link to="/">
                    <button> LEAVE </button>
                </Link>
            </div>
            <div style={filterStyle}>
                <h2>FILTER🔍</h2>
                <hr />
                <h3>ORIGIN</h3>
                <select
                    className={styles.select}
                    name="filterOrigin"
                    id="filterOrigin"
                    onChange={(e) => handleFilterOrigin(e)}
                    defaultValue="all"
                >
                    <option value="all">All</option>
                    <option value="A">API</option>
                    <option value="DB">DATABASE</option>
                </select>
                <h3>TYPES</h3>
                <select
                    className={styles.select}
                    name="filterType"
                    id="filterType"
                    defaultValue="all"
                    onChange={(e) => handleFilterType(e)}
                >
                    <option value="all">All</option>
                    {allTypes?.map((t, i) => {
                        return (
                            <option value={t.name} key={i}>
                                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                            </option>
                        );
                    })}
                </select>
                <h3>DAMAGE</h3>
                <select
                    className={styles.select}
                    name="orderAtt"
                    id="orderAtt"
                    defaultValue="default"
                    onChange={(e) => handleOrderAtt(e)}
                >
                    <option value="default">Attack</option>
                    <option value="A">Min to Max</option>
                    <option value="D">Max to Min</option>
                </select>

                <h3>ORDER</h3>
                <select
                    className={styles.select}
                    name="orderAlf"
                    id="orderAlf"
                    defaultValue="default"
                    onChange={(e) => handleOrderAlf(e)}
                >
                    <option value="default">Alphabetically</option>
                    <option value="A">Ascendent</option>
                    <option value="D">Descendent</option>
                </select>
            </div>




        </div>
    )
}
export default SearchBar