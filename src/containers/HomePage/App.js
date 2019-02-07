import React from "react";
import { connect } from "react-redux";
import { changeSummonerName, fetchMatchList } from "./dashboard-action";
import {
  makeSummonerNameSelector,
  makeDashboardLoadingSelector,
  makeDashboardErrorSelector
} from "./dashboard-selector";
import { createStructuredSelector } from "reselect";
import XRegExp from "xregexp";
import MatchList from "./MatchList/MatchList";

class DashBoard extends React.PureComponent {
  handleInputChange = e => {
    this.props.changeSummonerName(e.target.value);
  };

  validateSummonerName = name => {
    const pattern = new XRegExp("^[0-9\\p{L} _\\.]+$");
    return XRegExp.test(name, pattern);
  };

  handleInputSubmit = e => {
    e.preventDefault();
    const isNameValidated = this.validateSummonerName(this.props.summoner);
    if (!isNameValidated) return;
    this.props.fetchMatchList(this.props.summoner);
    // this.props.onSummonerSubmit(this.props.summoner);
  };

  renderMatchResult = () => {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    if (this.props.error) {
      return (
        <div>{this.props.error.message}</div>
      )
    }
    return (
      <div className="matches-result">
        <MatchList />
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">League of Legends Stat</h1>
        <form onSubmit={this.handleInputSubmit}>
          <div className="form-group">
            <input
              id="summoner"
              className="form-control"
              value={this.props.summoner}
              type="text"
              name="summoner-name"
              onChange={this.handleInputChange}
              placeholder="Please enter a summoner name"
            />
          </div>
        </form>
        {this.renderMatchResult()}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  summoner: makeSummonerNameSelector(),
  loading: makeDashboardLoadingSelector(),
  error: makeDashboardErrorSelector()
});

export default connect(
  mapStateToProps,
  { changeSummonerName, fetchMatchList }
)(DashBoard);
