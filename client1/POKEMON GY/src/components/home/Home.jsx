import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../home/HomeStyle.module.css"

import SearchBar from "../searchBar/SearchBar";
import Card from "../card/Card";
import Page from "../pagination/Page";
import { allPoke, getTypes } from "../../redux/actions";




const Home = () => {

    // const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.allPokemons);
    const allTypes = useSelector((state) => state.types);

    /*Paginado*/
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePerPage, setPokePerPage] = useState(12);
    //  const [render, setRender] = useState(false);
    const indexLastPoke = currentPage * pokePerPage; // 12 -> seria el indice del 13 poke
    const indexFirstPoke = indexLastPoke - pokePerPage; // 12 - 12 = 0 -> me da el indice del primer poke.
    const currentPokes = pokemons.slice(indexFirstPoke, indexLastPoke);

    //  useEffect(() => {
    //    if (pokemons.length === 0) {
    //      dispatch(allPoke());
    //  dispatch(getTypes());
    //    }
    // }, [render]);

    const page = (pageNum) => {
        setCurrentPage(pageNum); //seteo el estado, y esto hace que cambie el valor del resto de mis constantes del paginado.
    };


    return (
        <div>
            <SearchBar setCurrentPage={setCurrentPage} pokemons={pokemons.length} />

            <Page setCurrentPage={setCurrentPage}
                pokePerPage={pokePerPage}
                pokemons={pokemons.length}
                page={page}
                current={currentPage} />
            <div className={styles.cards}>

                {pokemons.length > 0 ? (
                    currentPokes.map((poke) => <Card key={poke.id} poke={poke} />)
                ) : (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                )}

            </div>

            <Page setCurrentPage={setCurrentPage}
                pokePerPage={pokePerPage}
                pokemons={pokemons.length}
                page={page}
                current={currentPage} />
        </div>
    )
}
export default Home;