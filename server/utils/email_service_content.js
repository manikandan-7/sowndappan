const generatMailInfo = async (payload, SERVICE_NO) => {
  totalContent = "";
  remainder = "<h1>Your Bus is gonna Depature in 1hr. Please arrive to your pickup location</h1>";
  TicketInfo = `<div">
  <img src="https://www.airchandigarh.com/logo/upload/imgvin/F10075/bus-animation.gif"  alt="Let's Go"></img>
    <h1 style="color:violet">Let's Go</h1>
    <h3>Thanks For Booking Ticket</h3>
    <p>Your Bus us Sheduled on ${payload.date}</p>
    <p>Your Ticket Info</p>
    <p>Travels :: ${payload.travels_name}</p>
    <p>From :: ${payload.from_city}</p>
    <p>To :: ${payload.to_city}</p>
    <p>Time :: ${payload.time}.00 (24hr format)</p>
    <p>Passengers Info</p><p>Seats_NO :: `;
  console.log(payload.seats);
  await payload.seats.forEach(element => (TicketInfo += `${element}  `));
  TicketInfo += "</p>";
  // console.log(TicketInfo);
  table = `<table style="overflow:scroll;width:100%;border: 1px solid black;border-collapse: collapse;text-align: center;">
  <tr>
    <th>Name</th>
    <th>Gender</th>
    <th>Phone Number</th>
  </tr>`;

  await payload.passengers_info.forEach(element => (table += `<tr><td>${element.name}</td><td>${element.gender}</td><td>${element.ph}</td></tr>`));
  table += "</table></div>";

  if (SERVICE_NO === 2) totalContent += remainder;
  totalContent += TicketInfo + table;
  return totalContent;
};

module.exports = generatMailInfo;
