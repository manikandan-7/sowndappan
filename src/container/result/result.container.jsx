// import React, { Component } from "react";
// import Available from "../components/available.component";
// import BusSeat from "../components/bus-seat.component";
// import ModalComponent from "./modal.container";
// import TicketInfo from "../components/ticketInfo.component";

// export default class Result extends Component {
//   state = {
//     travelDetailsVisible: true,
//     availableBusVisible: false,
//     busSeatingVisible: false,
//     modalIsOpen: false,
//     bookedBusVisible: false
//   };
//   render() {
//     let { travelDetails,seeBookedDetails } = this.props;
//     return (
//       <div>
//         {travelDetailsVisible ? (
//           <Available list={travelDetails} seeBus={this.seeBookedDetails} userInfo={true} cancelTicket={this.cancelTicket} />
//         ) : (
//           ""
//         )}
//         {availableBusVisible ? <Available list={filteredBus} seeBus={this.seeBus} /> : ""}
//         {busSeatingVisible || !modalIsOpen ? (
//           <div>
//             <BusSeat
//               bus={selectedBus}
//               seats={selectedBusSeats}
//               selectSeat={this.selectSeat}
//               close={this.backToTravels}
//               confrim={this.confrim}
//             />
//             <br></br>
//             <ModalComponent
//               selectedSeats={selectedSeats}
//               openModal={this.openModal}
//               closeModal={this.closeModal}
//               isModalOpen={modalIsOpen}
//               resetStateVal={this.resetStateVal}
//               allUserInfo={{ date, selectedBus, selectedBusSeats, selectedSeats }}
//             />
//           </div>
//         ) : (
//           ""
//         )}
//         {bookedBusVisible ? <TicketInfo ticket={currentTicket} cancelTicket={this.cancelTicket} close={this.returnToBooking} /> : ""}
//       </div>
//     );
//   }
// }
