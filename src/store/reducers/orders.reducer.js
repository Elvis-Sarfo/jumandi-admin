
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

/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} orders
 * @returns {Object}
 */
const getStructuredData = ({ orders }) => {

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
  const rejectedOrders = {
    percentage: 0,
    value: 0
  };
  const acceptedOrders = {
    percentage: 0,
    value: 0
  };
  const cancelledOrders = {
    percentage: 0,
    value: 0
  };
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

    pendingOrders.value += orderState == 'pending' ? 1 : 0;
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
  pendingOrders.percentage = ((pendingOrders.value / totalOrders) * 100).toFixed(2);
  completedOrders.percentage = ((completedOrders.value / totalOrders) * 100).toFixed(2);
  newOrders.percentage = ((newOrders.value / totalOrders) * 100).toFixed(2);
  rejectedOrders.percentage = ((rejectedOrders.value / totalOrders) * 100).toFixed(2);
  acceptedOrders.percentage = ((acceptedOrders.value / totalOrders) * 100).toFixed(2);
  cancelledOrders.percentage = ((cancelledOrders.value / totalOrders) * 100).toFixed(2);
  // return the current state of the data
  return {
    summary: {
      pendingOrders,
      completedOrders,
      newOrders,
      rejectedOrders,
      acceptedOrders,
      cancelledOrders,
      totalOrders
    },
    data,
    filteredData
  }
};

export default ordersReducer