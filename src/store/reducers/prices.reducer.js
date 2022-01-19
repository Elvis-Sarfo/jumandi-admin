
const initialState = {
  data: [],
}



const pricesReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_PRICES':
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_PRICE':
      return { ...state, ...rest }
    case 'UPDATE_PRICE':
      return { ...state, ...rest }
    case 'DELETE_PRICE':
      return { ...state, ...rest }
    default:
      return state
  }
}



/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} prices
 * @returns {Object}
 */
const getStructuredData = ({ prices }) => {
  const data = [];
  /**
   * Loop through the list of document and structure the data
   */
  prices.forEach(doc => {
    // get the data from the document
    const price = doc.data();

    // Pushed structured data into the data array
    data.push({ id: doc.id, ...price });
  });
  // return the current state of the data
  return {
    data
  }
};

export default pricesReducer