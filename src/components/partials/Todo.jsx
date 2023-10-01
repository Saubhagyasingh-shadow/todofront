import moment from 'moment/moment';
import React, { useState } from 'react';
import { DeleteTodoApi, MarkTodoApi } from '../../services/api';

function Todo({ todo, setrefreshList }) {
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);

  const handleDelete = async () => {
    setIsDeleteButtonClicked(true);
    const result = await DeleteTodoApi({
      todo_id: todo._id
    });

    if (result.data.status === 200) {
      setrefreshList(new Date());
      window.alert("deleted successfully");
    } else {
      window.alert("failed to delete, try again");
    }
  }

  const handleMarkTodo = async () => {
    setIsDeleteButtonClicked(true);
    const result = await MarkTodoApi({
      todo_id: todo._id
    });

    if (result.data.status === 200) {
      setrefreshList(new Date());
      window.alert(result.data.message);
    } else {
      window.alert("failed to mark, try again");
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-sm-8 mx-2 my-2 alert bg-light position-relative">
          <img
            src="https://thumbs.dreamstime.com/b/motivation-line-icon-thin-style-element-business-administration-collection-simple-web-design-apps-software-170085014.jpg"
            alt="Motivation Icon"
            className="position-absolute top-0 end-0 mt-2 me-2"
            style={{ width: '100px', height: '80px' }}  // Set the dimensions of the image
          />
          <div className="card-header">
            {todo.isCompleted ? "Completed" : "Not completed"}
          </div>
          <div className="card-body">
            <h4 className="card-title">{todo.desc}</h4>
            <p className="card-text">{moment(todo.date).fromNow()}</p>

            <div className="actionButtons" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                style={{
                  background: isDeleteButtonClicked ? '#d9534f' : 'red',
                  marginRight: '10px',
                  borderRadius: '5px',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                onClick={handleMarkTodo}
                style={{
                  background: '#5bc0de',
                  borderRadius: '5px',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {todo.isCompleted ? 'Mark Uncomplete' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
