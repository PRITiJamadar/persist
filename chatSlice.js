import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatbody: '',
  },
  reducers: {
    updateChatBody: (state, action) => {
      state.chatbody = action.payload;
    },
  },
});

export const { updateChatBody } = chatSlice.actions;

export default chatSlice.reducer;