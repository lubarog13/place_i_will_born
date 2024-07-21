import {defineStore} from "pinia";
import countries from '~/assets/data/geo/iso_codes.json'

interface Country {
    id: number,
    alpha2: string,
    alpha3: string,
    name: string
}

export const useCountriesStore = defineStore('countries', {
    state: ()=> {
        return {
            countriesList: [] as Array<Country>,
            selectedCountry: null as Country|null,
        }
    },
    actions: {
        setCountriesList() {
            this.countriesList = countries;
        },
        generateRandomCountry() {
            let randomIndex = Math.round (Math.random() *(this.countriesList.length - 1));
            this.selectedCountry = this.countriesList[randomIndex];
        }
    }
})