import { useState } from "react";

const NameInput = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    // const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    }
  };

  return (
    <form className="flex flex-col gap-4 w-96 m-auto">
      <label className="text-gray-700" htmlFor="name">
        Your Name
      </label>
      <input
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
        Update
      </button>
      {error && <p className="text-red-500">Error updating form!</p>}
    </form>
  );
};

export default NameInput;
