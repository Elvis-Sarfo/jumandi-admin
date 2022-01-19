const initialState = {
  summary: {
    totalPaymentss: 0
  },
  data: [],
  filter: ['This is a fitler'],
}



const paymentsReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_PAYMENTS':
      console.log('GET_PAYMENTS', { ...state, ...getStructuredData(rest) });
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_PAYMENT':
      return { ...state, ...rest }
    case 'UPDATE_PAYMENT':
      return { ...state, ...rest }
    case 'DELETE_PAYMENT':
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
const getStructuredData = ({ payments }) => {

  // const newPaymentss = {
  //   percentage: 0,
  //   value: 0
  // };
  // const paidPaymentss = {
  //   percentage: 0,
  //   value: 0
  // };
  // const cancelledPaymentss = {
  //   percentage: 0,
  //   value: 0
  // };
  try {
    let totalPaymentss = payments.length;
    const data = [];
    /**
     * Loop through the list of document and structure the data
     */
    payments.forEach(doc => {
      // get the data from the document
      const withdrawalRequest = doc.data();

      // newPaymentss.value += withdrawalRequest.request_state.status === 'new' ? 1 : 0;
      // paidPaymentss.value += withdrawalRequest.request_state.status === 'paid' ? 1 : 0;
      // cancelledPaymentss.value += withdrawalRequest.request_state.status === 'cancelled' ? 1 : 0;

      // Pushed structured data into the data array
      data.push({ id: doc.id, ...withdrawalRequest });
    });
    // newPaymentss.percentage = ((newPaymentss.value / totalPaymentss) * 100).toFixed(2);
    // paidPaymentss.percentage = ((paidPaymentss.value / totalPaymentss) * 100).toFixed(2);
    // cancelledPaymentss.percentage = ((cancelledPaymentss.value / totalPaymentss) * 100).toFixed(2);

    // return the current state of the data
    return {
      summary: {
        totalPaymentss
      },
      data
    }
  } catch (error) {
    console.error(error);
    return {};
  }

};

export default paymentsReducer