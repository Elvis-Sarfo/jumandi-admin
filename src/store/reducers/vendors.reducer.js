
const initialState = {
  summary: {
    approvedVendors: {
      percentage: 0,
      value: 0
    },
    pendingVendors: {
      percentage: 0,
      value: 0
    },
    totalVendors: 0
  },
  data: [],
  filter: ['This is a fitler'],
}



const vendorsReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_VENDORS':
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_VENDOR':
      return { ...state, ...rest }
    case 'UPDATE_VENDOR':
      return { ...state, ...rest }
    case 'DELETE_VENDOR':
      return { ...state, ...rest }
    default:
      return state
  }
}



/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} vendors
 * @returns {Object}
 */
const getStructuredData = ({ vendors }) => {

  const approvedVendors = {
    percentage: 0,
    value: 0
  };
  const pendingVendors = {
    percentage: 0,
    value: 0
  };
  let totalVendors = vendors.length;
  const data = [];

  /**
   * Loop through the list of document and structure the data
   */
  vendors.forEach(doc => {
    // get the data from the document
    const vendor = doc.data();

    // update the number of pending vendors
    pendingVendors.value += vendor.businessStatus?.toLowerCase() == 'pending' ? 1 : 0;

    // Update the number of approved vendor by adding one if the status is equal to 'approved
    approvedVendors.value += vendor.businessStatus?.toLowerCase() == 'approved' ? 1 : 0;

    // Pushed structured data into the data array
    data.push({ id: doc.id, ...vendor });
  });
  pendingVendors.percentage = ((pendingVendors.value / totalVendors) * 100).toFixed(2);
  approvedVendors.percentage = ((approvedVendors.value / totalVendors) * 100).toFixed(2);;
  // return the current state of the data
  return {
    summary: {
      approvedVendors,
      pendingVendors,
      totalVendors
    },
    data
  }
};

export default vendorsReducer