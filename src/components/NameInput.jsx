import { useActionState, useState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";
import { updateName } from "./actions";

const SubmitButton = () => {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
    >
      {"Update"}
    </button>
  );
};

const NameInput = () => {
  const [name, setName] = useState("");
  const [optimisticName, setOptimisticName] = useOptimistic(
    name,
    (currentState, optimisticValue) => {
      return optimisticValue + ' (updating...)'
    }
  );
  const [inputValue, setInputValue] = useState("");

  const [error, submitAction] = useActionState(
    async (_previousReturnValue, formData) => {
      const formName = formData.get("name");
      setOptimisticName(formName);
      try {
        const updatedName = await updateName(formName);
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
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        type="text"
        id="name"
        name="name"
        className="border rounded py-2 px-3"
      />
      <SubmitButton />
      {error && <p className="text-red-500">{error}</p>}
      <p>Updated name: {optimisticName}</p>
    </form>
  );
};

export default NameInput;
