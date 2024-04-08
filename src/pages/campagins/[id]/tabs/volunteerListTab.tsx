import VolunteerCard from "@components/card/volunteerCard"
import { Box, Divider, List, Typography } from "@mui/material"

const VolunteerListTab = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            gap: 4,
            marginTop: 2
        }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Danh sách tình nguyện viên đang chờ</Typography>
                <List sx={{ overflow: 'auto', height: '70vh' }}>
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                </List>   
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Danh sách tình nguyện viên đã phê duyệt</Typography>
                <List sx={{ overflow: 'auto', height: '70vh' }}>
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                    <Divider />
                    <VolunteerCard />
                </List>  
            </Box>
        </Box>
    )
}

export default VolunteerListTab