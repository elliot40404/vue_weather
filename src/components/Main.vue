<template>
  <div :class="[day ? 'bgd' : 'bgn', 'con']">
    <div class="top">
      <header>
        <h1>{{ $store.state.Location }}</h1>
        <div @click="$store.dispatch('unitC')" class="unit">{{ $store.state.Unit }}</div>
        <div class="material-icons" @click="$store.dispatch('refresh')">
          cached
        </div>
      </header>
      <div class="img">
        <img id="icon" :src="imgsrc" alt="weather icon" />
      </div>
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
            }}{{ $store.state.Unit }}<span class="material-icons"> arrow_upward </span>
          </h6>
        </div>
        <div class="min">
          <h6>
            {{ $store.state.Min
            }}{{ $store.state.Unit }}<span class="material-icons"> arrow_downward </span>
          </h6>
        </div>
      </div>
      <div class="feels">
        <h5>Feels like {{$store.state.Feels}}{{ $store.state.Unit }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      day: true,
    };
  },
  computed: {
    imgsrc() {
      return require(`../assets/${this.$store.state.img}`);
    },
  },
  methods: {
    autoUpdate() {
      setInterval(() => {
        this.$store.dispatch("refresh");
      }, 1000 * 60 * 30);
    },
    timeWatch() {
      const time = new Date();
      if (time.getHours() >= 17 || time.getHours() < 4) {
        this.$store.dispatch("time", "n");
        this.day = false;
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
.unit {
  background: rgb(255, 255, 255);
  color: #ffb703;
  width: 50px;
  padding: 2px;
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}
.bgd {
  background: linear-gradient(180deg, #0076b1 35.42%, #000000 100%);
}
.bgn {
  background: linear-gradient(180deg, #04202e 48.44%, #01679a 100%);
}
.img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.img img {
  width: 200px;
  margin: 0px 0px 4em;
}
.con {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
}
.top {
  flex: 1;
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
  padding: 1em 1.5em 0;
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
h6, .feels h5 {
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
</style>
