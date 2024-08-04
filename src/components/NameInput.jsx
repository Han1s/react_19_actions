import { useActionState, useState } from "react";
import { updateName } from "./actions";

const NameInput = () => {
  const [name, setName] = useState("");
  const [error, submitAction, isPending] = useActionState(
    async (_previousReturnValue, formData) => {
      try {
        const updatedName = await updateName(formData.get("name"));
        setName(updatedName);
        return null;
      } catch (error) {
        return error;
      }
    }
  );

  return (
    <form className="flex flex-col gap-4 w-96 m-auto" action={submitAction}>
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
        type="submit"
        disabled={isPending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
      >
        {isPending ? "Loading..." : "Update"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <p>Updated name: {name}</p>
    </form>
  );
};

export default NameInput;
