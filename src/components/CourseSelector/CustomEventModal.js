import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import CustomEventForm from "../Forms/CustomEventForm";

class CustomEventModal extends React.Component {

  state = {
    modalOpen: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={<Button color='yellow' onClick={this.handleOpen}>Custom Event</Button>}
        closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='tiny'>
        <Modal.Header>Custom Event</Modal.Header>
        <Modal.Content>
          <CustomEventForm closeModal={this.handleClose}/>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CustomEventModal;