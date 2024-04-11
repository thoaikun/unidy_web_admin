import { Box, Typography } from "@mui/material"
import Inventory2Icon from '@mui/icons-material/Inventory2';

interface IProps {
    description?: string
}

const EmptyPlaceholder = ({ description }: IProps) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                marginTop: 10
            }}
        >
            <Inventory2Icon color="action" sx={{ fontSize: 30 }}/>
            <Typography variant="body1" color="textSecondary">{description || 'Chưa có dữ liệu'}</Typography>
        </Box>
    )
}

export default EmptyPlaceholder