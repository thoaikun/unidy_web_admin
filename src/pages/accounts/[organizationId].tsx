import SplitButton from "@components/button/splitButton"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useTheme } from "@mui/material"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import { Avatar, Box, Chip, CircularProgress, Divider, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import accountService from "@services/account"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useState } from "react"

const OrganizationDetailScreen = () => {
    const theme = useTheme()
    const queryClient = useQueryClient()
    const { id } = useParams()
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const { data: organization, isLoading } = useQuery({
        queryKey: ['organization', id],
        queryFn: () => accountService.getOrganizationById(id ?? '0')
    })
    const approveOrganizationMutation = useMutation({
        mutationFn: () => accountService.approveOrganization(id ?? '0'),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['organization']
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
                            { label: 'Phê duyệt', onClick: () => setIsOpenDialog(true), disabled: organization?.isApproved },
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
                            approveOrganizationMutation.mutate()
                        }
                        setIsOpenDialog(false)
                    }
                }}
            >
                <DialogTitle>Phê duyệt tổ chức</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn phê duyệt cho tổ chức này. Vui lòng nhập "Có" để xác nhận.
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

export default OrganizationDetailScreen