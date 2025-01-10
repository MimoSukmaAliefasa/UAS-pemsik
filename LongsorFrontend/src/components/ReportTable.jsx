import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Input from './Input'
import { useSelector } from 'react-redux'
const TabelPelaporan = () => {
    const [reports, setReports] = React.useState([])
    const [date, setDate] = React.useState('')
    const [time, setTime] = React.useState('')
    const [province, setProvince] = React.useState('')
    const [city, setCity] = React.useState('')
    const [district, setDistrict] = React.useState('')
    const [village, setVillage] = React.useState('')
    const [rtRw, setRtRw] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [reportId, setReportId] = useState('')
    const [change, setChange] = useState(false)
    const isReportModalOpen = useSelector((state) => state.modal.isReportModalOpen);

    useEffect(() => {
        console.log(isReportModalOpen)
        if (!isReportModalOpen) {
            console.log('fetching')
            axios.get(import.meta.env.VITE_API_URL + '/report')
            .then((res) => {
                console.log(res.data)
                setReports(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            
        }
        
    }, [change, isReportModalOpen])
    function handleOpenModal(report) {
        setOpenUpdateModal(true)
        setDate(report.date)
        setTime(report.time)
        setProvince(report.province)
        setCity(report.city)
        setDistrict(report.district)
        setVillage(report.village)
        setRtRw(report.rtRw)
        setDescription(report.description)
        setReportId(report.id)
    }
    function handleUpdate() {
        if (date === '' || time === '' || province === '' || city === '' || district === '' || village === '' || rtRw === '' || description === '') {
            alert('Please fill all the fields')
            return
        }
        const data = {
            date: date,
            time: time,
            province: province,
            city: city,
            district: district,
            village: village,
            rtRw: rtRw,
            description: description
        }
        console.log(data)
        axios.put(import.meta.env.VITE_API_URL + '/report', { reportId: reportId, report: data }).then((res) => {
            console.log(res)
            setOpenUpdateModal(false)
            setChange(!change)
        }
        ).catch((err) => {
            console.log(err)
        })
    }
    function handleDelete(reportId) {
        axios.delete(import.meta.env.VITE_API_URL + '/report/' + reportId)
            .then((res) => {
                console.log(res)
                setChange(!change)
            }
            ).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='overflow-auto'>
            {
                openUpdateModal &&
                <div>
                    <button onClick={() => { setOpenUpdateModal(false) }} className='fixed top-0 left-0 w-full h-full bg-lime-950 bg-opacity-50 z-10'>
                    </button>
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg z-20'>
                        <h1 className='text-2xl font-bold text-center'>Edit Laporan</h1>
                        <div className='flex flex-col gap-4 mt-4'>
                            <div className='flex flex-row gap-4 w-full justify-center items-center'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label htmlFor="">
                                        Tanggal Kejadian
                                    </label>
                                    <input type='date' className='p-2 border border-gray-300 rounded-lg focus:outline-none' onChange={(e) => { setDate(e.target.value) }} value={date} />
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label htmlFor="">
                                        Jam Kejadian
                                    </label>
                                    <input type='time' className='p-2 border border-gray-300 rounded-lg focus:outline-none' onChange={(e) => { setTime(e.target.value) }} value={time} />
                                </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <Input placeholder={'Masukkan Provinsi'} type={'text'} label={'Provinsi'} value={province} onChange={(e) => { setProvince(e.target.value) }}></Input>
                                <Input placeholder={'Masukkan Kota/Kabupaten'} type={'text'} label={'Kota/Kabupaten'} onChange={(e) => { setCity(e.target.value) }} value={city}></Input>
                                <Input placeholder={'Masukkan Kecamatan'} type={'text'} label={'Kecamatan'} onChange={(e) => { setDistrict(e.target.value) }} value={district}></Input>
                                <Input placeholder={'Masukkan Kelurahan/Desa'} type={'text'} label={'Kelurahan/Desa'} onChange={(e) => { setVillage(e.target.value) }} value={village}></Input>
                                <Input placeholder={'Contoh: 001/004'} type={'text'} label={'RT/RW'} onChange={(e) => { setRtRw(e.target.value) }} value={rtRw}></Input>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="">Deskripsi </label>
                                <textarea placeholder='Deskripsi' className='p-2 border border-gray-300 rounded-lg focus:outline-none' onChange={(e) => { setDescription(e.target.value) }} value={description}></textarea>
                            </div>
                            <Button onClick={handleUpdate}>Update</Button>
                        </div>
                    </div>
                </div>
            }
            <table className='min-w-full table-auto'>
                <thead>
                    <tr className='bg-lime-50'>

                        <th className='px-4 py-2 border-b text-left'>Tanggal</th>
                        <th className='px-4 py-2 border-b text-left'>Waktu</th>
                        <th className='px-4 py-2 border-b text-left'>Deskripsi</th>
                        <th className='px-4 py-2 border-b text-left'>Provinsi</th>
                        <th className='px-4 py-2 border-b text-left'>Kota</th>
                        <th className='px-4 py-2 border-b text-left'>Kecamatan</th>
                        <th className='px-4 py-2 border-b text-left'>Desa</th>
                        <th className='px-4 py-2 border-b text-left'>RT/RW</th>
                        <th className='px-4 py-2 border-b text-left'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report.id}>

                                <td className='px-4 py-2 border-b'>{report.date}</td>
                                <td className='px-4 py-2 border-b'>{report.time}</td>
                                <td className='px-4 py-2 border-b'>{report.description}</td>
                                <td className='px-4 py-2 border-b'>{report.province}</td>
                                <td className='px-4 py-2 border-b'>{report.city}</td>
                                <td className='px-4 py-2 border-b'>{report.district}</td>
                                <td className='px-4 py-2 border-b'>{report.village}</td>
                                <td className='px-4 py-2 border-b'>{report.rtRw}</td>
                                <td className='px-4 py-2 border-b'>
                                    <div className='w-full'>
                                        <Button onClick={() => handleOpenModal(report)} full>Edit</Button>
                                        <div className='py-1'></div>
                                        <Button full color="red" onClick={() => handleDelete(report.id)}>Hapus</Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) :
                        (
                            <tr>
                                <td colSpan="10" className="text-center py-2">Loading...</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


export default TabelPelaporan
