import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { listUsers, deleteUser } from "../redux/actions/userActions";

import Loader from "../components/Loader";
import Error from "../components/Error";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/')
    }
    //successDelete added to trigger useEffect
  }, [dispatch, history, userInfo, successDelete]);

  const handleDeleteUser = (id) => {
    if(window.confirm("Are you sure")){
      dispatch(deleteUser(id));
    }
  };

  return (
    <section className="py-6">
      <div className="container is-max-widescreen">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            <h1 className="mb-5 title hr">Users</h1>
            <div className="table-container">
              <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <span className="has-text-success">
                            <i className="fas fa-check"></i>
                          </span>
                        ) : (
                          <span className="has-text-danger">
                            <i className="fas fa-times"></i>
                          </span>
                        )}
                      </td>
                      <td>
                        <Link to={`/admin/users/${user._id}/edit`}>
                          <button className="button is-rounded is-light is-small">
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
                        <button
                          className="button is-rounded is-danger is-small"
                          onClick={()=>{handleDeleteUser(user._id)}}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UsersList;
