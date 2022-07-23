import React from 'react';
import { useRouter } from 'next/router'

const EditTodo = (props) => {
    const [selectedTodo, setSelectedTodo] = React.useState({ status: 'New' });
    const router = useRouter()
    const { id } = router.query;

    React.useEffect(() => {
        if (props.todo) {
            setSelectedTodo(props.todo)
        }
    }, [props])

    const handleOnSave = async () => {
        try {
            await fetch(`/api/todo/${id}`, {
                method: id === 'new' ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedTodo)
            }).then((resp) => resp.json())
            router.push('/');
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="form-control min-w-full">
            <div className='m-2'>
                <label className="label">
                    <span className="label-text">Todo</span>
                </label>
                <input
                    type="text"
                    placeholder="Add todo...!!"
                    value={selectedTodo.todo}
                    onChange={(e) => setSelectedTodo({ ...selectedTodo, todo: e.target.value })}
                    className="input input-bordered min-w-full"
                />
            </div>
            <div className='m-2'>
                <label className="label">
                    <span className="label-text">Pick the best todo status</span>
                </label>
                <select
                    onChange={(e) => setSelectedTodo({ ...selectedTodo, status: e.target.value })}
                    className="select select-bordered min-w-full"
                >
                    <option selected value="New">New</option>
                    <option value="Started">Started</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className='flex justify-end  min-w-full m-2'>
                <button
                    className='btn btn-sm btn-success'
                    disabled={!selectedTodo.todo || !selectedTodo.status}
                    onClick={handleOnSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditTodo

export async function getServerSideProps(context) {
    const {query} = context;

    if (query.id !== 'new') {
        const todo = await fetch(`http://localhost:3000/api/todo/${query.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((resp) => resp.json());

        return {
            props: { todo }
        }
    }
    
    return {
        props: {}
    }
    
}
