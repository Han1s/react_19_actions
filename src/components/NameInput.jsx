import { useState, useTransition } from "react";
import { updateName } from "./actions";

const NameInput = () => {
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    setError(null);

    startTransition(async () => {
      try {
        const updatedName = await updateName(inputValue);
        setName(updatedName);
      } catch (error) {
        setError(error);
      }
    });
  };

  return (
    <form className="flex flex-col gap-4 w-96 m-auto">
      <label className="text-gray-700" htmlFor="name">
        Your Name
      </label>
      <input
        onChange={(event) => setInputValue(event.target.value)}
        type="text"
        id="name"
        name="name"
        className="border rounded py-2 px-3"
      />
      <button
        onClick={handleSubmit}
        type="button"
        disabled={isPending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
      >
        {isPending ? "Loading..." : "Update"}
      </button>
      {error && <p className="text-red-500">Error updating form!</p>}
      <p>Updated name: {name}</p>
    </form>
  );
};

export default NameInput;
