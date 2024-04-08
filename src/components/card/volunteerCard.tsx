import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"

const VolunteerCard = () => {
    return (
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <Box mt={0.5}>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Ali Connors
                        </Typography>
                    </Box>
                }
            />
      </ListItem>
    )
}

export default VolunteerCard