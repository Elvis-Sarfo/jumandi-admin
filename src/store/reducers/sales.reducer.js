
const initialState = {
  summary: {
    totalNetSales: {
      percentage: 0,
      value: 0
    },
    totalGrandSales: {
      percentage: 0,
      value: 0
    },
    totalRevenue: {
      percentage: 0,
      value: 0
    },
    salesPerYear: {
      months: [],
      sales: []
    },
    totalNumOfSales: 0
  },
  data: {},
  filteredData: [],
  filter: ['This is a fitler'],
}

const ordersReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_SALES':
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_SALE':
      return { ...state, ...rest }
    case 'UPDATE_SALE':
      return { ...state, ...rest }
    case 'DELETE_SALE':
      return { ...state, ...rest }
    default:
      return state
  }
}

function getMonths() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  let m = months.slice(0, now.getMonth() + 1);
  return m;
}

function getInitialSalesGraphData() {
  const m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const months = m.slice(0, now.getMonth() + 1);
  const sales = months.map(i => 0);
  return {months, sales};

}

/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} orders
 * @returns {Object}
 */
// Structure the data that is coming from firebase
const getStructuredData = ({ orders }) => {
  const now = new Date();
  let data = {};
  let totalNetSales = {
    percentage: 0,
    value: 0
  };
  let totalGrandSales = {
    percentage: 0,
    value: 0
  };
  let totalRevenue = {
    percentage: 0,
    value: 0
  };
  let salesPerYear = getInitialSalesGraphData();
  let totalNumOfSales = 0;


  // Loop over the data that is coming from the database
  orders.forEach((doc) => {
    const order = doc.data();
    // Get the vendor's in a variable and save it in the variable
    let vendorId = order.stationId;

    // First check if the order has been completed before
    // IF: the order has been complete then it means it is a sale and we can work on that
    if (order.orderState?.status.toLowerCase() == 'completed') {
      let date = new Date(order.createdAt * 1000);
      console.log(date.getMonth());
      if(date.getFullYear() == now.getFullYear()) ++salesPerYear.sales[date.getMonth()]
      // Check if the vendor id exists in the map.
      // IF: it exist you dont have to add it again,
      // Just update the data by incrementing numberOfOrders, netTotal, and grandTotal
      // ELSE: add a new data to the MAP[saleIndexes, _sales] with initial values
      if (data[vendorId]) {
        data[vendorId].numOfOrders += 1;
        data[vendorId].netTotal +=
          Number((order.orderPrice - (order.orderPrice * 0.2)).toFixed(2));
        data[vendorId].grandTotal += Number((order.orderPrice).toFixed(2));
        data[vendorId].revenue += Number((order.orderPrice * 0.2).toFixed(2));

        data[vendorId].netTotal = Number(data[vendorId].netTotal.toFixed(2));
        data[vendorId].grandTotal = Number(data[vendorId].grandTotal.toFixed(2));
        data[vendorId].revenue = Number(data[vendorId].revenue.toFixed(2));
      } else {
        data[vendorId] = {
          id: vendorId,
          vendor: {
            logo: order.station?.businessLogo,
            name: order.station?.businessName,
            location: {
              isoCode: order.station?.businessLocation?.isoCode,
              country: order.station?.businessLocation?.country
            }
          },
          numOfOrders: 1,
          netTotal: Number((order.orderPrice - (order.orderPrice * 0.2)).toFixed(2)),
          grandTotal: Number((order.orderPrice).toFixed(2)),
          revenue: Number((order.orderPrice * 0.2).toFixed(2))
        }
      }
      ++totalNumOfSales;
      totalNetSales.value += data[vendorId].netTotal;
      totalGrandSales.value += data[vendorId].grandTotal;
      totalRevenue.value += data[vendorId].revenue;
    }
  });

  return {
    summary: {
      totalNumOfSales,
      totalNetSales,
      totalGrandSales,
      totalRevenue,
      salesPerYear
    },
    data
  };
};

export default ordersReducer