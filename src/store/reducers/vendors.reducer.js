import { calcPercentage } from './../../utils/common_functions'
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
    contriesCount: {
      ghana: 0,
      nigeria: 0
    },
    totalVendors: 0
  },
  data: {},
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
  const contriesCount = {
    ghana: 0,
    nigeria: 0
  };
  let totalVendors = vendors.length;
  const data = {};

  /**
   * Loop through the list of document and structure the data
   */
  vendors.forEach(doc => {
    // get the data from the document
    const vendor = doc.data();
    const country = vendor.businessLocation?.country.toLowerCase();

    // count the country
    if (contriesCount[country]) contriesCount[country] += 1;
    else contriesCount[country] = 1;

    // update the number of pending vendors
    pendingVendors.value += vendor.businessStatus?.toLowerCase() == 'pending' ? 1 : 0;

    // Update the number of approved vendor by adding one if the status is equal to 'approved
    approvedVendors.value += vendor.businessStatus?.toLowerCase() == 'approved' ? 1 : 0;

    // Pushed structured data into the data array
    // data.push({ id: doc.id, ...vendor });
    data[doc.id] = { id: doc.id, ...vendor };
  });
  pendingVendors.percentage = calcPercentage(pendingVendors.value, totalVendors);
  approvedVendors.percentage = calcPercentage(approvedVendors.value, totalVendors);
  // return the current state of the data
  return {
    summary: {
      approvedVendors,
      pendingVendors,
      totalVendors,
      contriesCount
    },
    data
  }
};

export default vendorsReducer