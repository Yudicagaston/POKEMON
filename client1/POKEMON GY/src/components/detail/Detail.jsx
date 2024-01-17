import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { resetDetail } from "../../redux/actions"
import * as imgTypes from "../utils/ExportTypesImage"
import styles from "../detail/Details.module.css"
const Detail = () => {

    const dispatch = useDispatch();
    const poke = useSelector((state) => state.detail);

    useEffect(() => {
        return () => { //una vez desmontado -> despacho resetDetail.
            dispatch(resetDetail());
        };
    }, [dispatch]);

    return (
        <div className={styles.contain}>


            <Link to="/home">
                <button className={styles.buttonHome}>🏡 Home</button>
            </Link>
            <div className={styles.imagePoke}>
                <img src={poke.image} width="400px" />
            </div>
            <div className={styles.detail}>
                <div>
                    <h1>✨{poke.name?.charAt(0).toUpperCase() + poke.name?.slice(1)}✨</h1>

                </div>
                <div>
                    <h2>❤️ HP: {poke.hp}</h2>
                    <h2>⚔️ Attack: {poke.attack}</h2>
                    <h2>🛡️ Defense: {poke.defense}</h2>
                    <h2>⚡Speed: {poke.speed}</h2>
                    <h2>📏 Height: {poke.height}</h2>
                    <h2>⚖️ Weight: {poke.weight}</h2>
                    <h2>Types: </h2>
                    <div >
                        {poke.types &&
                            Array.isArray(poke.types) &&
                            poke.types.map((type, index) => (
                                <div key={index} className={styles.typesInLine}>
                                    <img
                                        width="30px"
                                        className={`${type.toUpperCase()}`}
                                        src={imgTypes[`${type}`]}
                                    />
                                    <h3 key={index}>
                                        {type && type.charAt(0).toUpperCase() + type.slice(1)}
                                    </h3>
                                </div>
                            ))}
                    </div>
                </div>

            </div>



        </div>
    )
}
export default Detail