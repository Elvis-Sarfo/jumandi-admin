const initialState = {
  summary: {
    newWithdrawalRequests: {
      percentage: 0,
      value: 0,
      amount: 0
    },
    paidWithdrawalRequests: {
      percentage: 0,
      value: 0,
      amount: 0
    },
    cancelledWithdrawalRequests: {
      percentage: 0,
      value: 0,
      amount: 0
    },
    totalWithdrawalRequests: 0,
    totalAmountRequested: 0
  },
  data: [],
  filter: ['This is a fitler'],
}



const withdrawalRequestsReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_WITHDRAWAL_REQUESTS':
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_WITHDRAWAL_REQUEST':
      return { ...state, ...rest }
    case 'UPDATE_WITHDRAWAL_REQUEST':
      return { ...state, ...rest }
    case 'DELETE_WITHDRAWAL_REQUEST':
      return { ...state, ...rest }
    default:
      return state
  }
}



/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} withdrawaRequests
 * @returns {Object}
 */
const getStructuredData = ({ withdrawalRequests }) => {

  const newWithdrawalRequests = {
    percentage: 0,
    value: 0,
    amount: 0
  };
  const paidWithdrawalRequests = {
    percentage: 0,
    value: 0,
    amount: 0
  };
  const cancelledWithdrawalRequests = {
    percentage: 0,
    value: 0,
    amount: 0
  };
  let totalWithdrawalRequests = withdrawalRequests.length;
  const data = [];

  /**
   * Loop through the list of document and structure the data
   */
  withdrawalRequests.forEach(doc => {
    // get the data from the document
    const withdrawalRequest = doc.data();

    // todo: calculate the dolor equivalents of each amount and add to data before production
    // todo: perform all calculation with the dollar equivalent of the amounts
    // sum up the total amount of request based on the state

    if (withdrawalRequest.request_state.status === 'new') {
      ++newWithdrawalRequests.value;
      newWithdrawalRequests.amount += withdrawalRequest.amount;
    } else if (withdrawalRequest.request_state.status === 'paid') {
      ++paidWithdrawalRequests.value;
      paidWithdrawalRequests.amount += withdrawalRequest.amount;
    } else if (withdrawalRequest.request_state.status === 'cancelled') {
      ++cancelledWithdrawalRequests.value;
      cancelledWithdrawalRequests.amount += withdrawalRequest.amount;
    }
    // newWithdrawalRequests.value += withdrawalRequest.request_state.status === 'new' ? 1 : 0;
    // paidWithdrawalRequests.value += withdrawalRequest.request_state.status === 'paid' ? 1 : 0;
    // cancelledWithdrawalRequests.value += withdrawalRequest.request_state.status === 'cancelled' ? 1 : 0;

    // Pushed structured data into the data array
    data.push({ id: doc.id, ...withdrawalRequest });
  });
  newWithdrawalRequests.percentage = ((newWithdrawalRequests.value / totalWithdrawalRequests) * 100).toFixed(2);
  paidWithdrawalRequests.percentage = ((paidWithdrawalRequests.value / totalWithdrawalRequests) * 100).toFixed(2);
  cancelledWithdrawalRequests.percentage = ((cancelledWithdrawalRequests.value / totalWithdrawalRequests) * 100).toFixed(2);
  // return the current state of the data
  return {
    summary: {
      newWithdrawalRequests,
      paidWithdrawalRequests,
      cancelledWithdrawalRequests,
      totalWithdrawalRequests
    },
    data
  }
};

export default withdrawalRequestsReducer
