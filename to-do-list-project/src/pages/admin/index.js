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
    deleteDoc
} from 'firebase/firestore'

export default function Admin() {
    const [taksInput, setTaksInput] = useState('')
    const [user, setUser] = useState({})

    const [taks, setTaks] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)

                const taskRef = collection(db, 'taks')
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

                    console.log(list)
                    setTaks(list)
                })
            }
        }

        loadTasks()
    }, [])

    async function handleTask(e) {
        e.preventDefault()

        if (taksInput === '') {
            alert('Enter a task')
            return
        }

        await addDoc(collection(db, 'taks'), {
            task: taksInput,
            created: new Date(),
            userUid: user?.uid,
        }).then(() => {
            console.log('Registered task')
            setTaksInput('')
        }).catch((error) => {
            console.log('Error Register ' + error)
        })
    }

    async function handleLogout() {
        await signOut(auth)
    }

    async function deleteTask(id){
        const docRef = doc(db, 'taks', id)
        await deleteDoc(docRef)
    }

    return (
        <div className='admin-container'>
            <h1>My tasks</h1>

            <form className='form' onSubmit={handleTask}>
                <textarea
                    placeholder='Enter your tasks for today...'
                    value={taksInput}
                    onChange={(e) => setTaksInput(e.target.value)}
                />

                <button className='btn-add' type='submit'>Add task</button>
            </form>

            {taks.map((item) => (
                <article key={item.id} className='list'>
                    <p>{item.task}</p>

                    <div>
                        <button>Edit</button>
                        <button onClick={() => deleteTask(item.id)} className='btn-done'>Done</button>
                    </div>
                </article>
            ))}

            <button onClick={handleLogout} className='btn-logout'>Logout</button>
        </div>
    )
}