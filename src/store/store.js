/*
  2. 스토어 설정
    1) 전역 데이터 저장소 (중앙 저장소)
    2) 리액트 앱의 모든 상태(state)를 한 곳(스토어)에 저장하고 관리할 수 있습니다.
    3) 모든 컴포넌트들이 스토어의 데이터를 공유할 수 있습니다.
    4) 각 상태는 슬라이스(slice)로 나누어 관리합니다.
    5) configureStore : 리덕스 툴킷에서 제공하는 스토어 생성 함수
*/

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // state.cart === { items: [] }
    auth: authReducer,
    // user: userReducer  // state.user === { xx, xx }
  },
});

export default store;
