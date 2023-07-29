import React from 'react'
import { BoxContainer, Name } from './styles'
import SortIcon from '@mui/icons-material/Sort';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';

const FilterBox = () => {
    return (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", pt: 2 }}>

            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, p: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <SortIcon sx={{ fontSize: '18px' }} />
                <Typography sx={{ fontSize: '12px' }}>Listing</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, p: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <FavoriteIcon sx={{ fontSize: '18px' }} />
                <Typography sx={{ fontSize: '12px' }}>Like</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, p: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <ShoppingCartIcon sx={{ fontSize: '18px' }} />
                <Typography sx={{ fontSize: '12px' }}>Purchase</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, p: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <StorefrontIcon sx={{ fontSize: '18px' }} />
                <Typography sx={{ fontSize: '12px' }}>Sales</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, p: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <LogoutIcon sx={{ fontSize: '18px' }} />
                <Typography sx={{ fontSize: '12px' }}>Transfer</Typography>
            </Box>
        </Box>
    )
}

export default FilterBox