import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const uploadFile = async (file) => {
  const storageRef = ref(storage, `PatientUploads/${file.name}`);
  await uploadBytes(storageRef, file);
  const fileUrl = await getDownloadURL(storageRef);
  return fileUrl;
};

export { uploadFile };
