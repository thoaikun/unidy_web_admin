import DonatorCard from "@components/card/donatorCard";
import EmptyPlaceholder from "@components/emptyPlaceholder/emptyPlaceholder";
import { Box, CircularProgress, List, Pagination, Typography } from "@mui/material";
import campaignService from "@services/campaign";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const useDonation = () => {
    const params = useParams()
    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: [params?.id, page, 'campaign', 'donation'],
        queryFn: () => campaignService.getDonationsInCampaign(params?.id ?? '0', page-1),
        refetchOnWindowFocus: false,
    })

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return {
        donations: data?.content,
        totalPages: data?.totalPages,
        isLoading,
        page,
        handlePageChange
    }
}

const DonatorListTab = () => {
    const { donations, isLoading, totalPages, page, handlePageChange } = useDonation()

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
        <Box mt={2} maxWidth={600}>
            <Typography variant="h6">Danh sách nhà hảo tâm</Typography>

            {
                donations && donations.length === 0 ?
                    (
                        <EmptyPlaceholder />
                    )
                    :
                    (
                        <>
                            <List>
                                {donations?.map((donation, index) => (
                                    <DonatorCard key={index} donator={donation} />
                                ))}
                            </List>
                
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                            />
                        </>
                    )
            }

        </Box>
    );
}

export default DonatorListTab;