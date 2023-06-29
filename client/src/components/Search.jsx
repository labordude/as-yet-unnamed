import React from 'react'
import { Input } from '@chakra-ui/react'

export default function Search({ value, onChange}) {
  return (
    <Input 
        placeholder='Search Games'
        value={value}
        onChange={onChange}
    />
  )
}

