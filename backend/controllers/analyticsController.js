import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModels.js";

const getDashboardAnalytics = async (req, res) => {
  try {
    const { dateRange = 30, period = "daily" } = req.body;
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(dateRange));

    // Get orders within date range
    const orders = await orderModel.find({
      date: {
        $gte: startDate.getTime(),
        $lte: endDate.getTime()
      }
    });

    // Calculate basic metrics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get unique customers
    const uniqueCustomers = [...new Set(orders.map(order => order.userId))];
    const totalCustomers = uniqueCustomers.length;

    // Order status distribution
    const ordersByStatus = {};
    orders.forEach(order => {
      ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;
    });

    // Top products analysis
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (productSales[item.name]) {
          productSales[item.name] += item.quantity;
        } else {
          productSales[item.name] = item.quantity;
        }
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    // Recent orders (last 10)
    const recentOrders = await orderModel.find()
      .sort({ date: -1 })
      .limit(10);

    // Daily/Monthly stats
    const dailyStats = [];
    const monthlyStats = [];

    if (period === "daily") {
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dayStart = new Date(currentDate);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(currentDate);
        dayEnd.setHours(23, 59, 59, 999);

        const dayOrders = orders.filter(order => 
          order.date >= dayStart.getTime() && order.date <= dayEnd.getTime()
        );

        const dayRevenue = dayOrders.reduce((sum, order) => sum + order.amount, 0);

        dailyStats.push({
          date: currentDate.toISOString().split('T')[0],
          orders: dayOrders.length,
          revenue: dayRevenue
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (period === "monthly") {
      const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const endMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);

      while (currentDate <= endMonth) {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        monthEnd.setHours(23, 59, 59, 999);

        const monthOrders = orders.filter(order => 
          order.date >= monthStart.getTime() && order.date <= monthEnd.getTime()
        );

        const monthRevenue = monthOrders.reduce((sum, order) => sum + order.amount, 0);

        monthlyStats.push({
          month: currentDate.toISOString().slice(0, 7), // YYYY-MM format
          orders: monthOrders.length,
          revenue: monthRevenue
        });

        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    const analytics = {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      totalCustomers,
      ordersByStatus,
      topProducts,
      recentOrders,
      dailyStats,
      monthlyStats
    };

    res.json({ success: true, analytics });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getSalesTrends = async (req, res) => {
  try {
    const { period = "daily", days = 30 } = req.body;
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(days));

    const orders = await orderModel.find({
      date: {
        $gte: startDate.getTime(),
        $lte: endDate.getTime()
      }
    });

    const trends = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const periodStart = new Date(currentDate);
      const periodEnd = new Date(currentDate);

      if (period === "daily") {
        periodStart.setHours(0, 0, 0, 0);
        periodEnd.setHours(23, 59, 59, 999);
      } else if (period === "weekly") {
        const dayOfWeek = currentDate.getDay();
        periodStart.setDate(currentDate.getDate() - dayOfWeek);
        periodStart.setHours(0, 0, 0, 0);
        periodEnd.setDate(periodStart.getDate() + 6);
        periodEnd.setHours(23, 59, 59, 999);
      } else if (period === "monthly") {
        periodStart.setDate(1);
        periodStart.setHours(0, 0, 0, 0);
        periodEnd.setMonth(periodStart.getMonth() + 1);
        periodEnd.setDate(0);
        periodEnd.setHours(23, 59, 59, 999);
      }

      const periodOrders = orders.filter(order => 
        order.date >= periodStart.getTime() && order.date <= periodEnd.getTime()
      );

      const periodRevenue = periodOrders.reduce((sum, order) => sum + order.amount, 0);

      trends.push({
        period: period === "daily" ? currentDate.toISOString().split('T')[0] : 
                period === "weekly" ? `Week ${Math.ceil((currentDate.getDate() + currentDate.getDay()) / 7)}` :
                currentDate.toISOString().slice(0, 7),
        orders: periodOrders.length,
        revenue: periodRevenue,
        averageOrderValue: periodOrders.length > 0 ? periodRevenue / periodOrders.length : 0
      });

      if (period === "daily") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (period === "weekly") {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (period === "monthly") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    res.json({ success: true, trends });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProductAnalytics = async (req, res) => {
  try {
    const { dateRange = 30 } = req.body;
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(dateRange));

    const orders = await orderModel.find({
      date: {
        $gte: startDate.getTime(),
        $lte: endDate.getTime()
      }
    });

    // Product performance analysis
    const productStats = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productStats[item.name]) {
          productStats[item.name] = {
            name: item.name,
            totalQuantity: 0,
            totalRevenue: 0,
            orderCount: 0
          };
        }
        
        productStats[item.name].totalQuantity += item.quantity;
        productStats[item.name].totalRevenue += item.price * item.quantity;
        productStats[item.name].orderCount += 1;
      });
    });

    const productAnalytics = Object.values(productStats)
      .map(product => ({
        ...product,
        averagePrice: product.totalQuantity > 0 ? product.totalRevenue / product.totalQuantity : 0
      }))
      .sort((a, b) => b.totalRevenue - a.totalRevenue);

    res.json({ success: true, productAnalytics });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getDashboardAnalytics, getSalesTrends, getProductAnalytics }; 