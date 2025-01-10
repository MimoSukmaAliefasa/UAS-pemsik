import React from 'react'
import { useDispatch } from 'react-redux'
import { closeReportModal } from '../store/modalSlice'
import Button from './Button'
import Input from './Input'
import axios from 'axios'
const AddReportModal = () => {
    const dispatch = useDispatch()
    const [date, setDate] = React.useState('')
    const [time, setTime] = React.useState('')
    const [province, setProvince] = React.useState('')
    const [city, setCity] = React.useState('')
    const [district, setDistrict] = React.useState('')
    const [village, setVillage] = React.useState('')
    const [rtRw, setRtRw] = React.useState('')
    const [description, setDescription] = React.useState('')
    const handleClick = () => {
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
        axios.post(import.meta.env.VITE_API_URL + '/report', data)
        .then((res) => {
            console.log(res)
            dispatch(closeReportModal())
        }
        ).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <button onClick={() => { dispatch(closeReportModal()) }} className='fixed top-0 left-0 w-full h-full bg-lime-950 bg-opacity-50 z-10'>
            </button>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg z-20'>
                <h1 className='text-2xl font-bold text-center'>Tambah Laporan</h1>
                <div className='flex flex-col gap-4 mt-4'>
                    <div className='flex flex-row gap-4 w-full justify-center items-center'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">
                                Tanggal Kejadian
                            </label>
                            <input type='date' className='p-2 border border-gray-300 rounded-lg focus:outline-none' onChange={(e) => { setDate(e.target.value) }}/>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="">
                                Jam Kejadian
                            </label>
                            <input type='time' className='p-2 border border-gray-300 rounded-lg focus:outline-none' onChange={(e) => { setTime(e.target.value) }}/>
                        </div>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Input placeholder={'Masukkan Provinsi'} type={'text'} label={'Provinsi'} onChange={(e) => { setProvince(e.target.value) }} ></Input>
                        <Input placeholder={'Masukkan Kota/Kabupaten'} type={'text'} label={'Kota/Kabupaten'} onChange={(e) => { setCity(e.target.value) }}></Input>
                        <Input placeholder={'Masukkan Kecamatan'} type={'text'} label={'Kecamatan'} onChange={(e) => { setDistrict(e.target.value) }}></Input>
                        <Input placeholder={'Masukkan Kelurahan/Desa'} type={'text'} label={'Kelurahan/Desa'} onChange={(e) => { setVillage(e.target.value) }}></Input>
                        <Input placeholder={'Contoh: 001/004'} type={'text'} label={'RT/RW'} onChange={(e) => { setRtRw(e.target.value) }}></Input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Deskripsi </label>
                        <textarea placeholder='Deskripsi' className='p-2 border border-gray-300 rounded-lg focus:outline-none' onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>
                    <Button onClick={handleClick}>Tambah</Button>
                </div>
            </div>
        </div>
    )
}

export default AddReportModal