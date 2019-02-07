/* eslint-disable */
import { fromJS } from 'immutable';
export default fromJS({
  dashboard: {
    summoner: '',
    loading: false,
    error: false,
    matches: {
      byIds: [],
      matchesMap: {},
      activeSummoner: ''
    }
  }
});
