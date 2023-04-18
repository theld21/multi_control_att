export default {
  namespaced: true,
  state() {
    return {
      devices: [],
    }
  },
  getters: {},
  mutations: {
    pushDevice(state, ip) {
      state.devices.push(ip)
    },
  },
  actions: {
    findAvailableDevices({ commit, dispatch }) {
      const networkPrefix = '192.168.2.'

      for (let i = 1; i < 254; i++) {
        const ip = networkPrefix + i

        this.$axios
          .get(`http://${ip}:8080/file/content?path=%2FctrlData.txt`, {
            timeout: 10000,
          })
          .then(async (res) => {
            if (res.data.status !== 'success') {
              await dispatch('createFile', { ip, path: '/ctrlData.txt' })
            }
            commit('pushDevice', {
              ip,
              lastIp: i,
              data: res.data.content ? JSON.parse(res.data.content) : {},
              options: [],
            })
          })
      }
    },
    async createFolder({ commit }, { ip, path }) {
      return await this.$axios.get(
        `http://${ip}:8080/files?path=${encodeURIComponent(path)}`,
        {
          timeout: 10000,
        }
      )
    },
    async createFile({ commit, dispatch }, { ip, path }) {
      return await this.$axios.get(
        `http://${ip}:8080/file/new?path=${encodeURIComponent(path)}`,
        {
          timeout: 10000,
        }
      )
    },
    saveScript({ commit }, { devices, name, payload }) {
      devices.forEach((ip) => {
        this.$axios
          .get(`http://${ip}:8080/file/update?path=%2Finit333.lua`, {
            timeout: 10000,
          })
          .then(() => {
            commit('pushDevice', ip)
          })
      })
    },
  },
}
