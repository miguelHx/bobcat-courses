import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import CustomEventForm from "../Forms/CustomEventForm";
import PropTypes from "prop-types";

class CustomEventModal extends React.Component {

  state = {
    modalOpen: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { mode, customEventObject } = this.props;
    return (
      <Modal
        trigger={
          mode === "create" ?
            (
              <Button color='yellow' onClick={this.handleOpen}>Custom Event</Button>
            )
            :
            (
              <Button color='orange' size='mini' compact onClick={this.handleOpen}>(Edit)</Button>
            )
        }
        closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='tiny'>
        <Modal.Header>
          { mode === "create" ? "Create Custom Event" : `Edit Custom Event: "${customEventObject.event_name}"`}
        </Modal.Header>
        <Modal.Content>
          <CustomEventForm
            mode={mode}
            closeModal={this.handleClose}
            customEventObject={customEventObject}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

CustomEventModal.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
  customEventObject: PropTypes.shape({
    event_name: PropTypes.string,
    start_time: PropTypes.number,
    end_time: PropTypes.number,
    days: PropTypes.string,
  })
};

export default CustomEventModal;