import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Country, CountryInfoResponse} from "../../types";
import CountryInfo from "../CountryInfo/CountryInfo";
import './CountriesList.css';

const CountriesList = () => {


    const url = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
    const [countryList, setCountryList] = useState<CountryInfoResponse[]>([]);

    const fetchData = useCallback(async () => {
        const postsResponse = await axios.get<Country[]>(url);
        const promises = postsResponse.data.map(async item => {
            const countryUrl = 'https://restcountries.com/v2/alpha/' + item.alpha3Code + '?fields=name,region,population,flag,borders';
            const userResponse = await axios.get<CountryInfoResponse>(countryUrl);
            return {
                name: userResponse.data.name,
                region: userResponse.data.region,
                population: userResponse.data.population,
                flag: userResponse.data.flag,
                borders: userResponse.data.borders,
            };
        });
        const newCountryList = await Promise.all(promises);
        setCountryList(newCountryList);
    }, []);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);

    const [countryData, setCountryData] = useState<CountryInfoResponse>({
        name: '',
        region: '',
        population: '',
        flag: '',
        borders: [],
    })

    const countryClick = (item: CountryInfoResponse) => {
        setCountryData(item);
    }


    return (
            <div className='GridContainer'>
                <>
                    <ul className='countryList'>
                        {countryList.map(item => (
                            <li className='list' key={Math.random()} onClick={() => countryClick(item)}>
                                {item.name}
                            </li>))}
                    </ul>
                </>
                <>
                    <CountryInfo country={countryData}/>
                </>
            </div>
    );
};

export default CountriesList;