import './App.css';
import { connect } from 'react-redux';
import { thunk_action } from './actions/fetchAction';
import UserInfo from './UserInfo';

function App(props) {

  let getUsername;

  const handleSubmit = e => {
    e.preventDefault();
    const username = getUsername.value;
    props.dispatch(thunk_action(username));
    getUsername.value = "";
    console.log(username);
  }

  return (
    <div className="App-container">
      <form className="app-form" onSubmit={handleSubmit}>
        <h2 className="title">Enter The Github Username</h2>
        <input
          type="text"
          placeholder="Enter Github Username"
          required
          ref={input => (getUsername = input)}
        />
        <button className="btn">Submit</button>
      </form>
      {props.data.isFetching ? <h3>Loading...</h3> : null}
      {props.data.isError ? (
        <h3 className="error">Error</h3>
      ) : null}
      {Object.keys(props.data.userData).length > 0 ? (
        <UserInfo user={props.data.userData} />
      ) : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(App);
