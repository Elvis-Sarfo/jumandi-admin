
const initialState = {
  summary: {
    enabledUsers: {
      percentage: 0,
      value: 0
    },
    disabledUsers: {
      percentage: 0,
      value: 0
    },
    totalUsers: 0
  },
  data: [],
  filter: ['This is a fitler'],
}



const usersReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'GET_USERS':
      return { ...state, ...getStructuredData(rest) }
    case 'CREATE_USER':
      return { ...state, ...rest }
    case 'UPDATE_USER':
      return { ...state, ...rest }
    case 'DELETE_USER':
      return { ...state, ...rest }
    default:
      return state
  }
}



/**
 * @name getStructuredData
 * Structure the data that is coming from firebase
 * @param  {Array} users
 * @returns {Object}
 */
const getStructuredData = ({ users }) => {

  const enabledUsers = {
    percentage: 0,
    value: 0
  };
  const disabledUsers = {
    percentage: 0,
    value: 0
  };
  let totalUsers = users.length;
  const data = [];

  /**
   * Loop through the list of document and structure the data
   */
  users.forEach(doc => {
    // get the data from the document
    const user = doc.data();

    // update the number of pending users
    enabledUsers.value += user.enabled ? 1 : 0;

    // Update the number of approved user by adding one if the status is equal to 'approved
    disabledUsers.value += !user.enabled ? 1 : 0;

    // Pushed structured data into the data array
    data.push({ id: doc.id, ...user });
  });
  enabledUsers.percentage = ((enabledUsers.value / totalUsers) * 100).toFixed(2);
  disabledUsers.percentage = ((disabledUsers.value / totalUsers) * 100).toFixed(2);;
  // return the current state of the data
  return {
    summary: {
      enabledUsers,
      disabledUsers,
      totalUsers
    },
    data
  }
};

export default usersReducer