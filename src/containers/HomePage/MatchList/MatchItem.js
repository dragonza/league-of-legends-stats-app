import React from "react";
import classNames from "classnames";
import Immutable from "immutable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeMatchDetailSelector,
  makeActivePlayerSelector,
  makeActiveParticipantSelector
} from "./match-selector";
import ChampionImage from "../../../components/ChampionImage";
import ChampionName from "../../../components/ChampionName";
import ItemImage from "../../../components/ItemImage";
import RuneImage from "../../../components/RuneImage";
import SpellImage from "../../../components/SpellImage";

class MatchItem extends React.PureComponent {
  renderTeamPlayer = (team, participants) => {
    return team.map(summoner => {
      const championId = participants
        .find(
          participant =>
            participant.get("participantId") === summoner.get("participantId")
        )
        .get("championId");
      return (
        <div
          key={summoner.getIn(["player", "accountId"])}
          className="summoner-item"
        >
          <div className="champion">
            <ChampionImage championId={championId} />
          </div>
          <span className="summoner-name">
            {summoner.getIn(["player", "summonerName"])}
          </span>
        </div>
      );
    });
  };
  renderTeamSummoner = () => {
    const players = this.props.match.getIn(["participantIdentities"]);
    const participants = this.props.match.getIn(["participants"]);
    if (!players) return;
    const team1 = players.slice(0, 5);
    const team2 = players.slice(5);
    const team1Element = this.renderTeamPlayer(team1, participants);
    const team2Element = this.renderTeamPlayer(team2, participants);
    return (
      <div className="team-summoner-wrapper">
        <div className="team1">{team1Element}</div>
        <div className="team2">{team2Element}</div>
      </div>
    );
  };

  renderGameDuration = () => {
    const gameDuration = this.props.match.getIn(["gameDuration"]);
    if (!gameDuration) return null;
    const gameDurationMin = Math.floor(parseInt(gameDuration) / 60);
    const gameDurationSec = gameDuration - gameDurationMin * 60;
    return (
      <div className="game-duration">
        {`${gameDurationMin}m ${gameDurationSec}s`}
      </div>
    );
  };

  renderActiveChampion = () => {
    if (!this.props.activeParticipant) return null;
    const championId = this.props.activeParticipant.get("championId");
    return (
      <div className="game-setting-info">
        <div className="game-champion-info">
          <div className="champion-image">
            <ChampionImage championId={championId} size="large" />
          </div>
          {this.renderSpells()}
          {this.renderRunes()}
        </div>
        <div className="champion-name">
          <ChampionName championId={championId} />
        </div>
      </div>
    );
  };

  renderKDA = () => {
    if (!this.props.activeParticipant) return null;
    const kills = this.props.activeParticipant.getIn(["stats", "kills"]);
    const assists = this.props.activeParticipant.getIn(["stats", "assists"]);
    const deaths = this.props.activeParticipant.getIn(["stats", "deaths"]);
    const KDA = Math.round(((kills + assists) * 100) / deaths) / 100;
    return (
      <div className="match-kda">
        <div className="kda-detail">
          <span>{`${kills} / `}</span>
          <span className="number-of-death">{deaths}</span>
          <span>{` / ${assists}`}</span>
        </div>
        <div className="KDA">{`${KDA}:1 KDA`}</div>
      </div>
    );
  };

  renderGameResults = () => {
    if (!this.props.activeParticipant) return null;
    const gameResult = this.props.activeParticipant.getIn(["stats", "win"]);
    const gameResultClasses = classNames("game-result", {
      "game-win": gameResult,
      "game-lose": !gameResult
    });
    return (
      <div className={gameResultClasses}>
        {gameResult ? "Victory" : "Defeat"}
      </div>
    );
  };

  renderItemBoughtInGame = () => {
    if (!this.props.activeParticipant) return null;
    let itemList = [];
    for (let i = 0; i < 7; i++) {
      itemList.push(this.props.activeParticipant.getIn(["stats", `item${i}`]));
    }
    return itemList.filter(Boolean).map(itemId => (
      <div className="item-image" key={itemId}>
        <ItemImage itemId={itemId} />
      </div>
    ));
  };

  renderChampionStats = () => {
    if (!this.props.activeParticipant) return null;
    const creepScore =
      this.props.activeParticipant.getIn(["stats", "totalMinionsKilled"]) +
      this.props.activeParticipant.getIn([
        "stats",
        "neutralMinionsKilledTeamJungle"
      ]);
    const creepScorePerMin =
      Math.round(
        (creepScore / this.props.match.getIn(["gameDuration"])) * 60 * 100
      ) / 100;
    return (
      <div className="champion-stats">
        <div className="champion-lv">
          {`Level${this.props.activeParticipant.getIn([
            "stats",
            "champLevel"
          ])}`}
        </div>
        <div className="creep-score">{`${creepScore}(${creepScorePerMin}) CS`}</div>
      </div>
    );
  };

  renderSpells = () => {
    if (!this.props.activeParticipant) return null;
    const spellList = [
      this.props.activeParticipant.getIn(["spell1Id"]),
      this.props.activeParticipant.getIn(["spell2Id"])
    ];
    return (
      <div className="spell-list">
        {spellList.map(spellId => (
          <div className="spell-image" key={spellId}>
            <SpellImage spellId={spellId} />
          </div>
        ))}
      </div>
    );
  };

  renderRunes = () => {
    if (!this.props.activeParticipant) return null;
    const firstRune = this.props.activeParticipant.getIn(["stats", "perk0"]);
    const secondRune = this.props.activeParticipant.getIn([
      "stats",
      "perkSubStyle"
    ]);
    const runeList = [firstRune, secondRune];
    return (
      <div className="rune-list">
        {runeList.map(runeId => (
          <div className="rune-image" key={runeId}>
            <RuneImage runeId={runeId} />
          </div>
        ))}
      </div>
    );
  };

  render() {
    if (!this.props.activeParticipant) return null;

    const gameResult = this.props.activeParticipant.getIn(["stats", "win"])
      ? "game-win"
      : "game-lose";

    return (
      <div className={`match-item ${gameResult}`}>
        <div className="game-stats">
          {this.renderGameResults()}
          {this.renderGameDuration()}
        </div>
        {this.renderActiveChampion()}

        {this.renderKDA()}
        {this.renderChampionStats()}
        <div className="item-list">
          {this.renderItemBoughtInGame()}
        </div>
        {this.renderTeamSummoner()}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  match: makeMatchDetailSelector(),
  activeSummoner: makeActivePlayerSelector(),
  activeParticipant: makeActiveParticipantSelector()
});

MatchItem.propTypes = {
  match: PropTypes.instanceOf(Immutable.Map).isRequired
};
MatchItem.defaultProps = {
  match: Immutable.fromJS({})
};
export default connect(mapStateToProps)(MatchItem);
