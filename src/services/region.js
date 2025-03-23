import axios from "axios";

export const District = (params) => {
    return axios.get(`https://azriantidaktengil.github.io/api-wilayah-indonesia/api/districts/${params.city_id}.json`)
}

export const Province = () => {
    return axios.get('https://azriantidaktengil.github.io/api-wilayah-indonesia/api/provinces.json')
}

export const City = (params) => {
    return axios.get(`https://azriantidaktengil.github.io/api-wilayah-indonesia/api/regencies/${params.province_id}.json`)
}