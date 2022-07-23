
import React from 'react';

export default function Home(props) {
  const [todo, setTodo] = React.useState(props.todo)

  const syncData = async () => {
    const { todo } = await fetch('http://localhost:3000/api/todo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((resp) => resp.json());
    setTodo(todo)
  }

  const handleUpdateTodo = async (e, row) => {
    await fetch(`/api/todo/${row.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: row.todo, status: e.target.value })
    }).then((resp) => resp.json());
    syncData();
  }

  const handleDeleteTodo = async (entity) => {
    await fetch(`/api/todo/${entity.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then((resp) => resp.json());
    syncData();
  }

  return (
    <>
      <div className="overflow-x-auto w-full m-2">
        <table className="table border min-w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">#</th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Todo</th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Status</th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {
              !todo || todo.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className='flex justify-center items-center w-full text-red-500'>
                      No Records Found
                    </div>
                  </td>
                </tr>
              )
            }
            {
              todo && todo.map((row, index) => {
                return (
                  <tr key={row.id}>
                    <td className="sticky left-0 p-4 bg-white">{index + 1}</td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      <a href={`/${row.id}`}>{row.todo}</a>
                    </td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      <div className="form-control min-w-full">
                        <select
                          onChange={(e) => handleUpdateTodo(e, row)}
                          className="select select-bordered min-w-full"
                        >
                          <option selected={row.status === "New"} value="New">New</option>
                          <option selected={row.status === "Started"} value="Started">Started</option>
                          <option selected={row.status === "Completed"} value="Completed">Completed</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      <button className='btn btn-sm btn-warning' onClick={() => handleDeleteTodo(row)}>delete</button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { todo } = await fetch('http://localhost:3000/api/todo', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((resp) => resp.json());

  return {
    props: { todo }
  }
}
