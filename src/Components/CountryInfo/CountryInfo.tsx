import React, {useEffect, useState} from 'react';
import {Flag, CountryInfoResponse} from "../../types";
import './CountryInfo.css';
import axios from 'axios';


interface Props {
    country: CountryInfoResponse,
}

const CountryInfo: React.FC<Props> = ({country}) => {

    const [border, setBorder] = useState<Flag[]>( []);

    const borderData = async () => {
        const promises = country.borders.map(async item => {
            const countryUrl = 'https://restcountries.com/v2/alpha/' + item + '?fields=flag';
            const userResponse = await axios.get<Flag>(countryUrl);
            return {
          flag: userResponse.data.flag
            };
        });
        const newBorderList = await Promise.all(promises);
        setBorder(newBorderList);
    }


        useEffect(() => {
            borderData().catch(console.error);
        }, [ country]);


        if (country.name.length > 0) {
            if (country.borders.length > 0) {
                return (
                    <div>
                        <img className='flag' src={country.flag} alt='flag'/>
                        <h1 className='countryName'>{country.name}</h1>
                        <div> Borders : {border.map(item => <img key={Math.random()} className='borderImg' src={item.flag} alt={item.flag}/>)}</div>
                        <p> Population: {country.population}</p>
                        <p> Region : {country.region}</p>
                    </div>
                )
            } else {
                return (
                    <div>
                        <img className='flag' src={country.flag} alt='flag'/>
                        <h1 className='countryName'>{country.name}</h1>
                        <p> Borders : No bordered countries </p>
                        <p> Population: {country.population}</p>
                        <p> Region : {country.region}</p>
                    </div>
                )
            }

        } else {
            return (<div><h1> Information empty please choice any country</h1></div>)
        }
};

export default CountryInfo;