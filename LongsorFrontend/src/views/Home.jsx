import React, { useEffect } from 'react'
import SigninModal from '../components/SigninModal'
import SignupModal from '../components/SignupModal'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
const Home = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isSignUpModalOpen = useSelector((state) => state.modal.isSignUpModalOpen);
    const isSignInModalOpen = useSelector((state) => state.modal.isSignInModalOpen);
    useEffect(() => {
        if(isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated])
    return (
        <div className='flex flex-col items-center justify-center h-screen relative'>
        <h1 className='absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl text-center w-full font-bold'>Website Pelaporan Kejadian Longsor</h1>
            {
                isSignInModalOpen ?
                <SigninModal></SigninModal>
                :
                isSignUpModalOpen &&
                <SignupModal></SignupModal>
              
            }
        </div>
        
    )
}

export default Home