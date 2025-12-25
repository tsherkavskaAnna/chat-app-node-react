import { useActionState, useState } from 'react';
import useContactsStore from '../store/contactsStore';
import { Modal } from '../UI-Component/Modal';
import { createNewContact } from '../actions/contactsActions';

export default function AddNewContact() {
  const [state] = useActionState(createNewContact, null);
  const { addContact, loading } = useContactsStore();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await addContact(formData);
    setShowModal(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-10 h-10 rounded-full bg-slate-300 text-indigo-500 cursor-pointer hover:bg-slate-400/30"
      >
        +
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold mb-12 text-center text-slate-800">
          Add new contact
        </h2>
        <form
          className="flex flex-col gap-2.5 mt-4 py-2"
          onSubmit={handleSubmit}
        >
          <input
            name="fullName"
            className="w-full outline-none bg-indigo-500/10 py-2.5 px-3 text-gray-600 rounded"
            type="text"
            placeholder="Full Name"
            required
          />
          <input
            name="username"
            className="w-full outline-none bg-indigo-500/10 py-2.5 px-3 text-gray-600 rounded"
            type="text"
            placeholder="Username"
            required
          />
          <input
            name="email"
            className="w-full outline-none bg-indigo-500/10 py-2.5 px-3 text-gray-600 rounded"
            type="email"
            placeholder="Email"
            required
          />

          <div className="grid grid-cols-2 gap-4 mt-7">
            <button
              className="px-4 py-2 border border-slate-400 rounded text-slate-500 cursor-pointer hover:bg-slate-400/30"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded cursor-pointer hover:bg-indigo-600 border-none">
              {loading ? 'Loading...' : 'Save'}
            </button>
            <div className="grid col-span-2">
              {state?.message && (
                <p className="text-green-500">{state.message}</p>
              )}
              {state?.error && <p className="text-red-500">{state.error}</p>}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
