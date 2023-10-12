import './admin.css'
import { useState, useEffect } from 'react'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc, 
    updateDoc
} from 'firebase/firestore'

export default function Admin() {
    const [tasksInput, setTasksInput] = useState('')
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)

                const taskRef = collection(db, 'tasks')
                const q = query(taskRef, orderBy('created', 'desc'),
                    where('userUid', '==', data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let list = []

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid
                        })
                    })


                    setTasks(list)
                })
            }
        }

        loadTasks()
    }, [])

    async function handleTask(e) {
        e.preventDefault()

        if (tasksInput === '') {
            alert('Enter a task')
            return
        }

        if(edit?.id){
            handleUpdateTask()
            return
        }

        await addDoc(collection(db, 'tasks'), {
            task: tasksInput,
            created: new Date(),
            userUid: user?.uid,
        }).then(() => {
            console.log('Registered task')
            setTasksInput('')
        }).catch((error) => {
            console.log('Error Register ' + error)
        })
    }

    async function handleLogout() {
        await signOut(auth)
    }

    async function deleteTask(id) {
        const docRef = doc(db, 'tasks', id)
        await deleteDoc(docRef)
    }

    function editTask(item) {
        setTasksInput(item.task)
        setEdit(item)
    }

    async function handleUpdateTask(){
        const docRef = doc(db, 'tasks', edit?.id)
        await updateDoc(docRef, {
            task: tasksInput,
        }).then(()=> {
            console.log('task updated successfully')
            setTasksInput('')
            setEdit({})
        }).catch(()=>{
            console.log('error updating task')
            setTasksInput('')
            setEdit({})
        })
    }

    return (
        <div className='admin-container'>
            <h1>My tasks</h1>

            <form className='form' onSubmit={handleTask}>
                <textarea
                    placeholder='Enter your tasks for today...'
                    value={tasksInput}
                    onChange={(e) => setTasksInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-add' style={{backgroundColor: '#6add39'}} type='submit'>Update task</button>
                ) : (
                    <button className='btn-add' type='submit'>Add task</button>
                )}
            </form>

            {tasks.map((item) => (
                <article key={item.id} className='list'>
                    <p>{item.task}</p>

                    <div>
                        <button onClick={() => editTask(item)}>Edit</button>
                        <button onClick={() => deleteTask(item.id)} className='btn-done'>Done</button>
                    </div>
                </article>
            ))}

            <button onClick={handleLogout} className='btn-logout'>Logout</button>
        </div>
    )
}