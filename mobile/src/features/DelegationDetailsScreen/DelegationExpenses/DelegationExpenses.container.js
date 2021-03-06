import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { array, bool, func, number, object } from "prop-types";

import {
  getDelegationExpensesTotalSize,
  getExpensesFetching,
  getExpenses
} from "../../../selectors/delegationExpenses.selectors";
import { fetchDelegationExpenses, clearExpenses } from "../../../actions/delegationExpenses.actions";
import DelegationExpenses from "./DelegationExpenses.component";

const firstPageIndex = 1;

class DelegationExpensesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      expensesPerPage: 10,
      sortBy: "id",
      sortDirection: "desc",
      isSortFilterPanelCollapsed: true
    };
  }

  static propTypes = {
    clearExpenses: func,
    delegationId: number,
    expenses: array,
    fetchDelegationExpenses: func,
    fetching: bool,
    navigate: object,
    setFunctionForCollapsing: func,
    totalSize: number
  };

  sortItems = values => {
    this.setState({ currentPage: firstPageIndex });
    this.setState({ sortBy: values.sortBy });
    this._changeIsSortFilterPanelCollapsed();

    this.props.fetchDelegationExpenses(
      this.props.delegationId,
      firstPageIndex,
      this.state.expensesPerPage,
      values.sortBy + "." + this.state.sortDirection
    );
  };

  componentDidMount() {
    this.props.fetchDelegationExpenses(
      this.props.delegationId,
      this.state.currentPage,
      this.state.expensesPerPage,
      this.state.sortBy + "." + this.state.sortDirection
    );
    this.props.setFunctionForCollapsing(this._changeIsSortFilterPanelCollapsed, "DelegationExpenses");
  }

  componentWillUnmount() {
    this.props.clearExpenses();
  }

  handleLoadMoreExpenses = () => {
    if (this._shouldFetchMoreExpenses()) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () =>
        this.props.fetchDelegationExpenses(
          this.props.delegationId,
          this.state.currentPage,
          this.state.expensesPerPage,
          this.state.sortBy + "." + this.state.sortDirection
        )
      );
    }
  };

  changeSortDirection = direction => {
    this.setState({ sortDirection: direction });
  };

  _shouldFetchMoreExpenses = () => {
    return !this._isBottomOfExpensesReached() && !this.props.fetching;
  };

  _isBottomOfExpensesReached = () => {
    return this.state.currentPage * this.state.expensesPerPage >= this.props.totalSize;
  };

  _changeIsSortFilterPanelCollapsed = () => {
    this.setState({ isSortFilterPanelCollapsed: !this.state.isSortFilterPanelCollapsed });
  };

  render() {
    return (
      <View>
        <DelegationExpenses
          changeIsSortFilterPanelCollapsed={this._changeIsSortFilterPanelCollapsed}
          changeSortDirection={this.changeSortDirection}
          delegationId={this.props.delegationId}
          expenses={this.props.expenses}
          fetching={this.props.fetching}
          handleLoadMoreExpenses={this.handleLoadMoreExpenses}
          isSortFilterPanelCollapsed={this.state.isSortFilterPanelCollapsed}
          navigate={this.props.navigate}
          sortDirection={this.state.sortDirection}
          sortItems={this.sortItems}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalSize: getDelegationExpensesTotalSize(state),
    fetching: getExpensesFetching(state),
    expenses: getExpenses(state)
  };
};

const mapDispatchToProps = {
  fetchDelegationExpenses,
  clearExpenses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationExpensesContainer);
