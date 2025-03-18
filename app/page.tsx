"use client";

import EntryTable from "@/components/EntryTable";
import Spinner from "@/components/Spinner";
import { depts } from "@/lib/data";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { FormEvent, useState } from "react";

const GET_PARTICIPANTS = gql`
  query Participants {
    participants {
      id
      dept
      email
      isPresent
      name
      phone
      usn
    }
  }
`;

const CREATE_PARTICIPANT = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $usn: String!
    $dept: String!
    $phone: String!
  ) {
    addStudent(
      name: $name
      email: $email
      usn: $usn
      dept: $dept
      phone: $phone
    ) {
      id
      name
      phone
      usn
      isPresent
      email
      dept
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PARTICIPANTS);
  const [addStudent, { loading: studentLoading }] = useMutation(
    CREATE_PARTICIPANT,
    { refetchQueries: [{ query: GET_PARTICIPANTS }] }
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usn, setUsn] = useState("");
  const [dept, setDept] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addStudent({
      variables: {
        name,
        email,
        phone,
        usn,
        dept,
      },
    })
      .then((res) => {
        console.log("Participant added: ", res.data.addStudent);
        setName("");
        setEmail("");
        setPhone("");
        setUsn("");
        setDept("");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  if (loading || studentLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <h1 className="text-xl">
        Error: <span className="text-red">{error.message}</span>
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full py-10 px-4">
      <h1 className="text-3xl md:text-5xl">
        Peer{" "}
        <span className="bg-yellow text-bg px-2 py-1 rounded-2xl">
          Learning
        </span>
      </h1>
      <p className="mt-6 font-mono text-xl">
        Manage Attendance for the session
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-blue px-6 py-3 rounded-2xl mt-14 w-full flex flex-col items-center justify-center"
      >
        <div className="w-full flex justify-between gap-4">
          <input
            className="bg-bg/40 rounded-xl px-4 py-2 w-full outline-none"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            id="name"
            required
          />
          <input
            className="bg-bg/40 rounded-xl px-4 py-2 w-full outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="email"
            required
          />
          <input
            className="bg-bg/40 rounded-xl px-4 py-2 w-full outline-none"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            id="phone"
            required
          />
          <input
            className="bg-bg/40 rounded-xl px-4 py-2 w-full outline-none"
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            placeholder="USN"
            id="usn"
            required
          />
          <select
            className="bg-bg/40 rounded-xl px-4 py-2 w-full outline-none"
            id="dept"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            required
          >
            <option value="">Select a department</option>
            {depts.data.map((dept, idx) => (
              <option key={idx} value={dept} className="bg-blue">
                {dept}
              </option>
            ))}
          </select>
        </div>
        <button className="mt-4 px-4 py-2 rounded-xl bg-green text-black text-xl">
          Submit
        </button>
      </form>

      <div className="w-full mt-8">
        <EntryTable participants={data.participants} />
      </div>
    </div>
  );
}
