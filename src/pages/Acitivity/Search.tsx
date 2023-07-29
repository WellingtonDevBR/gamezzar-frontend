import { Box, Input, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    return (
        <Box sx={{ display: 'flex', height: '30px' }}>
            <input placeholder='enter your wor art' style={{ paddingLeft: "10px", border: '1px solid #343444', color: "white", borderRadius: '3px', background: "#14141F" }} />
            <Box sx={{ background: '#5142FC', display: 'flex', alignItems: 'center', width: '30px', justifyContent: 'center' }}>
                <SearchIcon />
            </Box>
        </Box>
    )
}

export default Search