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
import Header from "../../components/Header";

export default function Appointments(props) {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentDetails = ref(db, "Patients");
        onValue(appointmentDetails, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const appointmentList = Object.entries(data).map(([id, value]) => ({
              id,
              ...value,
            }));

            setAppointments(appointmentList);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error fetching Doctors: ", error);
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsOpen(true);
  };

  return (
    <>
    <Header />
      <section className="space-y-6 lg:px-10 px-6 py-24">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Appointments
          </h1>
          <p className="text-gray-600 lg:w-[50%] tracking-wide">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
            accusantium rerum aut quasi temporibus ea recusandae eos blanditiis
            ducimus at repudiandae, cupiditate id odit exercitationem omnis,
            voluptatum explicabo ex alias?
          </p>
        </div>
        <div className="container mx-auto">
          <div className="shadow ring-1 ring-black ring-opacity-5 overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr className="w-full border-b border-gray-300">
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
                    #
                  </th>
                </tr>
              </thead>
              {isLoading && (
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading...
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {appointments?.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(appointment)}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition duration-300 ease-in-out"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {selectedAppointment && (
        <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={() => setIsOpen(false)}
          >
            <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/5">
              <div className="flex min-h-full items-center justify-center lg:py-10">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
                  <DialogPanel className="w-full max-w-4xl lg:rounded-xl rounded-none bg-white lg:p-10 p-6 backdrop-blur-2xl font-semibold">
                    <div className="flex items-center gap-6">
                      <div className="text-gray-500">
                        <h3 className="py-4">Name:</h3>
                        <h3 className="py-4">Age:</h3>
                        <h3 className="py-4">Doctor&apos;s Name:</h3>
                        <h3 className="py-4">Hospital&apos;s Name:</h3>
                        <h3 className="py-4">Illness:</h3>
                        <h3 className="py-4">Timing:</h3>
                      </div>
                      <div>
                        <h3 className="py-4">{selectedAppointment.name}</h3>
                        <h3 className="py-4">{selectedAppointment.age}</h3>
                        <h3 className="py-4">{selectedAppointment.docname}</h3>
                        <h3 className="py-4">{selectedAppointment.hosname}</h3>
                        <h3 className="py-4">{selectedAppointment.ill}</h3>
                        <h3 className="py-4">{selectedAppointment.time}</h3>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
