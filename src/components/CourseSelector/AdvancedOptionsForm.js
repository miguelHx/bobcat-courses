import React from 'react';
import { Form } from 'semantic-ui-react';
import { EARLIEST_TIMES, LATEST_TIMES } from "../../utils/TimeOptions";

class AdvancedOptionsForm extends React.Component {

  state = {
    gapValue: null,
    daysValue: null,
    earliest: null,
    latest: null,
  };

  handleGapChange = (event, { value }) => {
    const newVal = value === this.state.gapValue ? null : value;
    this.setState({ gapValue: newVal });
    this.props.handleGapsChange(newVal);
  };

  handleDaysChange = (event, { value }) => {
    const newVal = value === this.state.daysValue ? null : value;
    this.setState({ daysValue: newVal });
    this.props.handleDaysChange(newVal);
  };

  handleEarliestTimeChange = (event, { value }) => {
    this.setState({ earliest: value });
    this.props.handleEarliestTimeChange(value);
  };

  handleLatestTimeChange = (event, { value }) => {
    this.setState({ latest: value });
    this.props.handleLatestTimeChange(value);
  };

  render() {
    const { gapValue, daysValue } = this.state;
    return (
      <Form>
        <Form.Select
          label='Earliest?'
          options={EARLIEST_TIMES}
          default={EARLIEST_TIMES[0]}
          placeholder='Time'
          compact
          inline
          onChange={this.handleEarliestTimeChange}
        />
        <Form.Select
          label='Latest?'
          options={LATEST_TIMES}
          default={LATEST_TIMES[0]}
          placeholder='Time'
          compact
          inline
          onChange={this.handleLatestTimeChange}
        />
        <Form.Group inline>
          <label>Gaps:</label>
          <Form.Checkbox
            label='Minimize'
            value='asc'
            checked={gapValue === 'asc'}
            onChange={this.handleGapChange}
          />
          <Form.Checkbox
            label='Maximize'
            value='desc'
            checked={gapValue === 'desc'}
            onChange={this.handleGapChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Days:</label>
          <Form.Checkbox
            label='Minimize'
            value='asc'
            checked={daysValue === 'asc'}
            onChange={this.handleDaysChange}
          />
          <Form.Checkbox
            label='Maximize'
            value='asc'
            checked={daysValue === 'desc'}
            onChange={this.handleDaysChange}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default AdvancedOptionsForm;