import { Participant } from "@prisma/client";
import Entry from "./Entry";

interface EntryTableProps {
  participants: Participant[];
}

const EntryTable = ({ participants }: EntryTableProps) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="border border-gray-300 px-4 py-2">Idx</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">USN</th>
          <th className="border border-gray-300 px-4 py-2">Department</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((participant, idx) => (
          <Entry
            key={idx}
            name={participant.name}
            usn={participant.usn}
            dept={participant.dept}
            status={participant.isPresent}
            id={participant.id}
            idx={idx + 1}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EntryTable;
