<template>
  <div class="navbar">
    <!-- <div class="h-19 p-2">
      <span class="font-semibold">Multi Control ATT</span>
    </div>

    <hr /> -->

    <div class="scroll-bar navbar-scroll">
      <ul>
        <li
          v-for="device in sortedDevices"
          :key="device.ip"
          class="mt-0.5 w-full disable-select-text p-2"
        >
          <div
            class="mx-2 flex whitespace-nowrap rounded-lg font-semibold text-slate-700"
          >
            <input :id="device.ip" type="checkbox" class="mr-1" />
            <label
              v-if="device.data.name"
              :for="device.ip"
              class="ml-1 cursor-pointer font-bold"
            >
              {{ device.data.name }}
              <span class="font-light text-sm"> _ {{ device.lastIp }} </span>
            </label>
            <label v-else :for="device.ip" class="ml-1 cursor-pointer">
              {{ device.ip }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ClientNavbar',
  data() {
    return {
      sortedDevices: []
    }
  },
  computed: {
    ...mapState({
      devices: (state) => state.client.device.devices
    })
  },
  watch: {
    devices: {
      deep: true,
      handler: function (newVal) {
        this.sortedDevices = JSON.parse(JSON.stringify(this.devices)).sort(
          (a, b) => a.lastIp - b.lastIp
        )
      }
    }
  }
}
</script>
