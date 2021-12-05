
const initialState = {
  summary: {
    pendingOrders: {
      percentage: 0,
      value: 0
    },
    completedOrders: {
      percentage: 0,
      value: 0
    },
    rejectedOrders: {
      percentage: 0,
      value: 0
    },
    acceptedOrders: {
      percentage: 0,
      value: 0
    },
    cancelledOrders: {
      percentage: 0,
      value: 0
    },
    newOrders: {
      percentage: 0,
      value: 0
    },
    acceptedOrders: {
      percentage: 0,
      value: 0
    },
    ordersPerYear: {
      months: [],
      orders: []
    },
    totalOrders: 0
  },
  data: {},
  filteredData: [],
  filter: ['This is a fitler'],
}

const ordersReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_ORDERS':
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_ORDER':
      return { ...state, ...rest }
    case 'UPDATE_ORDER':
      return { ...state, ...rest }
    case 'DELETE_ORDER':
      return { ...state, ...rest }
    default:
      return state
  }
}


function getInitialOrdersGraphData() {
  const m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const months = m.slice(0, now.getMonth() + 1);
  const orders = months.map(i => 0);
  return { months, orders };

}

/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} orders
 * @returns {Object}
 */
const getStructuredData = ({ orders }) => {
  const now = new Date();
  const pendingOrders = {
    percentage: 0,
    value: 0
  };
  const completedOrders = {
    percentage: 0,
    value: 0
  };
  const newOrders = {
    percentage: 0,
    value: 0
  };
  const acceptedOrders = {
    percentage: 0,
    value: 0
  };
  const rejectedOrders = {
    percentage: 0,
    value: 0
  };
  const cancelledOrders = {
    percentage: 0,
    value: 0
  };
  const ordersPerYear = getInitialOrdersGraphData();
  let totalOrders = orders.length;
  const data = {};
  const filteredData = []

  /**
   * Loop through the list of document and structure the data
   */
  orders.forEach(doc => {
    // get the data from the document
    const order = doc.data();
    const orderState = order.orderState?.status.toLowerCase();

    if (orderState != 'deleted') {
      let date = new Date(order.createdAt * 1000);
      // todo: ask to see if we can include the new orders or not
      if (date.getFullYear() == now.getFullYear())
        ++ordersPerYear.orders[date.getMonth()];

      pendingOrders.value += orderState == 'pending' ? 1 : 0;
      acceptedOrders.value += orderState == 'accepted' ? 1 : 0;
      completedOrders.value += orderState == 'completed' ? 1 : 0;
      newOrders.value += orderState == 'new' ? 1 : 0;
      rejectedOrders.value += orderState == 'rejected' ? 1 : 0;
      acceptedOrders.value += orderState == 'accepted' ? 1 : 0;
      cancelledOrders.value += orderState == 'cancelled' ? 1 : 0;

      // Pushed structured data into the data map

      data[order.orderId] = { id: doc.id, ...order };
      filteredData.push({ id: doc.id, ...order });
    }

  });

  // get the percentage of the order summaries
  pendingOrders.percentage = calcPercentage(pendingOrders.value, totalOrders);
  acceptedOrders.percentage = calcPercentage(acceptedOrders.value, totalOrders);
  completedOrders.percentage = calcPercentage(completedOrders.value, totalOrders);
  newOrders.percentage = calcPercentage(newOrders.value, totalOrders);
  rejectedOrders.percentage = calcPercentage(rejectedOrders.value, totalOrders);
  acceptedOrders.percentage = calcPercentage(acceptedOrders.value, totalOrders);
  cancelledOrders.percentage = calcPercentage(cancelledOrders.value, totalOrders);
  // return the current state of the data
  return {
    summary: {
      pendingOrders,
      completedOrders,
      newOrders,
      rejectedOrders,
      acceptedOrders,
      cancelledOrders,
      totalOrders,
      ordersPerYear
    },
    data,
    filteredData
  }
};

function calcPercentage(value, total) {
  let percent = ((value / total) * 100).toFixed(2);
  if ( Number(percent)) {
    return percent;
  } else {
    return 0;
  }
}

export default ordersReducer