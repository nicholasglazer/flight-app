const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let schedule = [];
let orders = {};

async function readJsonFiles() {
  try {
    const scheduleData = await fs.readFile(path.join(__dirname, 'data', 'schedule.json'), 'utf8');
    const ordersData = await fs.readFile(path.join(__dirname, 'data', 'orders.json'), 'utf8');

    schedule = JSON.parse(scheduleData);
    orders = JSON.parse(ordersData);

    console.log('JSON files read successfully');
  } catch (error) {
    console.error('Error reading JSON files:', error);
  }
}

function assignOrdersToFlights() {
  const assignedOrders = [];
  const flightCapacity = 20;
  const flightLoads = {};

  schedule.forEach(flight => {
    flightLoads[flight.flight_number] = 0;
  });

  Object.entries(orders).forEach(([orderID, orderData]) => {
    const availableFlight = schedule.find(flight =>
      flight.arrival_city === orderData.destination &&
        flightLoads[flight.flight_number] < flightCapacity
    );

    if (availableFlight) {
      assignedOrders.push({
        orderID,
        destination: orderData.destination,
        flightNumber: availableFlight.flight_number,
        day: availableFlight.day,
        departure: availableFlight.departure_city,
      });
      flightLoads[availableFlight.flight_number]++;
    } else {
      assignedOrders.push({
        orderID,
        destination: orderData.destination,
        flightNumber: null,
        day: null,
        departure: null,
      });
    }
  });

  return assignedOrders;
}

app.get('/api/flights', (req, res) => {
  res.json(schedule);
});

app.get('/api/orders', (req, res) => {
  const assignedOrders = assignOrdersToFlights();
  res.json(assignedOrders);
});

app.get('/api/flights/:flightNumber', (req, res) => {
  const flightNumber = req.params.flightNumber;
  const assignedOrders = assignOrdersToFlights();
  const flightOrders = assignedOrders.filter(order => Number(order.flightNumber) === Number(flightNumber));

  res.json(flightOrders);
});

async function startServer() {
  await readJsonFiles();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
