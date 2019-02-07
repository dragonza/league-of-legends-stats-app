import { spawn } from 'redux-saga/effects';
import DashBoardSaga from '../containers/HomePage/dashboard-saga';

export default function* rootSaga() {
  yield spawn(DashBoardSaga);
}
