import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pokeById } from "../../redux/actions";
import * as imgTypes from "../utils/ExportTypesImage"
import styles from "../card/Cards.module.css"

const Card = ({ poke }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        console.log('me ejecute');
        e.preventDefault();
        dispatch(pokeById(poke.id, poke.isFromAPI));
        navigate("/detail");
    };

    return (
        <>


            <div onClick={(e) => handleClick(e)} className={styles.contain}>

                <h1>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h1>
                <div >
                    <img src={poke.image} width="200px" />
                </div>
                <div >
                    {poke.types &&
                        Array.isArray(poke.types) &&
                        poke.types.map((type, index) => (
                            <div key={index} className={styles.typesInLine}>
                                <img
                                    width="30px"
                                    src={imgTypes[`${type}`]}
                                />
                                <h2 key={index}>
                                    {type && type.charAt(0).toUpperCase() + type.slice(1)}
                                </h2>
                            </div>
                        ))}
                </div>

            </div>
        </>
    )
}
export default Card