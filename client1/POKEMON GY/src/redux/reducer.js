import {
    ALL_POKE,
    ID_POKE,
    RESET_DETAIL,
    GET_NAME,
    ORDER_ALF,
    ORDER_ATTACK,
    GET_TYPES,
    FILTER_TYPES,
    FILTER_ORIGIN,
    POKE_CREATE,
    ALL_POKE_ERROR,
    ID_POKE_ERROR,
    GET_NAME_ERROR,
    ORDER_ALF_ERROR,
    ORDER_ATTACK_ERROR,
    GET_TYPES_ERROR,
    POKE_CREATE_ERROR,
} from "./actions";

const initialState = {
    allPokemons: [],
    detail: {},
    allPokemonsCopy: [],
    types: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POKE:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsCopy: action.payload,
                error: null,
            };
        case ALL_POKE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ID_POKE:
            return {
                ...state,
                detail: action.payload,
                error: null,
            };
        case ID_POKE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case RESET_DETAIL:
            return {
                ...state,
                detail: { loading: true },
                error: null,
            };
        case GET_NAME:
            return {
                ...state,
                allPokemons: [action.payload],
                error: null,
            };
        case GET_NAME_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ORDER_ALF:
        case ORDER_ATTACK:
            if (action.payload === "default") {
                return { ...state };
            }

            const sortOrder = action.payload === "A" ? 1 : -1;

            const sortedArray = [...state.allPokemons].sort((a, b) => {
                if (action.type === "ORDER_ALF") {
                    return sortOrder * a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                } else if (action.type === "ORDER_ATTACK") {
                    return sortOrder * (a.attack - b.attack);
                }
                return 0;
            });

            return {
                ...state,
                allPokemons: sortedArray,
            };
        case ORDER_ALF_ERROR:
        case ORDER_ATTACK_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
                error: null,
            };
        case GET_TYPES_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case FILTER_ORIGIN:
            const filterOrigin = action.payload === "A"
                ? state.allPokemons.filter((o) => o.isFromAPI)
                : state.allPokemons.filter((o) => !o.isFromAPI);

            return {
                ...state,
                allPokemons: action.payload === "all" ? state.allPokemonsCopy : [...filterOrigin],
                error: null,
            };
        case FILTER_TYPES:
            const filterType = state.allPokemons.filter((p) => p.types?.includes(action.payload));
            return {
                ...state,
                allPokemons: action.payload === "all" ? state.allPokemonsCopy : [...filterType],
                error: null,
            };
        case POKE_CREATE:
            return {
                ...state,
                allPokemons: [...state.allPokemons, action.payload],
                allPokemonsCopy: [...state.allPokemonsCopy, action.payload],
                error: null,
            };
        case POKE_CREATE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;