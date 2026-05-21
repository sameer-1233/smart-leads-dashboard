import { useState } from "react";

interface Props {
  onCreate: (
    data: any
  ) => Promise<void>;
}

function LeadForm({
  onCreate,
}: Props) {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      status: "New",
      source: "Website",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await onCreate(formData);

    setFormData({
      name: "",
      email: "",
      status: "New",
      source: "Website",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        Create Lead
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded mt-4"
      >
        Create Lead
      </button>
    </form>
  );
}

export default LeadForm;