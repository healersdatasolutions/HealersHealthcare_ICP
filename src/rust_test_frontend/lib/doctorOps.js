import { ref, set } from "firebase/database";
import { db } from "./firebase";

const addDoctor = async (doctor) => {
  try {
    const doctorRef = ref(db, `hospital_12345/doctors/${doctor.id}`);
    await set(doctorRef, doctor);
    console.log("Doctor added successfully");
  } catch (e) {
    console.error("Error adding doctor: ", e);
  }
};

export { addDoctor };
