import './admin.css'
import { useState } from 'react'

import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

export default function Admin() {
    const [taksInput, setTaksInput] = useState('')

    function handleTask(e){
        e.preventDefault()

        alert('CLICK')
    }

    async function handleLogout(){
        await signOut(auth)
    }

    return (
        <div className='admin-container'>
            <h1>My tasks</h1>

            <form className='form' onSubmit={handleTask}>
                <textarea
                    placeholder='Enter your tasks for today...' 
                    value={taksInput}
                    onChange={(e)=> setTaksInput(e.target.value)}
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