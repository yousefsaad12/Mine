import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Cash On Delivery",
      payment: false,
      date: Date.now(),
      phone: address.phone,
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Has Been Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const { date } = req.query; // Get date from query parameters

    let orders;
    let totalAmount = 0;
    
    if (date) {
      // If date is provided, get orders for that specific date
      // Create date in local timezone to avoid timezone issues
      const [year, month, day] = date.split('-').map(Number);
      const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
      
      orders = await orderModel.find({
        date: {
          $gte: startOfDay.getTime(),
          $lte: endOfDay.getTime()
        }
      });

      // Calculate total amount for the selected date
      totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    } else {
      // If no date provided, get the last day that has orders
      const lastOrder = await orderModel.findOne().sort({ date: -1 });
      
      if (!lastOrder) {
        return res.json({ success: true, orders: [], totalAmount: 0, message: "No orders found" });
      }
      
      // Get the date of the last order
      const lastOrderDate = new Date(lastOrder.date);
      const startOfLastDay = new Date(lastOrderDate);
      startOfLastDay.setHours(0, 0, 0, 0);
      
      const endOfLastDay = new Date(lastOrderDate);
      endOfLastDay.setHours(23, 59, 59, 999);
      
      orders = await orderModel.find({
        date: {
          $gte: startOfLastDay.getTime(),
          $lte: endOfLastDay.getTime()
        }
      });

      // Calculate total amount for the last day with orders
      totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    }

    res.json({ success: true, orders, totalAmount });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrderData = async (req, res) => {
  try {
    const { userId } = req.body;

    const userOrders = await orderModel.find({ userId });

    res.json({ success: true, userOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Has Been Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAvailableDates = async (req, res) => {
  try {
    // Get all unique dates from orders
    const orders = await orderModel.find({}, { date: 1 });
    
    // Extract unique dates and format them consistently
    const uniqueDates = [...new Set(orders.map(order => {
      const date = new Date(order.date);
      // Format as YYYY-MM-DD in local timezone
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }))];
    
    // Sort dates in descending order (most recent first)
    uniqueDates.sort((a, b) => new Date(b) - new Date(a));
    
    res.json({ success: true, availableDates: uniqueDates });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const deleted = await orderModel.findByIdAndDelete(orderId);
    if (!deleted) {
      return res.json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, allOrders, userOrderData, updateStatus, getAvailableDates, deleteOrder };
