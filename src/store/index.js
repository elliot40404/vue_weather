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
    img: 'sun.png',
    time: ''
  },
  mutations: {
    refresh(state, data) {
      state.Location = data.name
      state.Temp = data.main.temp
      state.Condition = data.weather[0].main
      state.Min = data.main.temp_min
      state.Max = data.main.temp_min
      state.Humidity = data.main.humidity
      const img = state.time + data.weather[0].main.toLowerCase() + '.png'
      state.img = img
      // TODO: use the ids from the json response to set the image
    },
    time(time) {
      state.time = time
    }
  },
  actions: {
    // TODO: change the api endpoint to get better results
    async refresh({commit}) {
      const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=5d9088bf2c35e2f94140c53d6c80fb43&units=metric`, {
        "method": 'POST'
      });
      const res = await req.json()
      commit('refresh', res)
      console.log(res);
    },
    time({commit},time) {
      commit('time', time)
    }
  },
  modules: {
  }
})
