import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { uploadFile } from "./uploadFile"; // Adjust the path as needed

const addPatient = async (patient, files) => {
  try {
    // Upload files and get their URLs
    const fileUrls = await Promise.all(files.map((file) => uploadFile(file)));
    // Add file URLs to the reports array in the patient data
    const updatedReports = patient.reports.map((report, index) => ({
      ...report,
      fileUrl: fileUrls[index] || "",
    }));
    const patientData = { ...patient, reports: updatedReports };
    // Add patient data to Firestore
    const docRef = await addDoc(collection(db, "patients"), patientData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { addPatient };
