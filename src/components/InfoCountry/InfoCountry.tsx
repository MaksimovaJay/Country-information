import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {InfoCountry} from '../../types';
import {COUNTRY_BY_ALPHA_URL} from "../../constants";

interface Props {
  selectedCountry: string | null;
}

const InfoCountry: React.FC<Props> = ({selectedCountry}) => {
  const [countryInfo, setCountryInfo] = useState<InfoCountry | null>(null);

  useEffect(() => {
    if (selectedCountry !== null) {
      const fetchCountryInfoData = async () => {

        const response = await axios.get<InfoCountry>(COUNTRY_BY_ALPHA_URL + `/${selectedCountry}`);
        let promises: Promise<string>[] = [];

        if (response.data.borders !== undefined) {
          promises = response.data.borders.map(async border => {
            const infoResponse = await axios.get<InfoCountry>(COUNTRY_BY_ALPHA_URL + `/${border}`);
            return infoResponse.data.name;
          });

          const newCountryInfo = {
            ...response.data,
            borders: await Promise.all(promises)
          };

          setCountryInfo(newCountryInfo);
        }
      };
      void fetchCountryInfoData().catch(console.error);
    }
  }, [selectedCountry]);

  const borderCountryName = countryInfo && countryInfo.borders ? countryInfo.borders.map((border) => (
    <li key={border}>{border}</li>
  )) : null;

  return (
    <div>
      <h2>Country Info</h2>
      {countryInfo && (
        <div>
          <h3>{countryInfo.name}</h3>
          <p><strong>Capital:</strong> {countryInfo.capital}</p>
          <p><strong>Population:</strong> {countryInfo.population} M</p>
          <h4>Borders:</h4>
          <ul className="list-unstyled">
            {borderCountryName}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoCountry;
