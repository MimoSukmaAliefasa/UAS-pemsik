import React from 'react'
import Button from './Button'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { openSignInModal } from '../store/modalSlice';
import { loginSuccess } from '../store/authSlice';
import { useNavigate } from 'react-router'
import axios from 'axios'
const SignUpModal = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        if (name === '' || email === '' || password === '') {
            alert('Please fill all the fields')
            return
        }
        axios.post(import.meta.env.VITE_API_URL + '/signup', {
            name: name,
            email: email,
            password: password
        }).then((res) => {
            dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
            navigate('/dashboard')
        }).catch((err) => {
            alert(err.response.data)
        })
    }
    return (
        <div className='rounded-3xl flex flex-col gap-6 p-6 border-black/20 border-[1px]'>
            <h1 className='text-2xl font-bold text-center'>Sign Up</h1>
            <div className='flex flex-col gap-4'>
                <Input placeholder={'Fill your name'} type={'name'} label={'Name'} onChange={(e) => { setName(e.target.value) }}></Input>
                <Input placeholder={'Fill your email'} type={'email'} label={'Email'} onChange={(e) => { setEmail(e.target.value) }}></Input>
                <Input placeholder={'Fill your password'} type={'password'} label={'Password'} onChange={(e) => { setPassword(e.target.value) }}></Input>
                <Button onClick={handleClick}>Sign Up</Button>
                <p className='text-center'>Already have an account? <button onClick={() => dispatch(openSignInModal())} className='text-lime-600'>Sign In</button></p>
            </div>
        </div>
    )
}

export default SignUpModal