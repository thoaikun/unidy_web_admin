import CampaignCard from "@components/card/campaignCard"
import DateFilter from "@components/dateFilter/dateFilter"
import useDateFilterController from "@components/dateFilter/useDateFilterController"
import { ArrowDownward } from "@mui/icons-material"
import { Box, Button, Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

enum ECampaignTab {
    ALL = 0,
    RUNNING = 1,
    ENDED = 2
}


const CampaignsPage = () => {
    const navigator = useNavigate()
    const dateFilterController = useDateFilterController()
    const [tabIndex, setTabIndex] = useState<ECampaignTab>(ECampaignTab.ALL)

    const onChangeTab = (_: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue)
    }

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

            <Box 
                sx={{ 
                    marginTop: 3,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 300px))',
                    justifyContent: 'center',
                    gap: 2
                }}    
            >
                <CampaignCard onClick={() => navigator('/campaigns/4')} />
                <CampaignCard />
                <CampaignCard />
                <CampaignCard />
                <CampaignCard />
                <CampaignCard />
                <CampaignCard />
                <CampaignCard />
            </Box>

            <Box pt={3} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Button 
                    variant="text"
                    startIcon={<ArrowDownward />}
                    sx={{ 
                        color: 'primary.dark'
                    }}
                >
                    Xem thêm
                </Button>
            </Box>
        </>

    )
}

export default CampaignsPage