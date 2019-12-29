import React, { Component } from "react";
import Modal from "react-modal";
import BookingForm from "../book/booking-form.container";
import { validateBookingDetails } from "../../validate/booking.validate";
import { storeUserDetails } from "../../actions/book/book.actions";

Modal.setAppElement("body");
class ModalComponent extends Component {
  state = {
    name0: "",
    ph0: "",
    name1: "",
    ph1: "",
    name2: "",
    ph2: "",
    err0: {},
    err1: {},
    err2: {}
  };
  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  findErrlength = err => Object.keys(err).length;
  onSubmit = async () => {
    await this.setState({ err0: {}, err1: {}, err2: {} });
    let { selectedSeats, allUserInfo, resetStateVal, closeModal } = this.props,
      { err0, err1, err2, name0, name1, name2, ph0, ph1, ph2 } = this.state,
      err = [err0, err1, err2],
      name = [name0, name1, name2],
      ph = [ph0, ph1, ph2],
      length = selectedSeats.length;
    console.log(this.props);
    for (var i = 0; i < length; i++) {
      let { e } = validateBookingDetails(name[i], ph[i]);
      err[i] = e;
    }
    if (this.findErrlength(err[0]) || this.findErrlength(err[1] || this.findErrlength(err[2]))) {
      await this.setState({ err0: err[0], err1: err[1], err2: err[2] });
    } else {
      let newTravelDetails = storeUserDetails(this.state, allUserInfo);
      alert("Your Bus Is Sheduled");
      closeModal();
      resetStateVal(newTravelDetails);
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    let { openModal, isModalOpen, closeModal, selectedSeats } = this.props,
      { err0, err1, err2, name0, name1, name2, ph0, ph1, ph2 } = this.state,
      err = [err0, err1, err2],
      name = [name0, name1, name2],
      ph = [ph0, ph1, ph2],
      width = 12 / selectedSeats.length,
      colWidth = "col-md-" + width;
    return (
      <div>
        <button onClick={openModal} class="btn btn-outline-success">
          Confrim
        </button>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ height: "100px" }} contentLabel="Modal">
          <div className="text-center">
            <h3>Please Fill the Form</h3>
          </div>
          <div className="row">
            <br></br>
            {selectedSeats.map((i, index) => (
              <div className={colWidth}>
                <BookingForm key={i} err={err[index]} name={name[index]} ph={ph[index]} index={index} onChange={this.onChange} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-md-6 text-right">
              <button className="btn btn-outline-success" onClick={this.onSubmit}>
                Submit
              </button>
            </div>
            <div className="col-md-6 text-left">
              <button className="btn btn-outline-danger" onClick={() => closeModal()}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default ModalComponent;
