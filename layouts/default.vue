<template>
  <div
    class="m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50"
  >
    <div class="flex min-h-screen">
      <div class="bg-red-400 w-1/3 min-w-[350px]">
        <ClientNavbar />
      </div>
      <div class="bg-blue-400 w-full">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import ClientNavbar from '@/components/client/layouts/navbar.vue'

export default {
  name: 'DefaultLayout',
  components: { ClientNavbar },
  data: () => {
    return {
      devices: []
    }
  },
  async mounted() {
    await this.$store.dispatch('client/device/findAvailableDevices')
  },
  methods: {}
}
</script>
