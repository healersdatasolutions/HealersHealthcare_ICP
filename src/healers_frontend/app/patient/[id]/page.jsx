"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../../../lib/firebase";
// import { useParams } from "next/navigation";
import { useParams } from "react-router-dom";
import datareports from "../../../public/datareports.svg";
import injured from "../../../public/injured.svg";
import Image from "next/image";
import PdfViewer from "./components/PdfViewer";
import Header from "../../../components/Header";

export default function Patient() {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  let [isOpenHistory, setIsOpenHistory] = useState(false);
  let [isOpenReports, setIsOpenReports] = useState(false);
  let [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (id) {
      // console.log("id", id);
      const fetchPatient = async () => {
        try {
          const patientRef = doc(db, "patients", id);
          const patientSnap = await getDoc(patientRef);
          if (patientSnap.exists()) {
            setPatient(patientSnap.data());
            console.log(patientSnap.data())
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching patient: ", error);
        } finally {
          setIsLoading(false);
          console.log("Patient fetched successfully");
        }
      };

      fetchPatient();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>No patient found.</div>;
  }

  const sections = [
    {
      src: datareports,
      alt: "Medical History",
      title: "Medical History",
      link: "/",
      action: () => setIsOpenHistory(true),
    },
    {
      src: injured,
      alt: "Test reports",
      title: "Test reports",
      link: "/",
      action: () => setIsOpenReports(true),
    },
  ];

  const openDialog = (fileUrl) => {
    setSelectedFile(fileUrl);
    setIsOpenReports(true);
  };

  const closeDialog = () => {
    setIsOpenReports(false);
    setSelectedFile(null);
  };

  return (
    <>
    <Header/>
      <section className="lg:py-24 py-10">
        <div className="max-w-6xl mx-auto lg:px-10 p-0">
          <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-20 gap-10 py-10 lg:bg-none bg-gradient-to-b from-secondary/60 to-[#e7dff6]">
            <div className="">
              <img
                width={500}
                height={500}
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={patient.name}
                className="flex-shrink-0 lg:w-64 lg:h-64 w-44 h-44 object-cover rounded-full ring-2 ring-primary"
              />
            </div>
            <div className="space-y-6">
              <h1 className="font-bold tracking-wider lg:text-2xl text-xl uppercase">
                Patients details
              </h1>
              <div className="flex lg:flex-row flex-col lg:gap-10 gap-3">
                <div className="space-y-3">
                  <div className="font-semibold">
                    <strong className="pe-4 text-center font-medium text-gray-700 uppercase tracking-wider">
                      Name:
                    </strong>
                    {patient.name}
                  </div>
                  <div className="font-semibold">
                    <strong className="pe-4 text-center font-medium text-gray-700 uppercase tracking-wider">
                      Age:
                    </strong>
                    {patient.age}
                  </div>
                  <div className="font-semibold">
                    <strong className="pe-4 text-center font-medium text-gray-700 uppercase tracking-wider">
                      Gender:
                    </strong>
                    {patient.gender}
                  </div>
                  <div className="font-semibold">
                    <strong className="pe-4 text-center font-medium text-gray-700 uppercase tracking-wider">
                      Location:
                    </strong>
                    {patient.location}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="font-semibold">
                    <strong className="pe-4 text-center font-medium text-gray-700 uppercase tracking-wider">
                      Blood group:
                    </strong>
                    {patient.bloodGroup}
                  </div>
                  <div className="font-semibold">
                    <strong className="pe-4 text-center font-medium text-gray-700 uppercase tracking-wider">
                      Height:
                    </strong>
                    {patient.height} cm
                  </div>
                  <div className="font-semibold">
                    <strong className="pe-4 text-center font-medium text-gray-700 uppercase tracking-wider">
                      Weight:
                    </strong>
                    {patient.weight} kg
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-center justify-between gap-10 p-6 text-center">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={section.action}
                className="hover:bg-primary/20 bg-gradient-to-b from-secondary/60 to-[#e7dff6] hover:-translate-y-2 lg:px-20 px-6 py-10 rounded-xl shadow-sm transition duration-300 ease-in-out"
              >
                <Image
                  src={section.src}
                  width={500}
                  height={500}
                  alt={section.alt}
                  className="lg:w-56 lg:h-56 w-48 h-48 object-contain mx-auto rounded-xl"
                />
                <h1 className="lg:text-2xl text-xl font-medium tracking-tight mt-10">
                  {section.title}
                </h1>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum.
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Transition appear show={isOpenHistory}>
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none"
          onClose={() => setIsOpenHistory(false)}
        >
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/40">
            <div className="flex min-h-full items-center justify-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-4xl bg-gray-50 p-6 pt-4 rounded-xl">
                  <div className="space-y-6">
                    <h1 className="font-bold text-xl tracking-wider text-center uppercase">
                      Medical History
                    </h1>
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : (
                      <>
                        <div className="shadow ring-1 ring-black ring-opacity-5 overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-200">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                                >
                                  ID
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                                >
                                  Pharmacy
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                                >
                                  Physician
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                                >
                                  Event
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                                >
                                  Prescription
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                                >
                                  Remedies
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-gray-100 divide-y divide-gray-200">
                              {isLoading ? (
                                <tr>
                                  <td colSpan="2" className="text-center py-6">
                                    Loading...
                                  </td>
                                </tr>
                              ) : (
                                patient.history.map((item, index) => (
                                  <tr key={index} className="text-center">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {item.pharmacy}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {item.physician}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {item.event}
                                    </td>
                                    <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {item.prescription}
                                    </td>
                                    <td className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {item.remedies}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isOpenReports}>
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none"
          onClose={closeDialog}
        >
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/40">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-4xl rounded-xl bg-white lg:p-10 p-6 backdrop-blur-2xl">
                  <div className="space-y-6">
                    <h1 className="font-bold text-xl tracking-wider text-center uppercase">
                      Test Reports
                    </h1>
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : (
                      <>
                        <div className="space-y-10">
                          {patient.reports.map((item, index) => (
                            <div
                              key={index}
                              className="rounded-xl shadow ring-black/10"
                            >
                              <h1 className="font-bold lg:text-xl tracking-wider uppercase">
                                Test report {index + 1}
                              </h1>
                              <div className="font-medium tracking-wider text-gray-600 lg:text-base text-sm">
                                <strong className="uppercase pe-2">
                                  Doctor:
                                </strong>
                                {item.doctor}
                              </div>
                              <div className="font-medium tracking-wider text-gray-600 lg:text-base text-sm">
                                <strong className="uppercase pe-2">
                                  Referred to:
                                </strong>
                                {item.referredTo}
                              </div>
                              <div className="mt-6">
                                <p className="text-center font-bold lg:text-lg tracking-wider uppercase">
                                  {item.type}
                                </p>
                                <p className="text-center font-medium tracking-wider text-gray-600 lg:text-base text-sm">
                                  {item.comments}
                                </p>
                              </div>
                              <div className="mt-6">
                                {item.fileUrl ? (
                                  <PdfViewer fileUrl={item.fileUrl} />
                                ) : (
                                  <div className="text-center text-red-500">
                                    No PDF available
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
