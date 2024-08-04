import { ref, set } from "firebase/database";
import { database } from "./firebase";

const addDoctor = async (doctor) => {
  try {
    const doctorRef = ref(database, `hospital_12345/doctors/${doctor.id}`);
    await set(doctorRef, doctor);
    console.log("Doctor added successfully");
  } catch (e) {
    console.error("Error adding doctor: ", e);
  }
};

export { addDoctor };
