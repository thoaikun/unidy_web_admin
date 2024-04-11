import { Transaction } from "@models/transaction"
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { formatCurrency, formatDateTime } from "@utils/index"

interface IProps {
    donator: Transaction
}

const DonatorCard = ({ donator }: IProps) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={donator.user.fullName} src={donator.user.linkImage} >
                    {donator.user.fullName[0]}
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={donator.user.fullName}
                secondary={
                    <Box>
                        <Typography variant="body2" color="text.primary">
                            Số tiền: {formatCurrency(donator.transactionAmount)}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            Thời gian: {formatDateTime(donator.transactionTime) || 'Chưa cập nhật'}
                        </Typography>
                    </Box>
                }
            />
        </ListItem>
    )
}

export default DonatorCard