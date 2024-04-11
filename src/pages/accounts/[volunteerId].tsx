import SplitButton from '@components/button/splitButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Avatar, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Table, TableBody, TableCell, TableRow, TextField, Typography, useTheme } from "@mui/material";
import accountService from '@services/account';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDateTime } from '@utils/index';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const VolunteerDetailPage = () => {
    const theme = useTheme()
    const { id } = useParams()
    const queryClient = useQueryClient()
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const { data: volunteer, isLoading } = useQuery({
        queryKey: ['volunteer', id],
        queryFn: () => accountService.getVolunteerById(id ?? '0')
    })
    const blockOrUnblockVolunteerMutation = useMutation({
        mutationFn: () => accountService.blockOrUnBlockVolunteer(id ?? '0'),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['volunteer']
            })
        }
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
                            { label: !volunteer?.isBlock ? 'Chặn' : 'Bỏ chặn', onClick: () => setIsOpenDialog(true) },
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

            <Dialog
                open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData).entries());
                        const affirmation = formJson.affirmation;
                        if (affirmation === 'Có') {
                            blockOrUnblockVolunteerMutation.mutate()
                        }
                        setIsOpenDialog(false)
                    }
                }}
            >
                <DialogTitle>Phê duyệt tổ chức</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn {volunteer?.isBlock ? 'bỏ chặn' : 'chặn'} người dùng này. Vui lòng nhập "Có" để xác nhận.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="affirmation"
                        name="affirmation"
                        label="Xác nhận"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => setIsOpenDialog(false)}>Hủy</Button>
                    <Button color="info" type="submit">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default VolunteerDetailPage;