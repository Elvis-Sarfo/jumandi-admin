
const initialState = {
  summary: {
    enabledNationalAdmins: {
      percentage: 0,
      value: 0
    },
    disabledNationalAdmins: {
      percentage: 0,
      value: 0
    },
    totalNationalAdmins: 0
  },
  data: [],
  filter: ['This is a fitler'],
}



const nationalAdminsReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_NATIONAL_ADMINS':
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_NATIONAL_ADMIN':
      return { ...state, ...rest }
    case 'UPDATE_NATIONAL_ADMIN':
      return { ...state, ...rest }
    case 'DELETE_NATIONAL_ADMIN':
      return { ...state, ...rest }
    default:
      return state
  }
}



/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} nationalAdmins
 * @returns {Object}
 */
const getStructuredData = ({ nationalAdmins }) => {

  const enabledNationalAdmins = {
    percentage: 0,
    value: 0
  };
  const disabledNationalAdmins = {
    percentage: 0,
    value: 0
  };
  let totalNationalAdmins = nationalAdmins.length;
  const data = [];

  /**
   * Loop through the list of document and structure the data
   */
  nationalAdmins.forEach(doc => {
    // get the data from the document
    const nationalAdmin = doc.data();

    // update the number of pending nationalAdmins
    enabledNationalAdmins.value += nationalAdmin.enabled ? 1 : 0;

    // Update the number of approved nationalAdmin by adding one if the status is equal to 'approved
    disabledNationalAdmins.value += !nationalAdmin.enabled ? 1 : 0;

    // Pushed structured data into the data array
    data.push({ id: doc.id, ...nationalAdmin });
  });
  enabledNationalAdmins.percentage = ((enabledNationalAdmins.value / totalNationalAdmins) * 100).toFixed(2);
  disabledNationalAdmins.percentage = ((disabledNationalAdmins.value / totalNationalAdmins) * 100).toFixed(2);;
  // return the current state of the data
  return {
    summary: {
      enabledNationalAdmins,
      disabledNationalAdmins,
      totalNationalAdmins
    },
    data
  }
};

export default nationalAdminsReducer