export const ALL_POKE = "ALL_POKE"
export const ID_POKE = "ID_POKE"
export const RESET_DETAIL = "RESET_DETAIL"
export const GET_NAME = "GET_NAME"
export const ORDER_ALF = "ORDER_ALF"
export const ORDER_ATTACK = "ORDER_ATTACK"
export const GET_TYPES = "GET_TYPES"
export const FILTER_TYPES = "FILTER_TYPES"
export const FILTER_ORIGIN = "FILTER_ORIGIN"
export const POKE_CREATE = "POKE_CREATE"
export const ALL_POKE_ERROR = "ALL_POKE_ERROR"
export const ID_POKE_ERROR = "ID_POKE_ERROR"
export const GET_NAME_ERROR = "GET_NAME_ERROR"
export const ORDER_ALF_ERROR = "ORDER_ALF_ERROR"
export const ORDER_ATTACK_ERROR = "ORDER_ATTACK_ERROR"
export const GET_TYPES_ERROR = "GET_TYPES_ERROR"
export const POKE_CREATE_ERROR = "POKE_CREATE_ERROR"
import axios from "axios";

const API_URL = "http://localhost:3001/pokemons";

export const allPoke = (character) => async (dispatch) => {
    try {
        const { data } = await axios.get(API_URL, character);
        dispatch({
            type: "ALL_POKE",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_POKE_ERROR",
            payload: error.message,
        });
    }
};

export const pokeById = (id, isFromAPI) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}?isFromAPI=${isFromAPI}`);
        dispatch({
            type: "ID_POKE",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "ID_POKE_ERROR",
            payload: error.message,
        });
    }
};

export const resetDetail = () => {
    return {
        type: "RESET_DETAIL",
    };
};

export const searchPoke = (name) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/name?name=${name}`);
        dispatch({
            type: "GET_NAME",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "GET_NAME_ERROR",
            payload: error.message,
        });
    }
};

export const orderAlf = (orden) => {
    return {
        type: "ORDER_ALF",
        payload: orden,
    };
};

export const orderAtt = (orden) => {
    return {
        type: "ORDER_ATTACK",
        payload: orden,
    };
};

export const getTypes = () => async (dispatch) => {
    try {
        let types = await axios.get(`${API_URL}/types`);
        dispatch({
            type: "GET_TYPES",
            payload: types.data,
        });
    } catch (error) {
        dispatch({
            type: "GET_TYPES_ERROR",
            payload: error.message,
        });
    }
};

export const filterOrigin = (origin) => {
    return {
        type: "FILTER_ORIGIN",
        payload: origin,
    };
};

export const filterTypes = (types) => {
    return {
        type: "FILTER_TYPES",
        payload: types,
    };
};

export const pokeCreate = (payload) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/pokemons`, payload);
        dispatch({
            type: "POKE_CREATE",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "POKE_CREATE_ERROR",
            payload: error.message,
        });
    }
};