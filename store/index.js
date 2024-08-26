export const state = () => {
  return {
    user: null

  }
}

export const mutations = {
  PostUserData (state, data) {
    state.user = data
  }
}
