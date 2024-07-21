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
    // redirect("/path");
  };

  return (
    <div className="xs:w-full lg:w-1/2 pt-20 m-auto px-6">
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="username"
          >
            Your Name
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className=" border rounded w-full py-2 px-3"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Update
          </button>
          {!error && <p className="text-red-500">Error updating form!</p>}
        </div>
      </form>
    </div>
  );
};

export default NameInput;
