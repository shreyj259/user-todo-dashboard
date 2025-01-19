import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const UserDetailsSkeleton = () => {
  return (
    <div>
        <Skeleton variant="rounded"  sx={{mb:"16px"}} height={139} />
        <Skeleton variant="rounded"  sx={{mb:"16px"}} height={212} />
        <Skeleton variant="rounded"  sx={{mb:"16px"}} height={96} />
        <Skeleton variant="rounded"  sx={{mb:"16px"}} height={154} />
        <Skeleton variant="rounded"  sx={{mb:"16px"}} height={184} />
        <Skeleton variant="rounded"  sx={{mb:"16px"}} height={125} />
    </div>
  )
}

export default UserDetailsSkeleton