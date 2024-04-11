import { Organization } from "@models/organization"
import { Volunteer } from "@models/volunteer"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material"

interface IVolunteerAccountCardProps {
    onClick?: () => void
    account: Volunteer
}

const VolunteerAccountCard = ({ onClick, account }: IVolunteerAccountCardProps) => {
    return (
        <Card
            sx={{
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
            }}
        >
            <CardActionArea
                onClick={onClick}
            >
                <CardContent>
                    <Typography variant="h6" mb={1}>{account.fullName}</Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Email: {account.email}
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        SDT: {account.phone}
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Nghề nghiệp: {account.job}
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Địa chỉ: {account.workLocation}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

interface IOrganizationAccountCardProps {
    onClick?: () => void
    account: Organization
}

const OrganizationAccountCard = ({ onClick, account }: IOrganizationAccountCardProps) => {
    return (
        <Card
            sx={{
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
            }}
        >
            <CardActionArea
                onClick={onClick}
            >
                <CardContent>
                    <Typography variant="h6" mb={1}>{account.organizationName}</Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Email: {account.email}
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        SDT:  {account.phone}
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Trụ sở: {account.address ?? 'Chưa cập nhật'}
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Quốc gia: {account.country ?? 'Chưa cập nhật'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export { VolunteerAccountCard, OrganizationAccountCard }