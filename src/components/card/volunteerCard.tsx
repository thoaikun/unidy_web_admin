import { JoinedVolunteer } from "@models/joinedVolunteer"
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { formatDateTime } from "@utils/index"

interface IProps {
    volunteer: JoinedVolunteer
}

const VolunteerCard = ({ volunteer } : IProps) => {
    return (
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar alt={volunteer?.fullName} src={volunteer?.linkImage} >
                    {volunteer?.fullName.charAt(0)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={volunteer?.fullName}
                secondary={
                    <Box mt={0.5}>
                        <Typography
                            sx={{ display: 'block' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Thời gian đăng ký: {formatDateTime(volunteer?.timeJoin) || 'Chưa cập nhật'}
                        </Typography>
                        <Typography
                            sx={{ display: 'block' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Nghề nghiệp: {volunteer?.job || 'Chưa cập nhật'}
                        </Typography>
                        <Typography
                            sx={{ display: 'block' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Nơi làm việc: {volunteer?.workLocation || 'Chưa cập nhật'}
                        </Typography>
                    </Box>
                }
            />
      </ListItem>
    )
}

export default VolunteerCard