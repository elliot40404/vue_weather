import { createStore } from 'vuex';

export default createStore({
  state: {
    Location: 'Kolkata',
    Temp: 36,
    Unit: '°C',
    Condition: 'Sunny',
    Min: 30,
    Max: 40,
    Humidity: 30,
    Feels: 35,
    img: 'sun.png'
  },
  mutations: {
    refresh(state, data) {
      state.Location = data.name
      state.Temp = data.main.temp
      state.Condition = data.weather[0].main
      state.Min = data.main.temp_min
      state.Max = data.main.temp_min
      state.Humidity = data.main.humidity
    }
  },
  actions: {
    async refresh({commit}) {
      const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=5d9088bf2c35e2f94140c53d6c80fb43&units=metric`, {
        "method": 'POST'
      });
      const res = await req.json()
      commit('refresh', res)
      console.log(res);
    }
  },
  modules: {
  }
})
