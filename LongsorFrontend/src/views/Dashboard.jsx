import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Button from '../components/Button'
import { logout } from '../store/authSlice'
import ReportTable from '../components/ReportTable'
import AddReportModal from '../components/AddReportModal'
import { openReportModal } from '../store/modalSlice'
import ReportChart from '../components/ReportChart'
const Dashboard = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const isReportModalOpen = useSelector((state) => state.modal.isReportModalOpen);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])
    const [openVisualisasi, setOpenVisualisasi] = React.useState(true)
    const [openPelaporan, setOpenPelaporan] = React.useState(false)
    return (
        <div className='flex flex-row'>
            <div className='p-3 py-5 min-h-screen bg-gradient-to-b from-lime-800 to-lime-500 text-white text-left'>
                <h1 className='text-3xl font-bold px-2'>Dashboard</h1>
                <div className='flex flex-col gap-4  text-xl py-10'>
                    <button onClick={() => { setOpenVisualisasi(true); setOpenPelaporan(false) }} className={`${openVisualisasi && 'bg-lime-600/80 hover:!bg-lime-600'} text-left p-2 rounded-lg hover:bg-lime-600/30 `}>Visualisasi</button>
                    <button onClick={() => { setOpenVisualisasi(false); setOpenPelaporan(true) }} className={`${openPelaporan && 'bg-lime-600/80 hover:!bg-lime-600'} text-left p-2 rounded-lg hover:bg-lime-600/30`}>Pelaporan</button>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <div className='p-5 w-full h-fit flex flex-row justify-between '>
                    <h1 className='text-3xl font-bold '>Pelaporan Kejadian Longsor</h1>
                    <div className='flex flex-row gap-4 justify-center items-center'>
                        <h1 className='text-xl '>{user?.name}</h1>
                        <Button color={'red'} onClick={() => { dispatch(logout()) }}>Sign Out</Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4 px-5'>
                    {openVisualisasi && <div className='p-5 bg-white rounded-lg border-lime-300 border-[1px]'>
                        <ReportChart></ReportChart>
                    </div>}
                    {openPelaporan && (
                        <div className='p-5 bg-white rounded-lg border-lime-300 border-[1px]'>
                            {isReportModalOpen && 
                            <AddReportModal></AddReportModal>
                            }
                            <div className='flex flex-row-reverse mb-5'>
                            <Button onClick={() => {dispatch(openReportModal())}}>Tambah</Button>
                            </div>
                            <ReportTable></ReportTable>
                        </div>
                    )}

                </div>
            </div>

        </div>
    )
}

export default Dashboard