import React from "react";
import Immutable from "immutable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MatchItem from "./MatchItem";
import { createStructuredSelector } from "reselect";
import { makeMatchIdsSelector } from "./match-selector";
class MatchList extends React.PureComponent {
  render() {
    if (!this.props.matchIds) {
      return <div />
    }
    return this.props.matchIds.map(matchId => {
      return <MatchItem matchId={matchId} key={matchId} />;
    });
  }
}

const mapStateToProps = createStructuredSelector({
  matchIds: makeMatchIdsSelector()
});

MatchList.propTypes = {
  matchIds: PropTypes.instanceOf(Immutable.List).isRequired
};

export default connect(mapStateToProps)(MatchList);
