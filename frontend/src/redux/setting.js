import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: 'http://localhost:8080'
  // url: (process.env.REACT_APP_SERVER_URL !== undefined) ? process.env.REACT_APP_SERVER_URL : 'https://tomcat.johnnyip.com/ar'
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setURL: (state, action) => {
      console.log("payload: " + action.payload)
      state.url = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setURL } = settingSlice.actions

export default settingSlice.reducer
