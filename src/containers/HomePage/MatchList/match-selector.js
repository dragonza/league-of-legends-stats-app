import { createSelector } from "reselect";

export const submittedSummoner = state =>
  state.getIn(["dashboard", "matches", "activeSummoner"]);
export const matchIdsSelector = state =>
  state.getIn(["dashboard", "matches", "byIds"]);
export const matchDetailSelector = (state, ownProps) =>
  state.getIn([
    "dashboard",
    "matches",
    "matchesMap",
    ownProps.matchId.toString()
  ]);

export const activePlayerSelector = createSelector(
  matchDetailSelector,
  submittedSummoner,
  (matchDetail, activeSummoner) => {
    if (!matchDetail) return null;
    const players = matchDetail.getIn(["participantIdentities"]);
    return players.find(player => {
      return (
        player.getIn(["player", "summonerName"]) ===
        activeSummoner.getIn(["name"])
      );
    });
  }
);

export const activeParticipantIdSelector = createSelector(
  activePlayerSelector,
  activePlayer => {
    if (!activePlayer) return null;
    return activePlayer.get("participantId");
  }
);

export const activeParticipantSelector = createSelector(
  matchDetailSelector,
  activeParticipantIdSelector,
  (matchDetail, activeParticipantId) => {
    const participants = matchDetail.getIn(["participants"]);
    return participants.find(
      participant => participant.get("participantId") === activeParticipantId
    );
  }
);

export const makeActiveParticipantSelector = () =>
  createSelector(
    matchDetailSelector,
    activeParticipantIdSelector,
    (matchDetail, activeParticipantId) => {
      if (!matchDetail) return null;
      const participants = matchDetail.getIn(["participants"]);
      return participants.find(
        participant => participant.get("participantId") === activeParticipantId
      );
    }
  );

export const makeActivePlayerSelector = () =>
  createSelector(
    activePlayerSelector,
    activePlayer => {
      return activePlayer;
    }
  );

export const matchIdSelector = (state, ownProps) => ownProps.matchId.toString();
export const makeMatchIdsSelector = () =>
  createSelector(
    matchIdsSelector,
    matchIds => matchIds
  );

export const makeMatchDetailSelector = () =>
  createSelector(
    matchDetailSelector,
    matchDetail => matchDetail
  );
