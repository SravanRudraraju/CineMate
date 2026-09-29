import React from 'react'
import { useState, useEffect } from 'react'

const Diary = () => {
  const [diary,setDiary] = useState([])

  useEffect(()=>{
    const fetchDiary = async() =>{
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:3000/api/diary",{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      const data = await response.json()
      if(response.ok){
        setDiary(data.diary)
        
      }else{
        alert(data.message)
      } 
    }
    fetchDiary()
  },[])
   console.log(diary) 
  
  return (
    <div>
      <h1>Diary</h1>
    </div>
  )
}

export default Diary
