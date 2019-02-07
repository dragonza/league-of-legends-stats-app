import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  UPDATE,
  FETCH_MATCHLIST,
  FETCH_MATCHESIDS_SUCCESS,
  FETCH_DASHBOARD_FAILED,
  FETCH_MATCHDETAIL_SUCCESS,
  FETCH_MATCHDETAIL_FAILED,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_SUMMONER_SUCCESS
} from "./constant";
import apiRequest from "../../store/request";
import { summonerNameSelector } from "./dashboard-selector";
import { baseUrl } from "./constant";
import {
  fetchSummonerSuccess,
  fetchMatchesIdsSuccess,
  fetchDashboardFailed,
  fetchMatchDetailSuccess,
  fetchMatchDetailFailed,
  fetchDashBoardSuccess,
  clearMatchData
} from "./dashboard-action";
const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
const queryApi = `?api_key=${API_KEY}`;

function* fetchSummoner() {
  const summonerName = yield select(summonerNameSelector);
  const requestUrl = `${baseUrl}/summoner/v4/summoners/by-name/${summonerName}${queryApi}`;
  const res = yield call(apiRequest, requestUrl, { mode: "cors" });
  yield put(fetchSummonerSuccess(FETCH_SUMMONER_SUCCESS, res));
  return res.accountId;
}

function* fetchMatchList(accountId) {
  const requestUrl = `${baseUrl}/match/v4/matchlists/by-account/${accountId}${queryApi}&endIndex=5`;
  const { matches } = yield call(apiRequest, requestUrl, { endIndex: 5 });
  return matches.map(match => match.gameId);
  // console.log('res', res);
}

function* fetchMatchDetail(matchId) {
  try {
    const requestUrl = `${baseUrl}/match/v4/matches/${matchId}/${queryApi}`;
    const res = yield call(apiRequest, requestUrl);
    yield put(fetchMatchDetailSuccess(FETCH_MATCHDETAIL_SUCCESS, {...res, error: false}));
  } catch (e) {
    yield put(fetchMatchDetailFailed(FETCH_MATCHDETAIL_FAILED, matchId))
  }
}

function* handleFetchMatchList() {
  try {
    yield put(clearMatchData())
    const accountId = yield call(fetchSummoner);
    const matchesIds = yield call(fetchMatchList, accountId);
    yield put(fetchMatchesIdsSuccess(FETCH_MATCHESIDS_SUCCESS, matchesIds));
    yield matchesIds.map(matchId => call(fetchMatchDetail, matchId));
    yield put(fetchDashBoardSuccess(FETCH_DASHBOARD_SUCCESS,  { loading: false, error: false } ));
  } catch (e) {
    yield put(
      fetchDashboardFailed(FETCH_DASHBOARD_FAILED, {
        error: e,
        loading: false
      })
    );
  }
}
export default function* dashboardSaga() {
  yield takeEvery(`${UPDATE}/${FETCH_MATCHLIST}`, handleFetchMatchList);
}
