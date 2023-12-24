import React, { useEffect, useState } from 'react'

type ReturnType<T>=[
   T|undefined,
    React.Dispatch<React.SetStateAction<T | undefined>>
]

const useCustom = <T,>(key:string,initialValue?:T):ReturnType<T> => {

  const  [books,setBooks]=useState<T|undefined>(()=>{
    if(!initialValue) return ;
       const data= localStorage.getItem(key)
       return data?JSON.parse(data):initialValue

    })

    useEffect(()=>{
      if(books){
        localStorage.setItem(key,JSON.stringify(books))
      }
    },[books])


  return [books,setBooks]

}

export default useCustom;
