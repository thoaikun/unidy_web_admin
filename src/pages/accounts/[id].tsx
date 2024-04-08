import SplitButton from '@components/button/splitButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Avatar, Box, Chip, Divider, Table, TableBody, TableCell, TableRow, Typography, useTheme } from "@mui/material";

const AccountDetailPage = () => {
    const theme = useTheme()

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
                    <Avatar sx={{ width: 50, height: 50}}>
                        A
                    </Avatar>
                    <Box>
                        <Typography variant="h6">Tên tài khoản</Typography>
                        <Typography variant="body1">Email</Typography>
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
                        <Typography variant="body1">User information</Typography>
                    </Box>
                </Divider>
                <Box>
                    <Table >
                        <TableBody>
                            <TableRow>
                                <TableCell width={200}>Tên</TableCell>
                                <TableCell>Nguyễn Văn A</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Email</TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Số điện thoại</TableCell>
                                <TableCell>0123456789</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Địa chỉ</TableCell>
                                <TableCell>123 Đường ABC, Quận 1, TP.HCM</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Ngày sinh</TableCell>
                                <TableCell>20/02/2002</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Giới tính</TableCell>
                                <TableCell>Nam</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Loại tài khoản</TableCell>
                                <TableCell>Volunteer</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell width={200}>Trạng thái</TableCell>
                                <TableCell>
                                    <Chip label="Active" color='success' />
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default AccountDetailPage;