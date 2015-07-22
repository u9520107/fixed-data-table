/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";

var ROWS = 1000000;

var ExampleImage = require('./ExampleImage');
var FakeObjectDataListStore = require('./FakeObjectDataListStore');

var FixedDataTable = require('fixed-data-table');
var React = require('react');

var PropTypes = React.PropTypes;
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

function renderImage(/*string*/ cellData) {
  return <ExampleImage src={cellData} />;
}

function renderLink(/*string*/ cellData) {
  return <a href="#">{cellData}</a>;
}

function renderDate(/*object*/ cellData) {
  return <span>{cellData.toLocaleString()}</span>;
}


var ObjectDataExample = React.createClass({

  propTypes: {
    onContentDimensionsChange: PropTypes.func,
    left: PropTypes.number,
    top: PropTypes.number,
  },

  _onContentHeightChange(contentHeight) {
    this.props.onContentDimensionsChange &&
      this.props.onContentDimensionsChange(contentHeight, 1150);
  },

  getInitialState() {
    return {
      dataList: new FakeObjectDataListStore(ROWS),
      expansions: {}
    }
  },

  _rowGetter(index){
    return this.state.dataList.getObjectAt(index);
  },
  _rowExpansionHeightGetter(index) {
    return this.state.expansions[index] ? 200 : 0;
  },
  _rowExpansionRenderer(index, data, width) {
    var style = {
      width: width,
      height: 200,
      backgroundImage: 'url(' + data.avartar + ')'
    };
    return (
      <div style={style}>
      </div>
    );
  },
  _handleRowClick(e, index) {
    var expansions = this.state.expansions;
    expansions[index] = !expansions[index];
    this.setState({
      expansions: expansions
    });
  },

  render() {
    var controlledScrolling =
      this.props.left !== undefined || this.props.top !== undefined;

    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowGetter={this._rowGetter}
        rowsCount={this.state.dataList.getSize()}
        width={this.props.tableWidth}
        height={this.props.tableHeight}
        onContentHeightChange={this._onContentHeightChange}
        rowExpansionHeightGetter={this._rowExpansionHeightGetter}
        onRowClick={this._handleRowClick}
        rowExpansionRenderer={this._rowExpansionRenderer}
        scrollTop={this.props.top}
        scrollLeft={this.props.left}
        overflowX={controlledScrolling ? "hidden" : "auto"}
        overflowY={controlledScrolling ? "hidden" : "auto"}>
        <Column
          cellRenderer={renderImage}
          dataKey="avartar"
          fixed={true}
          label=""
          width={50}
        />
        <Column
          dataKey="firstName"
          fixed={true}
          label="First Name"
          width={100}
        />
        <Column
          dataKey="lastName"
          fixed={true}
          label="Last Name"
          width={100}
        />
        <Column
          dataKey="city"
          label="City"
          width={100}
        />
        <Column
          label="Street"
          width={200}
          dataKey="street"
        />
        <Column
          label="Zip Code"
          width={200}
          dataKey="zipCode"
        />
        <Column
          cellRenderer={renderLink}
          label="Email"
          width={200}
          fixed={true}
          fixedPosition="right"
          dataKey="email"
        />
        <Column
          cellRenderer={renderDate}
          label="DOB"
          width={200}
          dataKey="date"
        />
      </Table>
    );
  },
});

module.exports = ObjectDataExample;
