import { createSlice } from '@reduxjs/toolkit'

/* This slice follows a pattern of setters and geeters
    When the components need access to a part of the state, they call the respective getter
    When the components need to modify the state,  they call the respective setter
    Names that DON'T start with "set" or "get", do NOT get or set anything,
    but execute complementary operations, like, fe, converting units 
    Other names than "set" and "get" as fine.
*/
const initialState = {
  isFlipped: false
}

const animSlice = createSlice({
  name: 'anim',
  initialState,
  reducers: {
    setIsFlipped: state => {
      state.isFlipped = !state.isFlipped
    }
  }
})

export const { setIsFlipped } = animSlice.actions
export const getIsFlipped = state => state.anim.isFlipped

export default animSlice.reducer
