import VolunteerCard from "@components/card/volunteerCard"
import EmptyPlaceholder from "@components/emptyPlaceholder/emptyPlaceholder"
import { Box, Divider, List, Pagination, Typography } from "@mui/material"
import campaignService from "@services/campaign"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"

interface IProps {
    organizationId?: number
}

const LIMIT = 10

const useVolunteers = (organizationId?: number) => {
    const params = useParams()
    const [approvedVolunteersPage, setApprovedVolunteersPage] = useState(1)
    const [unapprovedVolunteersPage, setUnapprovedVolunteersPage] = useState(1)
    const { data: approveVolunteersData, isLoading: isLoadingApproveVolunteers } = useQuery({
        queryKey: [params.id, organizationId, approvedVolunteersPage, 'campaign', 'approveVolunteers'],
        queryFn: () => campaignService.getApprovedVolunteersInCampaign(params?.id || '0', organizationId ?? 0, approvedVolunteersPage - 1, LIMIT),
        refetchOnWindowFocus: false,
    })
    const { data: unapprovedVolunteersData, isLoading: isLoadingUnapproveVolunteers } = useQuery({
        queryKey: [params.id, organizationId, unapprovedVolunteersPage, 'campaign', 'unapproveVolunteers'],
        queryFn: () => campaignService.getUnapprovedVolunteersInCampaign(params?.id || '0', organizationId ?? 0, unapprovedVolunteersPage - 1, LIMIT),
        refetchOnWindowFocus: false,
    })

    const handleChangeApprovedVolunteersPage = (_: React.ChangeEvent<unknown>, value: number) => {
        setApprovedVolunteersPage(value)
    }

    const handleChangeUnapprovedVolunteersPage = (_: React.ChangeEvent<unknown>, value: number) => {
        setUnapprovedVolunteersPage(value)
    }

    return {
        approveVolunteers: approveVolunteersData?.content,
        unapprovedVolunteers: unapprovedVolunteersData?.content,
        totalApprovedVolunteersPage: approveVolunteersData?.totalPages,
        totalUnapprovedVolunteersPage: unapprovedVolunteersData?.totalPages,
        isLoadingApproveVolunteers,
        isLoadingUnapproveVolunteers,
        approvedVolunteersPage,
        unapprovedVolunteersPage,
        handleChangeApprovedVolunteersPage,
        handleChangeUnapprovedVolunteersPage
    }
}

const VolunteerListTab = ({ organizationId }: IProps) => {
    const { 
        approveVolunteers, 
        isLoadingApproveVolunteers,
        totalApprovedVolunteersPage, 
        approvedVolunteersPage,
        handleChangeApprovedVolunteersPage,

        unapprovedVolunteers,
        isLoadingUnapproveVolunteers,
        totalUnapprovedVolunteersPage,
        unapprovedVolunteersPage,
        handleChangeUnapprovedVolunteersPage
    } = useVolunteers(organizationId)

    return (
        <Box sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            gap: 4,
            marginTop: 2
        }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Danh sách tình nguyện viên đang chờ</Typography>
                {
                    isLoadingUnapproveVolunteers && (
                        <List sx={{ overflow: 'auto', height: '70vh' }}>
                            {unapprovedVolunteers?.map((volunteer, index) => (
                                <VolunteerCard key={index} volunteer={volunteer} />
                            ))}
                        </List>
                    )
                }

                {
                    unapprovedVolunteers && unapprovedVolunteers.length === 0 ? 
                    (
                        <EmptyPlaceholder />
                    )
                    :
                    (
                        <>
                            <List sx={{ overflow: 'auto', height: '70vh' }}>
                                {unapprovedVolunteers?.map((volunteer, index) => (
                                    <>
                                        <VolunteerCard key={index} volunteer={volunteer} />
                                        <Divider />
                                    </>
                                ))}
                            </List>
                            <Pagination
                                count={totalUnapprovedVolunteersPage}
                                page={unapprovedVolunteersPage}
                                onChange={handleChangeUnapprovedVolunteersPage}
                            />
                        </>
                    )
                } 
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Danh sách tình nguyện viên đã phê duyệt</Typography>

                {
                    isLoadingApproveVolunteers && (
                        <List sx={{ overflow: 'auto', height: '70vh' }}>
                            {approveVolunteers?.map((volunteer, index) => (
                                <VolunteerCard key={index} volunteer={volunteer} />
                            ))}
                        </List>
                    )
                }

                {
                    approveVolunteers && approveVolunteers.length === 0 ?
                        (
                            <EmptyPlaceholder />
                        )
                        :
                        (
                            <>
                                <List sx={{ overflow: 'auto', height: '70vh' }}>
                                    {approveVolunteers?.map((volunteer, index) => (
                                        <>
                                            <VolunteerCard key={index} volunteer={volunteer} />
                                            <Divider />
                                        </>
                                    ))}
                                </List>
                                <Pagination
                                    count={totalApprovedVolunteersPage}
                                    page={approvedVolunteersPage}
                                    onChange={handleChangeApprovedVolunteersPage}
                                />
                            </>
                        )
                }
            </Box>
        </Box>
    )
}

export default VolunteerListTab