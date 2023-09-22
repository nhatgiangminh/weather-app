import { defineStore } from "pinia";
import type City from '@/interfaces/City'

import axios from "axios";

export const weatherStore = defineStore('weather', {
  state: () => {
    return {
      listPlace: [] as Object[],
      weatherData: {} as any,
      currentWeatherData: {} as any,
      listSavedCity: [] as any
    }
  },
  getters: {
    getListPlace(state): object[] {
      return state.listPlace
    },
    getWeatherData(state):object {
      return state.listPlace
    },
    getCurrentWeatherData(state):object {
      return state.currentWeatherData
    }
  },
  actions: {
    async fetchListPlace(name: string):Promise<any> {
      try {
        const res = await axios.get('http://api.openweathermap.org/geo/1.0/direct', { params: {
          q: name,
          limit: 5,
          appid: 'ede1ba0cf2f5b7456b4b1e368ccef375'
        } })
        console.log(res)
        this.listPlace = res?.data ?? []
      }
      catch (error) {
        return error
      }
    },
    async fetchWeatherData(lat:number, lon:number):Promise<void> {
      try {
        const res = await axios.get('https://api.openweathermap.org/data/2.5/forecast', { params: {
          // latitude: lat,
          // longitude: lon,
          lat,
          lon,
          // hourly: 'temperature_2m,weathercode'
          appid: 'ede1ba0cf2f5b7456b4b1e368ccef375',
          units: 'metric'
        } })
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', { params: {
          lat,
          lon,
          appid: 'ede1ba0cf2f5b7456b4b1e368ccef375',
          units: 'metric'
        } })
        this.weatherData = res.data
        this.currentWeatherData = response.data

        //fix glitching
        await new Promise((resolve) => setTimeout(resolve, 600))
        
      } catch (error) {
        console.log(error)
      }
    },
    async fetchListCityWeather() {
      if (localStorage.getItem('savedCity')) {
        const savedCity: Array<City> = JSON.parse(localStorage.getItem('savedCity')!)
        const requests: Array<Promise<any>> = []
        try {
          savedCity.forEach((city) => {
            requests.push(axios.get('https://api.openweathermap.org/data/2.5/weather', { params: {
              lat: city.coord.lat,
              lon: city.coord.lon,
              appid: 'ede1ba0cf2f5b7456b4b1e368ccef375',
              units: 'metric'
            } }))
          })
          const weather = await Promise.all(requests)

          this.listSavedCity = []
          weather.forEach((value, index) => {
            this.listSavedCity[index] = value.data
          })
          await new Promise((resolve) => setTimeout(resolve, 600))
        } catch (error) {
          console.log(error)
        }
      } else {
        this.listSavedCity = []
      }
    }
  }
})