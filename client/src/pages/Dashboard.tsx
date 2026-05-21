import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  FaBell,
  FaMoon,
  FaSun,
  FaUsers,
  FaUserCheck,
  FaChartLine,
  FaDownload,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

function Dashboard() {

  /*
  =========================
  STATES
  =========================
  */

  const [darkMode, setDarkMode] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [leads, setLeads] =
    useState<any[]>([]);

  /*
  =========================
  PAGINATION STATES
  =========================
  */

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  /*
  =========================
  SEARCH STATES
  =========================
  */

  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  /*
  =========================
  FILTER STATES
  =========================
  */

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sourceFilter, setSourceFilter] =
    useState("All");

  const [sortOrder, setSortOrder] =
    useState("Newest");

  /*
  =========================
  CREATE STATES
  =========================
  */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [status, setStatus] =
    useState("New");

  const [source, setSource] =
    useState("Website");

  /*
  =========================
  EDIT STATES
  =========================
  */

  const [editId, setEditId] =
    useState("");

  const [editName, setEditName] =
    useState("");

  const [editEmail, setEditEmail] =
    useState("");

  /*
  =========================
  FETCH LEADS
  =========================
  */

  const fetchLeads = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      /*
      =========================
      PAGINATION API
      =========================
      */

      const res = await axios.get(
        `http://localhost:5000/api/leads?page=${currentPage}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      /*
      =========================
      SET LEADS
      =========================
      */

      setLeads(
        res.data.leads
      );

      /*
      =========================
      SET TOTAL PAGES
      =========================
      */

      setTotalPages(
        res.data.totalPages
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch leads"
      );

    } finally {

      setLoading(false);
    }
  };

  /*
  =========================
  AUTO FETCH
  =========================
  */

  useEffect(() => {

    fetchLeads();

  }, [currentPage]);

  /*
  =========================
  DEBOUNCED SEARCH
  =========================
  */

  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search);

    }, 500);

    return () =>
      clearTimeout(timer);

  }, [search]);

  /*
  =========================
  CREATE LEAD
  =========================
  */

  const createLead = async () => {

    if (!name || !email) {

      toast.error(
        "Fill all fields"
      );

      return;
    }

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/leads",
        {
          name,
          email,
          status,
          source,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Lead Created"
      );

      setName("");
      setEmail("");

      fetchLeads();

    } catch (error) {

      toast.error(
        "Lead creation failed"
      );
    }
  };

  /*
  =========================
  DELETE LEAD
  =========================
  */

  const deleteLead = async (
    id: string
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/leads/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Lead Deleted"
      );

      fetchLeads();

    } catch (error) {

      toast.error(
        "Delete failed"
      );
    }
  };

  /*
  =========================
  UPDATE LEAD
  =========================
  */

  const updateLead = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/leads/${editId}`,
        {
          name: editName,
          email: editEmail,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Lead Updated"
      );

      setEditId("");

      fetchLeads();

    } catch (error) {

      toast.error(
        "Update failed"
      );
    }
  };

  /*
  =========================
  EXPORT CSV
  =========================
  */

  const exportCSV = () => {

    const headers = [
      "Name",
      "Email",
      "Status",
      "Source",
    ];

    const rows = filteredLeads.map(
      (lead) => [
        lead.name,
        lead.email,
        lead.status,
        lead.source,
      ]
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((e) =>
        e.join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const link =
      document.createElement("a");

    const url =
      URL.createObjectURL(blob);

    link.setAttribute(
      "href",
      url
    );

    link.setAttribute(
      "download",
      "leads.csv"
    );

    document.body.appendChild(
      link
    );

    link.click();

    toast.success(
      "CSV Exported"
    );
  };

  /*
  =========================
  LOGOUT
  =========================
  */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href = "/";
  };

  /*
  =========================
  STATUS COLORS
  =========================
  */

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "New":
        return "bg-blue-100 text-blue-700";

      case "Qualified":
        return "bg-green-100 text-green-700";

      case "Contacted":
        return "bg-yellow-100 text-yellow-700";

      case "Lost":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /*
  =========================
  FILTERS
  =========================
  */

  const filteredLeads = leads
    .filter((lead) =>
      lead.name
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
    )
    .filter((lead) =>
      statusFilter === "All"
        ? true
        : lead.status ===
          statusFilter
    )
    .filter((lead) =>
      sourceFilter === "All"
        ? true
        : lead.source ===
          sourceFilter
    );

  /*
  =========================
  CHART DATA
  =========================
  */

  const chartData = [
    {
      month: "Jan",
      leads: 30,
      qualified: 18,
    },
    {
      month: "Feb",
      leads: 45,
      qualified: 28,
    },
    {
      month: "Mar",
      leads: 60,
      qualified: 40,
    },
    {
      month: "Apr",
      leads: 80,
      qualified: 52,
    },
    {
      month: "May",
      leads: 95,
      qualified: 68,
    },
    {
      month: "Jun",
      leads: 120,
      qualified: 85,
    },
  ];

  return (

    <div className={`min-h-screen flex ${
      darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
    }`}>

      {/* SIDEBAR */}

      <div className={`w-72 p-8 ${
        darkMode
          ? "bg-gray-950"
          : "bg-blue-700"
      } text-white min-h-screen`}>

        <h1 className="text-4xl font-bold mb-12">
          Smart CRM
        </h1>

        <ul className="space-y-8 text-xl">

          <li className="font-semibold">
            Dashboard
          </li>

          <li>
            Leads
          </li>

          <li>
            Analytics
          </li>

          <li>
            Settings
          </li>

        </ul>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-10">

        {/* TOPBAR */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Smart Leads Dashboard
            </h1>

            <p className={`mt-3 text-lg ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}>
              Manage your leads professionally
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className="bg-white shadow-lg p-4 rounded-full text-black"
            >

              {darkMode
                ? <FaSun />
                : <FaMoon />}

            </button>

            <button className="bg-white shadow-lg p-4 rounded-full text-black relative">

              <FaBell />

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                2
              </span>

            </button>

            <button
              onClick={exportCSV}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >

              <FaDownload />

              Export

            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl"
            >
              Logout
            </button>

          </div>

        </div>

        {/* KPI CARDS */}

        <div className="grid md:grid-cols-3 gap-8 mb-10">

          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Leads
                </p>

                <h2 className="text-5xl font-bold mt-3 text-black">
                  {leads.length}
                </h2>

              </div>

              <FaUsers className="text-5xl text-blue-500" />

            </div>

          </div>

          <div className="bg-green-50 rounded-3xl shadow-2xl p-8">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Qualified
                </p>

                <h2 className="text-5xl font-bold mt-3 text-black">

                  {
                    leads.filter(
                      (lead) =>
                        lead.status ===
                        "Qualified"
                    ).length
                  }

                </h2>

              </div>

              <FaUserCheck className="text-5xl text-green-500" />

            </div>

          </div>

          <div className="bg-purple-50 rounded-3xl shadow-2xl p-8">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Conversion
                </p>

                <h2 className="text-5xl font-bold mt-3 text-black">
                  78%
                </h2>

              </div>

              <FaChartLine className="text-5xl text-purple-500" />

            </div>

          </div>

        </div>

        {/* CREATE LEAD */}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10">

          <h2 className="text-4xl font-bold mb-8 text-black">
            Create Lead
          </h2>

          <div className="grid md:grid-cols-5 gap-4">

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            >

              <option>
                New
              </option>

              <option>
                Qualified
              </option>

              <option>
                Contacted
              </option>

              <option>
                Lost
              </option>

            </select>

            <select
              value={source}
              onChange={(e) =>
                setSource(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            >

              <option>
                Website
              </option>

              <option>
                Instagram
              </option>

              <option>
                Referral
              </option>

            </select>

            <button
              onClick={createLead}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
            >
              Create
            </button>

          </div>

        </div>

        {/* FILTERS */}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Search Leads"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            >

              <option>
                All
              </option>

              <option>
                New
              </option>

              <option>
                Qualified
              </option>

              <option>
                Contacted
              </option>

              <option>
                Lost
              </option>

            </select>

            <select
              value={sourceFilter}
              onChange={(e) =>
                setSourceFilter(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            >

              <option>
                All
              </option>

              <option>
                Website
              </option>

              <option>
                Instagram
              </option>

              <option>
                Referral
              </option>

            </select>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl text-black"
            >

              <option>
                Newest
              </option>

              <option>
                Oldest
              </option>

            </select>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-4xl font-bold text-black">
              Leads
            </h2>

            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
              Total: {filteredLeads.length}
            </span>

          </div>

          {
            loading ? (

              <div className="text-center py-20 text-2xl text-black">
                Loading...
              </div>

            ) : filteredLeads.length === 0 ? (

              <div className="text-center py-20 text-gray-500 text-2xl">
                No Leads Found
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-gray-100 text-black">

                      <th className="p-5 text-left">
                        Name
                      </th>

                      <th className="p-5 text-left">
                        Email
                      </th>

                      <th className="p-5 text-left">
                        Status
                      </th>

                      <th className="p-5 text-left">
                        Source
                      </th>

                      <th className="p-5 text-left">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredLeads.map(
                        (lead) => (

                          <tr
                            key={lead._id}
                            className="border-b"
                          >

                            <td className="p-5 text-black">

                              {
                                editId ===
                                lead._id ? (

                                  <input
                                    value={editName}
                                    onChange={(e) =>
                                      setEditName(
                                        e.target.value
                                      )
                                    }
                                    className="border p-2 rounded"
                                  />

                                ) : (
                                  lead.name
                                )
                              }

                            </td>

                            <td className="p-5 text-black">

                              {
                                editId ===
                                lead._id ? (

                                  <input
                                    value={editEmail}
                                    onChange={(e) =>
                                      setEditEmail(
                                        e.target.value
                                      )
                                    }
                                    className="border p-2 rounded"
                                  />

                                ) : (
                                  lead.email
                                )
                              }

                            </td>

                            <td className="p-5">

                              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                lead.status
                              )}`}>
                                {lead.status}
                              </span>

                            </td>

                            <td className="p-5 text-black">
                              {lead.source}
                            </td>

                            <td className="p-5">

                              {
                                editId ===
                                lead._id ? (

                                  <button
                                    onClick={
                                      updateLead
                                    }
                                    className="bg-green-500 text-white px-4 py-2 rounded-xl"
                                  >
                                    Save
                                  </button>

                                ) : (

                                  <div className="flex gap-3">

                                    <button
                                      onClick={() => {

                                        setEditId(
                                          lead._id
                                        );

                                        setEditName(
                                          lead.name
                                        );

                                        setEditEmail(
                                          lead.email
                                        );
                                      }}
                                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                                    >

                                      <FaEdit />

                                      Edit

                                    </button>

                                    <button
                                      onClick={() =>
                                        deleteLead(
                                          lead._id
                                        )
                                      }
                                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                                    >

                                      <FaTrash />

                                      Delete

                                    </button>

                                  </div>

                                )
                              }

                            </td>

                          </tr>
                        )
                      )
                    }

                  </tbody>

                </table>

                {/* PAGINATION */}

                <div className="flex justify-center items-center gap-4 mt-8">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(
                        currentPage - 1
                      )
                    }
                    className="bg-gray-200 px-5 py-2 rounded-xl disabled:opacity-50 text-black"
                  >
                    Previous
                  </button>

                  <span className="font-semibold text-lg text-black">

                    Page {currentPage} of {totalPages}

                  </span>

                  <button
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        currentPage + 1
                      )
                    }
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl disabled:opacity-50"
                  >
                    Next
                  </button>

                </div>

              </div>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;