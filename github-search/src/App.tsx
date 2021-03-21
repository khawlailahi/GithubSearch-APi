import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import Alert from "./components/alert";
import List from './components/List';
import { setAlert } from './store/actions/alertActions';
import { setError } from './store/actions/dataActions';
import Search from './components/Search';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const githubData = useSelector((state: RootState) => state.DataGit.data);
  const loading = useSelector((state: RootState) => state.DataGit.loading);



  const error = useSelector((state: RootState) => state.DataGit.error);
  const alertMsg = useSelector((state: RootState) => state.alert.message);
  return (
    <div className="App">
      <Search />
      <br />
      {loading ? <div className="flexLaod"><h2 className="loading">Laoding ...  </h2> <div className="loader"></div></div> : <List data={githubData} />}

      {alertMsg && <Alert message={alertMsg} onClose={() => dispatch(setAlert(''))} />}
      {error && <Alert message={error} onClose={() => dispatch(setError())} />}

    </div>
  );
}

export default App;
