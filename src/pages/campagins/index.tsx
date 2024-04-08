import CampaignCard from "@components/card/campaignCard"
import { Box, Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

const CampaignsPage = () => {
    const navigator = useNavigate()
    const [tabIndex, setTabIndex] = useState(0)

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
                    zIndex: 1,
                    backgroundColor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tab label="Tất cả" />
                <Tab label="Đang chạy" />
                <Tab label="Đã kết thúc" />
            </Tabs>
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
                <CampaignCard />
            </Box>
        </>

    )
}

export default CampaignsPage