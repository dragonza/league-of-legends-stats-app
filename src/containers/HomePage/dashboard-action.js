import { fromJS } from "immutable";
import { UPDATE_DATA } from "../../store/data-action";
import {
  UPDATE,
  CHANGE_SUMMONER_NAME,
  FETCH_MATCHLIST,
  basePath,
  CLEAR_MATCH_DATA
} from "./constant";
const path = `${basePath}.matches`;

export function changeSummonerName(name) {
  return UPDATE_DATA({
    _type: `${UPDATE}/${CHANGE_SUMMONER_NAME}`,
    _path: `${basePath}.summoner`,
    _value: name
  });
}

export function clearMatchData() {
  return UPDATE_DATA({
    _type: `${UPDATE}/${CLEAR_MATCH_DATA}`,
    _path: `${basePath}`,
    _value: fromJS({})
  });
}

export function fetchMatchList() {
  return UPDATE_DATA({
    _type: `${UPDATE}/${FETCH_MATCHLIST}`,
    _path: `${basePath}.loading`,
    _value: true
  });
}

export function fetchSummonerSuccess(type, payload = {}) {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: `${path}.activeSummoner`,
    _value: fromJS(payload)
  })
}

export const fetchMatchesIdsSuccess = (type, matchesIds) => {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: `${path}.byIds`,
    _value: fromJS(matchesIds)
  });
};

export const fetchDashboardFailed = (type, payload = {}) => {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: basePath,
    _value: fromJS(payload)
  });
};

export const fetchMatchDetailSuccess = (type, payload = {}) => {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: `${path}.matchesMap.${payload.gameId}`,
    _value: fromJS(payload)
  });
};

export const fetchMatchDetailFailed = (type, matchId) => {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: `${path}.matchesMap.${matchId}.error`,
    _value: true
  });
};

export const fetchDashBoardSuccess = (type, payload = {}) => {
  return UPDATE_DATA({
    _type: `${UPDATE}/${type}`,
    _path: basePath,
    _value: fromJS(payload)
  });
};
