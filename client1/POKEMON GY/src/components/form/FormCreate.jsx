import { useNavigate } from 'react-router-dom'
import Styles from './Create.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, pokeCreate } from '../../redux/actions'


const styleBoton = {
    margin: '5px',
    position: 'fixed',
    bottom: '10px',
    left: '43%',
    padding: '30px 60px',
    fontSize: '25px',
}
const validation = (input, pokemons) => {
    let errors = {};

    if (!input.name || !/^[ a-zA-Z ]+$/.test(input.name))
        errors.name = "Ingrese un nombre que contenga solo letras.";
    if (input.name.length < 2 && input.name.length > 16)
        errors.name = "El nombre debe tener entre 2 y 15 caracteres.";
    if (pokemons.some((e) => e.name === input.name))
        errors.name = "El nombre ingresado ya existe.";
    if (input.hp < 1 || input.hp > 350) errors.hp = "El valor HP máximo es 350";
    if (input.attack < 1 || input.attack > 500) errors.attack = "El valor Attack máximo es 500";
    if (input.defense < 1 || input.defense > 500) errors.defense = "El valor Defense máximo es 500";
    if (input.height <= 0 || input.height > 1000)
        errors.height = "La altura mínima es 1 y máxima es 1000";
    if (input.weight <= 0 || input.weight > 700)
        errors.weight = "El peso mínimo es 1 y máximo es 700";
    if (!input.types || input.types.length === 0) errors.types = "Ingrese obligatoriamente hasta 2 tipos.";

    return errors;
};
const habilitedButton = (b) => {
    if (Object.keys(b).length === 0) return false;
    return true;
};
const FormCreate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pokemons = useSelector((state) => state.allPokemonsCopy);
    const allTypes = useSelector((state) => state.types);
    const [input, setInput] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    })
    const [errors, setErrors] = useState({
        name: "Required Name",
        image: "",
        hp: "Required HP",
        attack: "Required Attack",
        defense: "Required Defense",
        speed: "",
        height: "",
        weight: "",
        types: "Required Types",
    });
    const [button, setButton] = useState(true);
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);
    useEffect(() => {
        setButton(habilitedButton(errors));
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(pokeCreate(input));
        alert("Pokémon create! 👌");
        setInput({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types: [],
        });
        navigate("/home");
    }
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validation(
                {
                    ...input,
                    [e.target.name]: e.target.value,
                },
                pokemons
            )
        );
    };
    const handleSelect = (e) => {
        const type = e.target.value;
        const newTypes = input.types;
        newTypes.push(type);
        setInput({ ...input, types: newTypes });
        setErrors(
            validation(
                {
                    ...input,
                    types: newTypes,
                },
                pokemons //le envio el estado a validation por props
            )
        );
    };
    const handleDelete = (type) => {
        input.types.length === 0 ? setButton(false) : setButton(true);
        setInput({
            ...input,
            types: input.types.filter((t) => t !== type),
        });
        setErrors(
            validation(
                {
                    ...input,
                    types: input.types.filter((t) => t !== type),
                },
                pokemons
            )
        );
    };
    return (
        <div className={Styles.contain}>
            <h2>CREATE A NEW POKEMON!!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <div className={Styles.inputDiv}>
                        <h3>NAME 🆔</h3>
                        <input type="text" value={input.name} name='name' placeholder="POKEMON NAME" onChange={(e) => handleChange(e)} />
                        {errors.name && (<p>{errors.name}</p>)}
                    </div>
                    <div className={Styles.inputDiv}>
                        <h3>IMAGE 📷</h3>
                        <input type="text" value={input.image} name='image' placeholder="URL IMAGE" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className={Styles.inputDiv}>
                        <h3>ATTACK ⚔️</h3>
                        <input type="number" value={input.attack} name='attack' placeholder="POKEMON DAMAGE" onChange={(e) => handleChange(e)} />
                        {errors.attack && (<p>{errors.attack}</p>)}
                    </div>
                </div>
                <div>
                    <div className={Styles.inputDiv}>
                        <h3>HP ❤️</h3>
                        <input type="number" value={input.hp} name='hp' placeholder="POKEMON HP" onChange={(e) => handleChange(e)} />
                        {errors.hp && <p>{errors.hp}</p>}
                    </div>
                    <div className={Styles.inputDiv}>
                        <h3>DEFENSE 🛡️</h3>
                        <input type="number" value={input.defense} name='defense' placeholder="POKEMON DEFENSE" onChange={(e) => handleChange(e)} />
                        {errors.defense && (<p>{errors.defense}</p>)}
                    </div>
                    <div className={Styles.inputDiv}>
                        <h3>SPEED ⚡</h3>
                        <input type="number" value={input.speed} name='speed' placeholder="POKEMON SPEED" onChange={(e) => handleChange(e)} />
                    </div>


                </div>

                <div>
                    <div className={Styles.inputDiv}>
                        <h3>WEIGHT ⚖️</h3>
                        <input type="number" value={input.weight} name='weight' placeholder="POKEMON WEIGHT" onChange={(e) => handleChange(e)} />
                        {errors.weight && (<p>{errors.weight}</p>)}
                    </div>
                    <div className={Styles.inputDiv}>
                        <h3>HEIGHT 📏</h3>
                        <input type="number" value={input.height} name='height' placeholder="POKEMON HEIGHT" onChange={(e) => handleChange(e)} />
                        {errors.height && (<p>{errors.height}</p>)}
                    </div>
                    <div className={Styles.inputDiv} >
                        <h3>TYPE🔥 💧💨🌍</h3>
                        <div>

                            <select
                                name="filterType"
                                id="filterType"
                                onChange={(e) => handleSelect(e)}
                                defaultValue="select"
                                disabled={input.types.length === 2}
                            >
                                <option value="select" disabled>
                                    Select Type
                                </option>
                                {allTypes?.map((t, i) => {
                                    return (
                                        <option value={t.name} key={i}>
                                            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                                        </option>
                                    );
                                })}
                            </select>
                            <div>
                                {input.types.map((type, index) => (
                                    <div key={index}>
                                        <img
                                            width="30px"
                                            src={imgTypes[`${type}`]}
                                        />
                                        <h3 key={index}>
                                            {type && type.charAt(0).toUpperCase() + type.slice(1)}
                                        </h3>
                                        <span
                                            key={index}
                                            onClick={() => handleDelete(type)}
                                        >
                                            ✖️
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {input.types.length === 0 && (
                            <p>{errors.types}</p>
                        )}



                    </div>

                </div>
                {!input.name || !input.hp || !input.attack || !input.defense ? null : (<button style={styleBoton} type='submit'>CREATE</button>)}
            </form>




        </div>
    )
}
export default FormCreate