import React, { useState, useEffect } from "react";
import axios from "axios";
import Details from "../Details/Details";

function Table() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://react-task-ten-chi.vercel.app/customers");
        setCustomers(response.data);
        setFilteredData(response.data); // Initially, set filtered data to all customers
        setSelectedCustomer(response.data[0]); // Default to the first customer
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://react-task-ten-chi.vercel.app/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchCustomers();
    fetchTransactions();
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredData(
      customers.filter((item) => {
        const itemName = item.name.toLowerCase();
        const customerTransactions = transactions.filter(
          (trans) => trans.customer_id === item.id
        );

        // Check if customerTransactions array has any entries
        const hasTransactions = customerTransactions.length > 0;

        // Combine name and amounts from transactions (if any) for filtering
        const combinedData =
          item.name.toLowerCase() +
          " " +
          (hasTransactions
            ? customerTransactions.map((trans) => trans.amount).join(" ")
            : "");

        return combinedData.includes(term);
      })
    );
  };

  const handleDetailsClick = (customer) => {
    setSelectedCustomer(customer);
  };

  // Function to calculate total amount for a customer
  const calculateTotalAmount = (customerId) => {
    const customerTransactions = transactions.filter(
      (trans) => trans.customer_id === customerId
    );
    const totalAmount = customerTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    return totalAmount;
  };

  return (
    <div className="container mx-auto m-4 py-5 px-8 custom rounded-3xl">
      <div className="border-b-4 pb-4 border-white/50">
        <h2 className="text-5xl font-bold">Transactions</h2>
      </div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by name or amount"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Total Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.img} alt={`Avatar of ${item.name}`} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.country}</div>
                    </div>
                  </div>
                </td>
                <td>${calculateTotalAmount(item.id)}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleDetailsClick(item)}
                  >
                    details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCustomer && (
        <Details data={selectedCustomer} transactions={transactions} />
      )}
    </div>
  );
}

export default Table;
