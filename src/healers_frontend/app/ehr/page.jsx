"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { addPatient } from "../../lib/patientOps";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { CirclePlusIcon } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function EHR(params) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        const patientList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientList);
      } catch (error) {
        console.error("Error fetching patients: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    bloodGroup: "",
    height: "",
    weight: "",
    history: [
      {
        pharmacy: "",
        physician: "",
        event: "",
        prescription: "",
        remedies: "",
      },
    ],
    reports: [
      {
        doctor: "",
        referredTo: "",
        type: "",
        comments: "",
        date: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = Array.from(e.target.files);
    setFiles(newFiles);
  };
  

  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const newArray = [...formData[arrayName]];
    newArray[index][name] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addArrayField = (arrayName) => {
    const newArray = [
      ...formData[arrayName],
      { event: "", prescription: "", remedies: "" },
    ];
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const removeArrayField = (index, arrayName) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flattenedFiles = files.flat();
      await addPatient(formData, flattenedFiles);
  
      setIsOpen(false);
      setFormData({
        name: "",
        age: "",
        gender: "",
        location: "",
        bloodGroup: "",
        height: "",
        weight: "",
        history: [
          {
            pharmacy: "",
            physician: "",
            event: "",
            prescription: "",
            remedies: "",
          },
        ],
        reports: [
          {
            doctor: "",
            referredTo: "",
            type: "",
            comments: "",
            date: "",
          },
        ],
      });
      setFiles([]);
    } catch (error) {
      console.error("Error adding patient: ", error);
    }
  };  

  return (
    <>
    <Header/>
      <section className="space-y-10 lg:px-32 px-6 h-screen pt-32 ">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2 text-black/80">
            Electronic Health Records
          </h1>
          <p className="tracking-wide text-gray-600 lg:w-[50%]">
            Manage the electronic health records of patients efficiently.
          </p>
        </div>
        <div>
          <div className="flex lg:flex-row flex-col justify-between lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-black/80 mb-2">
                Patients
              </h2>
              <p className="tracking-wide text-gray-600">
                A list of all the patients including their ID and name.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-400 text-white px-8 py-2 rounded-lg lg:my-0 my-6 font-semibold"
            >
              Add patient
            </button>
            <Transition appear show={isOpen}>
              <Dialog
                as="div"
                className="relative z-50 focus:outline-none"
                onClose={() => setIsOpen(false)}
              >
                <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/40">
                  <div className="flex min-h-full items-center justify-center lg:py-10">
                    <TransitionChild
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 transform-[scale(95%)]"
                      enterTo="opacity-100 transform-[scale(100%)]"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 transform-[scale(100%)]"
                      leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                      <DialogPanel className="w-full max-w-4xl lg:rounded-xl rounded-none bg-white lg:p-10 p-6 backdrop-blur-2xl">
                        <form onSubmit={handleSubmit} className="space-y-10">
                          <div>
                            <h1 className="font-semibold text-xl">
                              General details
                            </h1>
                            <div className="lg:grid flex flex-col grid-cols-12 gap-6 py-3">
                              <div className="col-span-12">
                                <label
                                  htmlFor="name"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="age"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Age
                                </label>
                                <input
                                  type="number"
                                  name="age"
                                  id="age"
                                  value={formData.age}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="gender"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Gender
                                </label>
                                <select
                                  name="gender"
                                  id="gender"
                                  value={formData.gender}
                                  onChange={handleChange}
                                  className="block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="location"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Location
                                </label>
                                <input
                                  type="text"
                                  name="location"
                                  id="location"
                                  value={formData.location}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="bloodGroup"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Blood Group
                                </label>
                                <select
                                  name="bloodGroup"
                                  id="bloodGroup"
                                  value={formData.bloodGroup}
                                  onChange={handleChange}
                                  className="block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                >
                                  <option value="">Select Blood Group</option>
                                  <option value="A+">A+</option>
                                  <option value="A-">A-</option>
                                  <option value="B+">B+</option>
                                  <option value="B-">B-</option>
                                  <option value="AB+">AB+</option>
                                  <option value="AB-">AB-</option>
                                  <option value="O+">O+</option>
                                  <option value="O-">O-</option>
                                </select>
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="height"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Height (in cms.)
                                </label>
                                <input
                                  type="number"
                                  name="height"
                                  id="height"
                                  value={formData.height}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="weight"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Weight (in kg.)
                                </label>
                                <input
                                  type="number"
                                  name="weight"
                                  id="weight"
                                  value={formData.weight}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-10" >
                            <div className="flex items-center justify-between gap-2">
                              <h1 className="font-semibold text-xl">
                                Medical History
                              </h1>
                              <button
                                type="button"
                                onClick={() => addArrayField("history")}
                                className="lg:block hidden bg-primary text-white font-semibold lg:px-8 px-4 py-2 rounded-lg lg:text-sm lg:w-fit w-full"
                              >
                                Add History Entry
                              </button>
                              <button
                                type="button"
                                onClick={() => addArrayField("history")}
                                className="lg:hidden bg-primary text-white font-semibold lg:px-8 p-2 rounded-full lg:text-sm"
                              >
                                <CirclePlusIcon size={18} />
                              </button>
                            </div>
                            <div className="space-y-10 py-2">
                              {formData.history.map((entry, index) => (
                                <div
                                  key={index}
                                  className="lg:grid flex flex-col grid-cols-12 gap-6"
                                >
                                  <div className="col-span-12">
                                    <h1 className="font-semibold text-lg pb-4 text-center">
                                      Medical History {index + 1}
                                    </h1>
                                  </div>
                                  <div className="col-span-12">
                                    <label
                                      htmlFor={`pharmacy-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Pharmacy
                                    </label>
                                    <input
                                      type="text"
                                      name="pharmacy"
                                      id={`pharmacy-${index}`}
                                      value={entry.pharmacy}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "history")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`physician-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Physician
                                    </label>
                                    <input
                                      type="text"
                                      name="physician"
                                      id={`physician-${index}`}
                                      value={entry.physician}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "history")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`event-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Event
                                    </label>
                                    <input
                                      type="text"
                                      name="event"
                                      id={`event-${index}`}
                                      value={entry.event}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "history")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`prescription-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Prescription
                                    </label>
                                    <input
                                      type="text"
                                      name="prescription"
                                      id={`prescription-${index}`}
                                      value={entry.prescription}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "history")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`remedies-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Remedies
                                    </label>
                                    <input
                                      type="text"
                                      name="remedies"
                                      id={`remedies-${index}`}
                                      value={entry.remedies}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "history")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-12 flex justify-end lg:mt-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeArrayField(index, "history")
                                      }
                                      className="text-red-500 font-semibold lg:px-8 px-4 py-2 bg-rose-100 hover:bg-rose-200 transition duration-300 ease-in-out rounded-xl"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <h1 className="font-semibold text-xl">
                                Test Reports
                              </h1>
                              <button
                                type="button"
                                onClick={() => addArrayField("reports")}
                                className="lg:block hidden bg-primary text-white font-semibold lg:px-8 px-4 py-2 rounded-lg lg:text-sm lg:w-fit w-full"
                              >
                                Add Test Reports
                              </button>
                              <button
                                type="button"
                                onClick={() => addArrayField("reports")}
                                className="lg:hidden bg-primary text-white font-semibold lg:px-8 p-2 rounded-full lg:text-sm"
                              >
                                <CirclePlusIcon size={18} />
                              </button>
                            </div>
                            <div className="space-y-10 py-8">
                              {formData.reports.map((entry, index) => (
                                <div
                                  key={index}
                                  className="lg:grid flex flex-col grid-cols-12 gap-6"
                                >
                                  <div className="col-span-12">
                                    <h1 className="font-semibold text-lg pb-4 text-center">
                                      Test Report {index + 1}
                                    </h1>
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`doctor-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Doctor
                                    </label>
                                    <input
                                      type="text"
                                      name="doctor"
                                      id={`doctor-${index}`}
                                      value={entry.doctor}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "reports")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`referredTo-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Referred to
                                    </label>
                                    <input
                                      type="text"
                                      name="referredTo"
                                      id={`referredTo-${index}`}
                                      value={entry.referredTo}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "reports")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`type-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Type
                                    </label>
                                    <input
                                      type="text"
                                      name="type"
                                      id={`type-${index}`}
                                      value={entry.type}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "reports")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>
                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`comments-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Comments
                                    </label>
                                    <input
                                      type="text"
                                      name="comments"
                                      id={`comments-${index}`}
                                      value={entry.comments}
                                      onChange={(e) =>
                                        handleArrayChange(e, index, "reports")
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>

                                  <div className="col-span-6">
                                    <label
                                      htmlFor={`file-upload-${index}`}
                                      className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                    >
                                      Upload files
                                    </label>
                                    <input
                                      type="file"
                                      name={`file-upload-${index}`}
                                      id={`file-upload-${index}`}
                                      accept=".jpg,.jpeg,.png,.pdf"
                                      multiple
                                      onChange={(e) =>
                                        handleFileChange(e, index)
                                      }
                                      className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                    />
                                  </div>

                                  <div className="col-span-12 flex justify-end lg:mt-10">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeArrayField(index, "reports")
                                      }
                                      className="text-red-500 font-semibold lg:px-8 px-4 py-2 bg-rose-100 hover:bg-rose-200 transition duration-300 ease-in-out rounded-xl"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => setIsOpen(false)}
                              className="bg-gray-200 px-4 py-2 rounded-lg font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-primary text-white px-4 py-2 rounded-lg font-semibold"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="shadow ring-1 ring-black ring-opacity-5 overflow-x-auto rounded-lg mt-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Age
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="2" className="text-center py-6">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                          {patient.id}
                        </td>
                        <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {patient.name}
                        </td>
                        <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {patient.age}
                        </td>
                        <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {patient.gender}
                        </td>
                        <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <Link
                            href={`patient/${patient.id}`}
                            className="font-bold text-primary"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
}
