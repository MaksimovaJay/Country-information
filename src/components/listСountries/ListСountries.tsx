import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Country } from '../../types';
import {COUNTRY_LIST_URL} from "../../constants";

interface Props {
  onCountrySelect: (alpha3Code: string) => void;
}

const ListCountries: React.FC<Props> = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountryData = useCallback(async () => {
    const response = await axios.get<Country[]>(COUNTRY_LIST_URL);
    setCountries(response.data);
  }, []);

  useEffect(() => {
    void fetchCountryData().catch(console.error);
  }, [fetchCountryData]);

  const handleCountryClick = (alpha3Code: string) => {
    onCountrySelect(alpha3Code);
  };

  const countryNameList = countries.map((country) => (
    <li className="countyListItem  list-group-item " key={country.alpha3Code} onClick={() => handleCountryClick(country.alpha3Code)}>
      <a className="text-white rounded text-decoration-none">
        {country.name}
      </a>
    </li>
  ));

  return (
    <div>
      <h2>Country List</h2>
      <ul className="list-group list-unstyled mr-5">
        {countryNameList}
      </ul>
    </div>
  );
};

export default ListCountries;
