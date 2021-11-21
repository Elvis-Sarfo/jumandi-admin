import { createStore , applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk  from 'redux-thunk';
import { firestore, storage } from '../config/firebase';

const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({
    firestore,
    storage
  })
)
)

export default store
