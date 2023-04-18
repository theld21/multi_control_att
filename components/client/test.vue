<template>
  <div class="bg-gray-100">
    <button @click="findDevices()">Quét thiết bị</button>
    <ul id="devices"></ul>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data: () => {
    return {
      devices: []
    }
  },
  methods: {
    async findDevices() {
      await this.$store.dispatch('client/device/findAvailableDevices')
    }
  }
}
</script>
