import { InfoRounded, BusinessRounded } from "@mui/icons-material"
import { Avatar, Box, Chip, Divider, Stack, Table, TableBody, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { getRandomColor } from "@utils/index"

const GeneralInfoTab = () => {
    const theme = useTheme()

    return (
        <>
            <Box my={2}>
                <Divider textAlign="left">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1, color: theme.palette.text.secondary }}>
                        <InfoRounded sx={{ width: 20, height: 20 }} />
                        <Typography variant="body1">Campaign information</Typography>
                    </Box>
                </Divider>
                
                <Table sx={{ marginTop: 2 }}>
                    <TableBody>
                        <TableRow>
                            <TableCell width={200}>Mô tả</TableCell>
                            <TableCell>Thêm thông tin mô tả sẽ nằm ở vị trí như thế này</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Trạng thái</TableCell>
                            <TableCell>Thêm thông tin mô tả sẽ nằm ở vị trí như thế này</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Thời gian mở</TableCell>
                            <TableCell>Thêm thông tin mô tả sẽ nằm ở vị trí như thế này</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Thời gian đóng</TableCell>
                            <TableCell>Thêm thông tin mô tả sẽ nằm ở vị trí như thế này</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Địa điểm diễn ra</TableCell>
                            <TableCell>Thêm thông tin mô tả sẽ nằm ở vị trí như thế này</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Thời gian diễn ra</TableCell>
                            <TableCell>Thêm thông tin mô tả sẽ nằm ở vị trí như thế này</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: 'none' }}>
                            <TableCell width={200}>Danh mục</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="Danh mục 1" sx={{ backgroundColor: getRandomColor() }}/>
                                    <Chip label="Danh mục 2" sx={{ backgroundColor: getRandomColor() }} />
                                    <Chip label="Danh mục 3" sx={{ backgroundColor: getRandomColor() }} />
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Cập nhật cuối</TableCell>
                            <TableCell>20/02/2002</TableCell> 
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>

            <Box mt={4} mb={2}>
                <Divider textAlign="left">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2, color: theme.palette.text.secondary }}>
                        <BusinessRounded />
                        <Typography variant="body1">Campaign information</Typography>
                    </Box>
                </Divider>

                <Table sx={{ marginTop: 2 }}>
                    <TableBody>
                        <TableRow>
                            <TableCell width={200}>Tên tổ chức</TableCell>
                            <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}>A</Avatar>
                                Green planet
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Email</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Số điện thoại</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

export default GeneralInfoTab