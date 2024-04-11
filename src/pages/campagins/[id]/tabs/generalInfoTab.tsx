import { Campaign, ECampaignStatus, OrganizationInfo } from "@models/campaign"
import { BusinessRounded, InfoRounded } from "@mui/icons-material"
import { Avatar, Box, Chip, Divider, ImageList, ImageListItem, Stack, Table, TableBody, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { formatDateTime } from "@utils/index"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface IProps {
    campaign?: Campaign
    organization?: OrganizationInfo
}

const GeneralInfoTab = ({ campaign, organization } : IProps) => {
    const theme = useTheme()
    const navigator = useNavigate()
    const [images, setImages] = useState<string[]>([])

    useEffect(() => {
        const images = JSON.parse(campaign?.link_image ?? '[]')
        setImages(images)
    }, [campaign])

    const CampaignTypeChip = () => {
        const campaignType = campaign?.campaignType
        const campaignTypeList = [
            { name: 'Cộng đồng', value: campaignType?.communityType ?? 0 },
            { name: 'Giáo dục', value: campaignType?.education ?? 0 },
            { name: 'Nghiên cứu', value: campaignType?.research ?? 0 },
            { name: 'Hỗ trợ khác', value: campaignType?.helpOther ?? 0 },
            { name: 'Môi trường', value: campaignType?.environment ?? 0 },
            { name: 'Sức khỏe', value: campaignType?.healthy ?? 0 },
            { name: 'Phòng chống thiên tai', value: campaignType?.emergencyPreparedness ?? 0 },
        ]

        const chips = []

        for (let i = 0; i < campaignTypeList.length; i++) {
            if (campaignTypeList[i].value > 0) {
                chips.push(
                    <Chip
                        key={i}
                        label={campaignTypeList[i].name}
                    />
                )
            }
        }

        return chips
    }

    return (
        <>
            <Box my={2}>
                <Divider textAlign="left">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1, color: theme.palette.text.secondary }}>
                        <InfoRounded sx={{ width: 20, height: 20 }} />
                        <Typography variant="body1">Thông tin chiến dịch</Typography>
                    </Box>
                </Divider>
                
                <Table sx={{ marginTop: 2 }}>
                    <TableBody>
                        <TableRow>
                            <TableCell width={200}>Mô tả</TableCell>
                            <TableCell>{campaign?.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Trạng thái</TableCell>
                            <TableCell>
                                <Chip 
                                    label={campaign?.status}
                                    color={campaign?.status === ECampaignStatus.COMPLETE ? 'success' : campaign?.status === ECampaignStatus.BLOCK ? 'error' : 'info'}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Thời gian mở</TableCell>
                            <TableCell>{formatDateTime(campaign?.startDate)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Thời gian đóng</TableCell>
                            <TableCell>{formatDateTime(campaign?.endDate)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Địa điểm diễn ra</TableCell>
                            <TableCell>{campaign?.location}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Thời gian diễn ra</TableCell>
                            <TableCell>{formatDateTime(campaign?.timeTakePlace)}</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: 'none' }}>
                            <TableCell width={200}>Danh mục</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {CampaignTypeChip()}
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Cập nhật cuối</TableCell>
                            <TableCell>{formatDateTime(campaign?.updateDate || campaign?.createDate)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Ảnh</TableCell>
                            <TableCell>
                                {images && images.length === 0 ? 
                                    'Chưa cập nhật'
                                    :
                                    <ImageList sx={{ width: 500 }}>
                                        {images.map((image, index) => (
                                            <ImageListItem key={index}>
                                                <img src={image} alt={`image-${index}`} loading="lazy"/>
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                }
                            </TableCell>
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
                            <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigator(`/accounts/organizations/${organization?.userId}`)}>
                                <Avatar 
                                    src={organization?.userProfileImage?.linkImage}
                                    sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}
                                >
                                    {organization?.organizationName[0] || 'O'}
                                </Avatar>
                                {organization?.organizationName || 'Chưa cập nhật'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Địa chỉ</TableCell>
                            <TableCell>{organization?.address || 'Chưa cập nhật'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={200}>Email</TableCell>
                            <TableCell>{organization?.email || 'Chưa cập nhật'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

export default GeneralInfoTab