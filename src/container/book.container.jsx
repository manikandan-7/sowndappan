import React, { Component } from "react";
import Filter from "./filter/filter.container";
import { filterBusAction, travelDetails, findBusUsingId, cancelTicketFormTravelDetails } from "../actions/book/book.actions";
import { validateDate } from "../validate/date.validate";
import Available from "../components/available.component";
import ModalComponent from "./modal.container";
import Item from "../components/item/item.component";
import Bus from "../components/bus/bus.component";

export default class BookContainer extends Component {
  state = {
    date: "",
    from: "",
    to: "",
    currentHead: "Tickets Booked",
    filteredBus: [],
    travelDetails: [],
    selectedBus: {},
    selectedBusSeats: [],
    selectedSeats: [],
    currentTicket: {},
    travelDetailsVisible: true,
    availableBusVisible: false,
    busSeatingVisible: false,
    modalIsOpen: false,
    bookedBusVisible: false
  };
  componentDidMount() {
    let details = travelDetails();
    this.setState({ travelDetails: details });
  }
  //modal functions
  openModal = () => {
    let { selectedSeats } = this.state;
    if (!selectedSeats.length) return alert("Please select seat");
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  resetStateVal = newTravelDetails => {
    this.setState({
      travelDetails: newTravelDetails,
      travelDetailsVisible: true,
      availableBusVisible: false,
      busSeatingVisible: false,
      modalIsOpen: false,
      bookedBusVisible: false,
      currentHead: "Booked Tickets",
      selectedSeats: []
    });
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  filterBus = (date, from, to) => {
    if (from === to) return alert("From and To are Same");
    if (!validateDate(date)) return alert("Date is Not Proper");
    this.setState({
      travelDetailsVisible: false,
      availableBusVisible: true,
      busSeatingVisible: false,
      modalIsOpen: false,
      bookedBusVisible: false,
      currentHead: "Booked Tickets"
    });
    let requiredDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    let filteredBus = filterBusAction(from, to);
    this.setState({ date: requiredDate, from: from, to: to, filteredBus: filteredBus });
  };
  seeBus = id => {
    let bus = findBusUsingId(id);
    let { date } = this.state;
    let { dates, noOfSeats } = bus,
      seats = [];
    let availableDate = dates.find(i => i.date === date);
    if (availableDate) seats = availableDate.seats;
    else for (var i = 0; i < noOfSeats; i++) seats[i] = 0;
    this.setState({
      travelDetailsVisible: false,
      availableBusVisible: false,
      modalIsOpen: false,
      busSeatingVisible: true,
      currentHead: "Bus Seating",
      bookedBusVisible: false,
      selectedBus: bus,
      selectedBusSeats: seats
    });
  };
  seeBookedDetails = (id, bus) => {
    if (bus) {
      this.setState({
        currentTicket: bus,
        modalIsOpen: false,
        currentHead: "Ticket Details",
        bookedBusVisible: true,
        travelDetailsVisible: false,
        availableBusVisible: false,
        busSeatingVisible: false
      });
    }
  };
  selectSeat = index => {
    let { selectedBusSeats, selectedSeats } = this.state;
    if (selectedBusSeats[index]) {
      let data = selectedSeats.filter(i => i !== index);
      selectedSeats = data;
    } else {
      if (selectedSeats.length > 2) return alert("You cant select More Than Three seats");
      selectedSeats.push(index);
    }
    selectedBusSeats[index] ? (selectedBusSeats[index] = 0) : (selectedBusSeats[index] = 1);
    this.setState({ selectedBusSeats: selectedBusSeats, selectedSeats: selectedSeats });
  };
  backToTravels = () => {
    this.setState({
      travelDetailsVisible: false,
      modalIsOpen: false,
      bookedBusVisible: false,
      currentHead: "Availables",
      availableBusVisible: true,
      busSeatingVisible: false,
      selectedSeats: []
    });
  };
  returnToBooking = () => {
    this.setState({
      travelDetailsVisible: true,
      availableBusVisible: false,
      busSeatingVisible: false,
      modalIsOpen: false,
      bookedBusVisible: false,
      currentHead: "Booked Tickets"
    });
  };
  cancelTicket = async (id, ticket) => {
    let newTravelDetails = await cancelTicketFormTravelDetails(id, ticket);
    await this.setState({
      travelDetails: newTravelDetails,
      travelDetailsVisible: true,
      modalIsOpen: false,
      currentHead: "Booked Tickets",
      bookedBusVisible: false,
      availableBusVisible: false,
      busSeatingVisible: false
    });
  };

  render() {
    let {
      date,
      filteredBus,
      availableBusVisible,
      travelDetailsVisible,
      travelDetails,
      busSeatingVisible,
      selectedBus,
      selectedBusSeats,
      selectedSeats,
      modalIsOpen,
      currentHead,
      currentTicket,
      bookedBusVisible
    } = this.state;
    return (
      <div className="row p-0">
        <div className="col-md-3 p-0 pt-1 pr-1 text-center">
          <div className="card border-none box-shadow-2 card-body-custom">
            <div className="card-body">
              <h3>Filter Bus</h3>
              <Filter filterBus={this.filterBus} clear={this.returnToBooking} />
            </div>
          </div>
        </div>
        <div className="col-md-9 p-0 pt-1 text-center">
          <div className="card border-none">
            <div className="card-body card-body-custom ">
              <h3>{currentHead}</h3>
              {travelDetailsVisible ? (
                <Available list={travelDetails} seeBus={this.seeBookedDetails} userInfo={true} cancelTicket={this.cancelTicket} />
              ) : (
                ""
              )}
              {availableBusVisible ? <Available list={filteredBus} seeBus={this.seeBus} /> : ""}
              {busSeatingVisible ? (
                <div>
                  {/* <BusSeat bus={selectedBus} seats={selectedBusSeats} selectSeat={this.selectSeat} close={this.backToTravels} /> */}
                  <Bus
                    item={selectedBus}
                    seats={selectedBusSeats}
                    showSeatsBoolean={true}
                    select={this.selectSeat}
                    close={this.backToTravels}
                  />
                  <br></br>
                  <ModalComponent
                    selectedSeats={selectedSeats}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    isModalOpen={modalIsOpen}
                    resetStateVal={this.resetStateVal}
                    allUserInfo={{ date, selectedBus, selectedBusSeats, selectedSeats }}
                  />
                </div>
              ) : (
                ""
              )}
              {bookedBusVisible ? (
                <Item item={currentTicket} addtionalInfoBoolean={true} cancelItem={this.cancelTicket} close={this.returnToBooking} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
