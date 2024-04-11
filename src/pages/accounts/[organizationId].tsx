import SplitButton from "@components/button/splitButton"
import { useTheme } from "@mui/material"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import { Avatar, Box, Chip, CircularProgress, Divider, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import accountService from "@services/account"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const OrganizationDetailScreen = () => {
    const theme = useTheme()
    const { id } = useParams()
    const { data: organization, isLoading } = useQuery({
        queryKey: ['organization', id],
        queryFn: () => accountService.getOrganizationById(id ?? '0')
    })

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                }}
            >
                <CircularProgress size={32} />
            </Box>
        )
    }


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        marginBottom: 2,
                        marginTop: 2
                    }}
                >
                    <Avatar 
                        sx={{ width: 50, height: 50}}
                        src={organization?.image}
                    >
                        {organization?.organizationName[0]}
                    </Avatar>
                    <Box>
                        <Typography variant="h6">{organization?.organizationName}</Typography>
                        <Typography variant="body1">{organization?.email}</Typography>
                    </Box>
                </Box>
                <Box>
                    <SplitButton 
                        actions={[
                            { label: 'Chặn', onClick: () => {} },
                            { label: 'Xóa', onClick: () => {} }
                        ]}
                    /> 
                </Box>
            </Box>

            <Box>
                <Divider textAlign="left" sx={{ marginBottom: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1, color: theme.palette.text.secondary }}>
                        <AssignmentIndIcon sx={{ width: 20, height: 20 }} />
                        <Typography variant="body1">Thông tin cá nhân</Typography>
                    </Box>
                </Divider>
                <Box>
                    <Table >
                        <TableBody>
                            <TableRow>
                                <TableCell width={200}>Tên</TableCell>
                                <TableCell>{organization?.organizationName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Email</TableCell>
                                <TableCell>
                                    {organization?.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Số điện thoại</TableCell>
                                <TableCell>{organization?.phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Địa chỉ</TableCell>
                                <TableCell>{organization?.address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Quốc gia</TableCell>
                                <TableCell>{organization?.country}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Loại tài khoản</TableCell>
                                <TableCell>Organization</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Trạng thái</TableCell>
                                <TableCell>
                                    <Chip label={organization?.isApproved ? 'Approved' : 'Not approved' } color={organization?.isApproved ? 'success' : 'info'} />
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default OrganizationDetailScreen