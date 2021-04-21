import { createStore } from "vuex";

export default createStore({
  state: {
    Location: "Kolkata",
    Temp: 36,
    Unit: "°C",
    Condition: "Sunny",
    Min: 30,
    Max: 40,
    Humidity: 30,
    Feels: 39,
    img: "clear.png",
    time: "",
    TempUnit: 'metric'
  },
  mutations: {
    refresh(state, data) {
      state.Location = data.name;
      state.Temp = data.main.temp;
      state.Condition = data.weather[0].main;
      state.Min = data.main.temp_min + 5;
      state.Max = data.main.temp_min - 4;
      state.Humidity = data.main.humidity;
      state.Feels = data.main.feels_like
      const wid = data.weather[0].id;
      if (wid == 800) {
        state.img = state.time + 'clear' + ".png";
      } else if (wid > 200 && wid < 299) {
        state.img = 'thunder' + ".png";
      } else if (wid > 300 && wid < 399) {
        state.img = 'rain' + ".png";
      } else if (wid > 500 && wid < 599) {
        state.img = 'rain' + ".png";
      } else if (wid > 600 && wid < 699) {
        state.img = 'snow' + ".png";
      } else if (wid > 700 && wid < 799) {
        state.img = state.time + 'haze' + ".png";
      } else if (wid > 800 && wid < 899) {
        state.img = state.time + 'cloudy' + ".png";
      } else {
        return;
      }
    },
    time(state, time) {
      state.time = time;
    },
    unitC(state) {
      if (state.TempUnit === 'metric') {
        state.TempUnit = 'imperial'
        state.Unit = "°F"
      } else {
        state.TempUnit = 'metric'
        state.Unit = "°C"
      }
    }
  },
  actions: {
    // TODO: change the api endpoint to get better results
    async refresh({ commit, getters }) {
      const req = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=5d9088bf2c35e2f94140c53d6c80fb43&units=${getters.unit}`,
        {
          method: "POST",
        }
      );
      const res = await req.json();
      commit("refresh", res);
      console.log(res);
    },
    time({ commit }, time) {
      commit("time", time);
    },
    unitC({commit}) {
      commit('unitC')
      this.dispatch('refresh');
    }
  },
  getters: {
    unit(state) {
      return state.TempUnit
    }
  },
  modules: {},
});
