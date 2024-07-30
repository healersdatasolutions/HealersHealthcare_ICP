"use client";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import Link from "next/link";
import { CirclePlusIcon } from "lucide-react";
import { addDoctor } from "../../lib/doctorOps";
import Header from "../../components/Header";

export default function Doctor(params) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorDetails = ref(db, "hospital_12345");
        onValue(doctorDetails, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const doctorList = Object.entries(data).map(([id, value]) => ({
              id,
              ...value,
            }));

            console.log(doctorList);

            const { id, ...doctorEntries } = doctorList[0];
            setDoctors(doctorEntries);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error fetching Doctors: ", error);
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  let [isOpen, setIsOpen] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  let [formData, setFormData] = useState({
    id: "",
    doctor_name: "",
    speciality: "",
    mobile_no: "",
    days: [],
    start_time: "",
    end_time: "",
    experience: "",
    qualification: "",
    opd_fees: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let updatedDays = [...formData.days];
      if (checked) {
        updatedDays.push(value);
      } else {
        updatedDays = updatedDays.filter((day) => day !== value);
      }
      setFormData({ ...formData, days: updatedDays });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoctor(formData);
    setIsOpen(false);
  };

  console.log(doctors);

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsOpenDetails(true);
  };

  return (
    <>
    <Header/>
      <section className="space-y-10 lg:px-10 px-6 py-24">
        <div>
          <div className="flex lg:flex-row flex-col justify-between lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-black/80 mb-2">
                Doctors
              </h2>
              <p className="tracking-wide text-gray-600">
                A list of all the doctors including their ID and name.
              </p>
            </div>
            <button
              onClick={() => {setIsOpen(true)}}
              className="bg-primary text-white px-8 py-2 rounded-lg lg:my-0 my-6 font-semibold"
            >
              Add Doctor
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
                              Doctor details
                            </h1>
                            <div className="lg:grid flex flex-col grid-cols-12 gap-6 py-8">
                              <div className="col-span-12">
                                <label
                                  htmlFor="id"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  ID
                                </label>
                                <input
                                  type="text"
                                  name="id"
                                  id="id"
                                  value={formData.id}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-12">
                                <label
                                  htmlFor="doctor_name"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="doctor_name"
                                  id="doctor_name"
                                  value={formData.doctor_name}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                  required
                                />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="experience"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Experience (in years)
                                </label>
                                <input
                                  type="number"
                                  name="experience"
                                  id="experience"
                                  value={formData.experience}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="speciality"
                                  className="block font-bold text-gray-600 uppercase tracking-wider text-sm"
                                >
                                  Speciality
                                </label>
                                <select
                                  name="speciality"
                                  id="speciality"
                                  value={formData.speciality}
                                  onChange={handleChange}
                                  className="block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                  required
                                >
                                  <option value="">Select Speciality</option>
                                  <option value="NEUROSURGEON">
                                    NEUROSURGEON
                                  </option>
                                  <option value="UROLOGIST">UROLOGIST</option>
                                  <option value="ENT">ENT</option>
                                  <option value="GYNECOLOGIST">
                                    GYNECOLOGIST
                                  </option>
                                  <option value="ORTHOPEDIC">ORTHOPEDIC</option>
                                  <option value="PEDIATRICIAN">
                                    PEDIATRICIAN
                                  </option>
                                  <option value="GEN.PHYSICIAN">
                                    GEN.PHYSICIAN
                                  </option>
                                  <option value="COSMETIC & PLASTIC SURGEON">
                                    COSMETIC & PLASTIC SURGEON
                                  </option>
                                </select>
                              </div>
                              <div className="col-span-12">
                                <label
                                  htmlFor="mobile_no"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  Mobile No.
                                </label>
                                <input
                                  type="text"
                                  name="mobile_no"
                                  id="mobile_no"
                                  value={formData.mobile_no}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-12">
                                <label
                                  htmlFor="days"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  Days
                                </label>
                                <div className="flex flex-wrap">
                                  {[
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                  ].map((day) => (
                                    <div key={day} className="mr-4 mb-2">
                                      <label className="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          name="days"
                                          value={day}
                                          checked={formData.days.includes(day)}
                                          onChange={handleChange}
                                          className="form-checkbox h-5 w-5 text-primary"
                                        />
                                        <span className="ml-2 text-gray-700">
                                          {day}
                                        </span>
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="start_time"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  Start Time
                                </label>
                                <input
                                  type="time"
                                  name="start_time"
                                  id="start_time"
                                  value={formData.start_time}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                  required
                                />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="end_time"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  End Time
                                </label>
                                <input
                                  type="time"
                                  name="end_time"
                                  id="end_time"
                                  value={formData.end_time}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                  required
                                />
                              </div>

                              <div className="col-span-12">
                                <label
                                  htmlFor="qualification"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  Qualification
                                </label>
                                <input
                                  type="text"
                                  name="qualification"
                                  id="qualification"
                                  value={formData.qualification}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                />
                              </div>
                              <div className="col-span-12">
                                <label
                                  htmlFor="opd_fees"
                                  className="block font-bold text-gray-600 tracking-wider text-sm uppercase"
                                >
                                  OPD Fees
                                </label>
                                <input
                                  type="text"
                                  name="opd_fees"
                                  id="opd_fees"
                                  value={formData.opd_fees}
                                  onChange={handleChange}
                                  className="px-2 block w-full border-b border-0 border-gray-500 bg-transparent shadow-sm focus:outline-none focus:ring-0"
                                  required
                                />
                              </div>
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
                    Object.values(doctors).map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                          {doctor.id}
                        </td>
                        <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doctor.doctor_name}
                        </td>
                        <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => openModal(doctor)}
                            className="font-bold text-primary"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {selectedDoctor && (
                <Transition appear show={isOpenDetails}>
                  <Dialog
                    as="div"
                    className="relative z-50 focus:outline-none"
                    onClose={() => setIsOpenDetails(false)}
                  >
                    <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/60">
                      <div className="flex min-h-full items-center justify-center lg:py-10">
                        <TransitionChild
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 transform-[scale(95%)]"
                          enterTo="opacity-100 transform-[scale(100%)]"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 transform-[scale(100%)]"
                          leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                          <DialogPanel className="w-full max-w-4xl rounded-none bg-white backdrop-blur-2xl font-semibold">
                            <table className="table-auto w-full">
                              <tbody>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    ID:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.id}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    Doctor&apos;s Name:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.doctor_name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    Speciality:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.speciality}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    Mobile Number:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.mobile_no}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    Days:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.days.join(", ")}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    Start Time:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.start_time}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    End Time:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.end_time}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    Experience:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.experience}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    Qualification:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.qualification}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-black/40 px-4 py-2">
                                    OPD Fees:
                                  </td>
                                  <td className="border border-black/40 px-4 py-2">
                                    {selectedDoctor.opd_fees}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </DialogPanel>
                        </TransitionChild>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
