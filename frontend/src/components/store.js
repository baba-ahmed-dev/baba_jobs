import { configureStore } from '@reduxjs/toolkit';
import infoSlice from "./slices/Test";
import authSlice from "./slices/Auth";
import CompanieSlice from './slices/CompanieSlice';
import SeekersSlice from './slices/SeekersSlice';
import ProfileSlice from './slices/ProfileSlice';
import DetailSlice from './slices/DetailSlice';
import SearchSlice from './slices/SearchSlice';
import Idaction from './slices/Idaction';

const reducer = {
  info: infoSlice,
  auth:authSlice,
  company: CompanieSlice,
  seeker: SeekersSlice,
  profile: ProfileSlice,
  detail : DetailSlice,
  search : SearchSlice,
  idaction : Idaction
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;