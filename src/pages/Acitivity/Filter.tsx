import React from 'react'
import FilterBox from './FilterBox'
import Search from './Search'
import { Box } from '@mui/material'



const Filter = () => {
    return (
        <div style={{ paddingTop: '30px' }}>
            <Search />

            <Box sx={{ pt: 3 }}>
                <p>
                    filter
                </p>
                <div>
                    <FilterBox />
                </div>
            </Box>
        </div >
    )
}

export default Filter