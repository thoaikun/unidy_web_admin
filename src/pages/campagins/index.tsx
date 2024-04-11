import CampaignCard from "@components/card/campaignCard"
import DateFilter from "@components/dateFilter/dateFilter"
import useDateFilterController from "@components/dateFilter/useDateFilterController"
import EmptyPlaceholder from "@components/emptyPlaceholder/emptyPlaceholder"
import { Box, CircularProgress, Pagination, Tab, Tabs } from "@mui/material"
import campaignService from "@services/campaign"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

enum ECampaignTab {
    ALL = 0,
    RUNNING = 1,
    ENDED = 2
}

const LIMIT = 8

const useCampaigns = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const dateFilterController = useDateFilterController()
    const [tabIndex, setTabIndex] = useState<ECampaignTab>(ECampaignTab.ALL)

    useEffect(() => {
        const tab = searchParams.get('tabIndex')
        const page = searchParams.get('page')
        if (!tab || !page) {
            const params = new URLSearchParams(searchParams)
            params.set('tabIndex', ECampaignTab.ALL.toString())
            params.set('page', '1')
            setSearchParams(params)
            return
        }
        setTabIndex(parseInt(tab))
        setPage(parseInt(page))
    },[]) // eslint-disable-line

    useEffect(() => {
        setPage(parseInt(searchParams.get('page') ?? '1'))
        setTabIndex(parseInt(searchParams.get('tabIndex') ?? '0'))
    }, [searchParams])

    const { data, isLoading } = useQuery({
        queryKey: ['campaigns', page, tabIndex, dateFilterController.fromDate, dateFilterController.toDate],
        queryFn: async () => {
            const fromDate = dateFilterController.fromDate.format('YYYY-MM-DDTHH:mm:ss').toString()
            const toDate = dateFilterController.toDate.format('YYYY-MM-DDTHH:mm:ss').toString()

            switch (tabIndex) {
                case ECampaignTab.ALL:
                    return campaignService.getCampaigns(fromDate, toDate, undefined, page-1, LIMIT)
                case ECampaignTab.RUNNING:
                    return campaignService.getCampaigns(fromDate, toDate, 'IN_PROGRESS', page-1, LIMIT)
                case ECampaignTab.ENDED:
                    return campaignService.getCampaigns(fromDate, toDate, 'COMPLETE', page-1, LIMIT)
                default:
                    return campaignService.getCampaigns(fromDate, toDate, undefined, page-1, LIMIT)
            }
        }
    })

    const onChangeTab = (_: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue)
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('tabIndex', newValue.toString())
        setSearchParams(params)
    }

    const onChangePage = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        setSearchParams(params)
    }

    return {
        tabIndex,
        page,
        onChangePage,
        onChangeTab,
        dateFilterController,
        isLoading,
        campaigns: data?.content ?? [],
        totalPages: data?.totalPages ?? 0,
    }
}

const CampaignsPage = () => {
    const navigator = useNavigate()
    const {
        tabIndex,
        page,
        onChangeTab,
        onChangePage,
        dateFilterController,
        isLoading,
        campaigns,
        totalPages
    } = useCampaigns()


    return (
        <>
            <Tabs 
                value={tabIndex} 
                onChange={onChangeTab}
                indicatorColor="primary"
                textColor="primary"
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 3,
                    backgroundColor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tab label="Tất cả" />
                <Tab label="Đang chạy" />
                <Tab label="Đã kết thúc" />
            </Tabs>

            <DateFilter controller={dateFilterController}/>

            {isLoading &&
                (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 400
                        }} 
                    >
                        <CircularProgress size={32} />
                    </Box>
                )
            }

            {!isLoading && campaigns && campaigns.length > 0 &&
                (
                    <>
                        <Box 
                            sx={{ 
                                marginTop: 3,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 300px))',
                                justifyContent: 'center',
                                gap: 2
                            }}    
                        >
                            {campaigns.map(campaign => (
                                <CampaignCard 
                                    key={campaign.campaignId}
                                    campaign={campaign}
                                    onClick={() => navigator(`/campaigns/${campaign.campaignId}`)}
                                />
                            ))}
                        </Box>

                        <Box pt={3} sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Pagination 
                                count={totalPages}
                                page={page}
                                color="primary"
                                onChange={onChangePage}
                            />
                        </Box>
                    </>
                )  
            }
            {
                !isLoading && (!campaigns || campaigns?.length === 0) &&
                (
                    <EmptyPlaceholder />
                )  
            }
        </>

    )
}

export default CampaignsPage