import SplitButton from '@components/button/splitButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Avatar, Box, Chip, CircularProgress, Divider, Table, TableBody, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import accountService from '@services/account';
import { useQuery } from '@tanstack/react-query';
import { formatDateTime } from '@utils/index';
import { useParams } from 'react-router-dom';

const VolunteerDetailPage = () => {
    const theme = useTheme()
    const { id } = useParams()
    const { data: volunteer, isLoading } = useQuery({
        queryKey: ['volunteer', id],
        queryFn: () => accountService.getVolunteerById(id ?? '0')
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
                        src={volunteer?.linkImage}
                    >
                        {volunteer?.fullName[0]}
                    </Avatar>
                    <Box>
                        <Typography variant="h6">{volunteer?.fullName}</Typography>
                        <Typography variant="body1">{volunteer?.email}</Typography>
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
                                <TableCell>{volunteer?.fullName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Email</TableCell>
                                <TableCell>
                                    {volunteer?.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Số điện thoại</TableCell>
                                <TableCell>{volunteer?.phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Nghề nghiệp</TableCell>
                                <TableCell>{volunteer?.job}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Địa chỉ</TableCell>
                                <TableCell>{volunteer?.workLocation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Ngày sinh</TableCell>
                                <TableCell>{formatDateTime(volunteer?.dayOfBirth)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Giới tính</TableCell>
                                <TableCell>{volunteer?.sex}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Loại tài khoản</TableCell>
                                <TableCell>Volunteer</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Trạng thái</TableCell>
                                <TableCell>
                                    <Chip label={!volunteer?.isBlock ? 'Active' : 'Block' } color={!volunteer?.isBlock ? 'success' : 'error'} />
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default VolunteerDetailPage;