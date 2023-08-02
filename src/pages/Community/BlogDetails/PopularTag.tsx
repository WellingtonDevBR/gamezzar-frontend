import { Box, Typography } from '@mui/material';

export const PopularTag = () => {
    return (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", pt: 2 }}>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, px: 3, py: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <Typography sx={{ fontSize: '12px' }}>Action</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, px: 3, py: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <Typography sx={{ fontSize: '12px' }}>Indie</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, px: 3, py: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <Typography sx={{ fontSize: '12px' }}>RPG</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, px: 3, py: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <Typography sx={{ fontSize: '12px' }}>Digital Arts</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, px: 3, py: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <Typography sx={{ fontSize: '12px' }}>Arts</Typography>
            </Box>
            <Box sx={{
                backgroundColor: "#343444", display: 'flex', gap: 1, px: 3, py: 1, borderRadius: "30px", alignItems: 'center'
            }}>
                <Typography sx={{ fontSize: '12px' }}>Marketplace</Typography>
            </Box>


        </Box>
    );
};

export default PopularTag;
