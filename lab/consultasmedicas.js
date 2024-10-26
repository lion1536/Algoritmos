import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

class Appointment {
  constructor(patient, doctor, date, time) {
    this.patient = patient;
    this.doctor = doctor;
    this.date = date;
    this.time = time;
  }
}

const appointments = [];

const scheduleAppointment = async () => {
  const name = await rl.question("Enter patient name: ");
  const doctor = await rl.question("Enter doctor name: ");
  const date = await rl.question("Enter date (YYYY-MM-DD): ");
  const time = await rl.question("Enter time (HH-MM): ");

  const appointment = new Appointment(name, doctor, date, time);
  appointments.push(appointment);
  console.log("Appointment scheduled successfully.");
  await start();
};

const viewAppointments = async () => {
  if (appointments.length === 0) {
    console.log("No appointments scheduled.");
  } else {
    appointments.forEach((appt, index) => {
      console.log(
        `${index + 1}. Patient: ${appt.patient}, Doctor: ${
          appt.doctor
        }, Date: ${appt.date}, Time: ${appt.time}`
      );
    });
  }
  await start();
};

const cancelAppointment = async () => {
  await viewAppointments();
  const num = await rl.question("Enter appointment number to cancel: ");
  const index = parseInt(num) - 1;

  if (appointments[index]) {
    appointments.splice(index, 1);
    console.log("Appointment cancelled.");
  } else {
    console.log("Invalid appointment number.");
  }
  await start();
};

const menu = () => {
  console.log(`\n1. Schedule Appointment
2. View Appointments
3. Cancel Appointment
4. Exit`);
};

const start = async () => {
  menu();
  const choice = await rl.question("Enter your choice: ");

  switch (choice) {
    case "1":
      await scheduleAppointment();
      break;
    case "2":
      await viewAppointments();
      break;
    case "3":
      await cancelAppointment();
      break;
    case "4":
      rl.close();
      break;
    default:
      console.log("Invalid choice.");
      await start();
      break;
  }
};

start();
