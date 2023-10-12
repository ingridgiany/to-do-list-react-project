import './admin.css'
import { useState, useEffect } from 'react'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {
    addDoc,
    collection
} from 'firebase/firestore'

export default function Admin() {
    const [taksInput, setTaksInput] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadTasks() {
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))
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
        }).then(()=> {
            console.log('Registered task')
            setTaksInput('')
        }).catch((error)=> {
            console.log('Error Register ' + error)
        })
    }

    async function handleLogout() {
        await signOut(auth)
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

            <article className='list'>
                <p>Terminar de assistir 6 vídeos do curso hoje.</p>

                <div>
                    <button>Edit</button>
                    <button className='btn-done'>Done</button>
                </div>

            </article>

            <button onClick={handleLogout} className='btn-logout'>Logout</button>
        </div>
    )
}