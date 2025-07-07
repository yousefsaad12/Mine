import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateOrderCounts, setDateOrderCounts] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);

  const loadAvailableDates = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(
        backendUrl + "/api/order/available-dates",
        { headers: { token } }
      );

      if (response.data.success) {
        setAvailableDates(response.data.availableDates);
        // Load order counts for each date
        await loadDateOrderCounts(response.data.availableDates);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadDateOrderCounts = async (dates) => {
    const counts = {};
    for (const date of dates) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/list?date=${date}`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          counts[date] = response.data.orders.length;
        }
      } catch (error) {
        counts[date] = 0;
      }
    }
    setDateOrderCounts(counts);
  };

  const loadOrderData = async (date = null) => {
    if (!token) {
      return null;
    }

    try {
      let url = backendUrl + "/api/order/list";
      
      // Add date parameter to URL if provided
      if (date) {
        url += `?date=${date}`;
      }

      const response = await axios.post(url, {}, { headers: { token } });

      console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
        setTotalAmount(response.data.totalAmount);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    
    // Check if the selected date is available
    if (date && !availableDates.includes(date)) {
      toast.warning("No orders found for this date. Please select an available date.");
      return;
    }
    
    setSelectedDate(date);
    
    // Only load data if a date is selected
    if (date) {
      loadOrderData(date);
    } else {
      // If no date selected, load last day with orders
      loadOrderData();
    }
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    
    if (value === "today") {
      // Get today's date in local timezone (not UTC)
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const today = `${year}-${month}-${day}`;
      
      setSelectedDate(today);
      loadOrderData(today);
    } else if (value === "last-day") {
      loadLastDayOrders();
    } else if (value === "custom") {
      setShowCalendar(true);
    } else if (value) {
      setSelectedDate(value);
      loadOrderData(value);
    }
  };

  const loadTodayOrders = () => {
    // Get today's date in local timezone (not UTC)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    
    console.log("Today's date (local):", today);
    console.log("Today's date (formatted):", now.toLocaleDateString());
    
    setSelectedDate(today);
    loadOrderData(today);
  };

  const loadLastDayOrders = () => {
    setSelectedDate("");
    loadOrderData();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCurrentDateInfo = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const isoDate = `${year}-${month}-${day}`;
    const localDate = now.toLocaleDateString();
    return { isoDate, localDate };
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        // Reload orders with current date filter
        loadOrderData(selectedDate || null);
      }
    } catch (error) {
      toast.error(response.data.message);
    }
  };

  // Delete order handler
  const deleteOrderHandler = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/delete",
        { orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order deleted successfully");
        loadOrderData(selectedDate || null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadAvailableDates();
    loadOrderData();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>

                  {/* Date Filter Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Date Dropdown */}
          <div className="flex items-center gap-3">
            <label htmlFor="dateDropdown" className="font-medium text-gray-700">
              Filter Orders:
            </label>
            <select
              id="dateDropdown"
              value={selectedDate || "last-day"}
              onChange={handleDropdownChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[180px]"
            >
              <option value="last-day">Last Day with Orders</option>
              <option value="today">Today's Orders</option>
              <option value="custom">Custom Date...</option>
              {availableDates.slice(0, 8).map((date) => (
                <option key={date} value={date}>
                  {formatDate(date)} ({dateOrderCounts[date] || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Buttons */}
          <div className="flex gap-2">
            <button
              onClick={loadTodayOrders}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium cursor-pointer"
            >
              Today
            </button>
            
            <button
              onClick={loadLastDayOrders}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
            >
              Last Day
            </button>
          </div>

          {/* Available Dates Count */}
          {availableDates.length > 0 && (
            <div className="text-sm text-gray-500">
              {availableDates.length} date{availableDates.length !== 1 ? 's' : ''} available
            </div>
          )}
          
          {/* Debug Info */}
          <div className="text-xs text-gray-400">
            Today: {getCurrentDateInfo().localDate} ({getCurrentDateInfo().isoDate})
          </div>
        </div>

        {/* Calendar (shown when custom is selected) */}
        {showCalendar && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Select Date:</span>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={availableDates.length > 0 ? availableDates[availableDates.length - 1] : undefined}
              max={availableDates.length > 0 ? availableDates[0] : undefined}
            />
          </div>
        )}
      </div>
      
      {/* Status Display */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {selectedDate ? (
              <p>
                Showing orders for:{" "}
                <span className="font-semibold text-gray-800">
                  {new Date(selectedDate).toLocaleDateString()} ({selectedDate})
                </span>
              </p>
            ) : (
              <p>Showing orders from the last day with orders</p>
            )}
          </div>
          
          {/* Total Amount Display */}
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Orders:</span> {orders.length}
            </div>
            <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              💰 Total: {currency} {totalAmount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div>
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No orders found for the selected date.</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              key={index}
            >
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  <p>Products Name : </p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity}
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity} ,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mv-2 font-medium">
                  Customer Name :{" "}
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div>
                  <p>
                    Address :{" "}
                    {order.address.street +
                      " , " +
                      order.address.city +
                      " , " +
                      order.address.state +
                      " , " +
                      order.address.country +
                      " , " +
                      order.address.zipCode}
                  </p>
                </div>
                <p>Phone : {order.address.phone}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">
                  Items : {order.items.length}
                </p>
                <p className="mt-3">Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {currency} {order.amount}
              </p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 font-semibold"
              >
                <option value="Order Placed"> Order Placed</option>
                <option value="Packing"> Packing</option>
                <option value="Shipped"> Shipped</option>
                <option value="Out for Delivery"> Out for Delivery</option>
                <option value="Delivered"> Delivered</option>
              </select>
              {/* Delete Order Button */}
              <button
                onClick={() => deleteOrderHandler(order._id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-full shadow-md hover:from-red-600 hover:to-red-800 hover:shadow-lg transition-all duration-150 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                title="Delete Order"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
