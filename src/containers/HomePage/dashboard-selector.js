import { createSelector } from 'reselect';


export const summonerNameSelector = state => state.getIn(['dashboard', 'summoner']);
export const dashboardLoadingSelector = state => state.getIn(['dashboard', 'loading']);
export const dashboardErrorSelector = state => state.getIn(['dashboard', 'error']);


export const makeSummonerNameSelector = () =>
  createSelector(summonerNameSelector, summoner => summoner);
export const makeDashboardLoadingSelector = () =>
  createSelector(dashboardLoadingSelector, loading => loading);
export const makeDashboardErrorSelector = () =>
  createSelector(dashboardErrorSelector, error => error);
