<template>
  <div class="con">
    <div class="img">
      <img id="icon" :src="img" alt="weather icon" />
    </div>
    <div class="top">
      <header>
        <h1>{{ $store.state.Location }}</h1>
        <div class="material-icons" @click="$store.dispatch('refresh')">
          cached
        </div>
      </header>
      <div class="temp">
        <h2>{{ $store.state.Temp }}</h2>
        <h3>{{ $store.state.Unit }}</h3>
      </div>
      <div class="condition">
        <h5>{{ $store.state.Condition }}</h5>
        <span>Humidity {{ $store.state.Humidity }}%</span>
      </div>
      <div class="minmax">
        <div class="max">
          <h6>
            {{ $store.state.Max
            }}<span class="material-icons"> arrow_upward </span>
          </h6>
        </div>
        <div class="min">
          <h6>
            {{ $store.state.Min
            }}<span class="material-icons"> arrow_downward </span>
          </h6>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      img: require("../assets/sun.png"),
    };
  },
  methods: {
    autoUpdate() {
      setInterval(() => {
        this.$store.dispatch("refresh");
      }, 1000 * 60 * 30);
    },
    // TODO: use proper logic to implement icons from store use getters
    timeWatch() {
      const time = new Date();
      if (time.getHours() >= 17 || time.getHours() < 4) {
        this.img = require("../assets/moon.png")
      }
      this.timeAutoWatch();
    },
    timeAutoWatch() {
      setInterval(this.timeWatch, 1000 * 60 * 60);
    },
  },
  created() {
    this.$store.dispatch("refresh");
    this.autoUpdate();
    this.timeWatch();
  },
};
</script>

<style scoped>
.img {
  position: absolute;
  width: clamp(400px, 100vw, 800px);
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
}
.img img {
  width: 200px;
  margin: 0px 0px 4em;
}
.con {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #04202e 48.44%, #01679a 100%);
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
}
.top {
  flex: 1;
  /* background: rgb(202, 18, 18); */
}
.top .material-icons {
  color: #ffb703;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 600ms ease;
}
.top .material-icons:hover {
  transform: rotateZ(360deg);
}
.top header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5em;
}
.top header h1 {
  font-family: "Poppins";
  font-weight: 500;
  color: #ffffff;
  font-size: clamp(36px, 2.4rem, 64px);
}
.temp {
  display: flex;
  padding: 5em 1.5em 0;
  align-items: baseline;
}
.temp h2 {
  font-size: 4rem;
  font-weight: 400;
  color: #ffffff;
}
.temp h3 {
  font-size: 3.5rem;
  font-weight: 400;
  color: #ffb703;
}
.condition {
  display: flex;
  align-items: center;
}
.condition span {
  padding: 0.5em 1.5em;
  font-size: 1.3rem;
  font-weight: 500;
  color: #fb8500;
}
.condition h5,
h6 {
  padding: 0.5em 1.5em;
  text-align: left;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fb8500;
}

.minmax,
.minmax h6 {
  display: flex;
  padding-top: 0px;
  position: relative;
}
.minmax span {
  position: absolute;
  right: 2px;
}
.bottom {
  flex: 1;
  /* background: rgb(0, 255, 85); */
}
</style>
