import { gql, useMutation } from "@apollo/client";

interface EntryProp {
  name: string;
  usn: string;
  dept: string;
  status: boolean;
  id: string;
}

const TOGGLE_STATUS = gql`
  mutation Toggle($id: ID!) {
    toggle(id: $id) {
      isPresent
    }
  }
`;

const Entry = ({ name, usn, dept, status, id }: EntryProp) => {
  const [toggle] = useMutation(TOGGLE_STATUS, {
    update(cache, { data: { toggle } }) {
      cache.modify({
        id: cache.identify({ __typename: "Participant", id }),
        fields: {
          isPresent() {
            return toggle.isPresent;
          },
        },
      });
    },
  });
  const handleToggle = (id: string) => {
    toggle({ variables: { id } })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <tr className="">
      <td className="border border-gray-300 px-4 py-2">{name}</td>
      <td className="border border-gray-300 px-4 py-2">{usn}</td>
      <td className="border border-gray-300 px-4 py-2">{dept}</td>
      <td className="border border-gray-300 px-4 py-2">
        <button
          onClick={() => handleToggle(id)}
          className={`${
            status ? "bg-green" : "bg-red"
          } px-4 py-2 text-black rounded-xl font-semibold w-full`}
        >
          {status ? "Present" : "Absent"}
        </button>
      </td>
    </tr>
  );
};

export default Entry;
