import SplitButton from "@components/button/splitButton";
import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import campaignService from "@services/campaign";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import GeneralInfoTab from "./tabs/generalInfoTab";
import VolunteerListTab from "./tabs/volunteerListTab";
import { useParams } from "react-router-dom";
import DonatorListTab from "./tabs/donatorListTab";

const CampaignDetailPage = () => {
    const params = useParams()
    const [tabIndex, setTabIndex] = useState(0)
    const { data: campaign, isLoading } = useQuery({    
        queryKey: [params.id, 'campaign', 'generalInfo'],
        queryFn: () => campaignService.getCampaignById(params.id ?? '0'),
        refetchOnWindowFocus: false,
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
        <Box pt={2} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">{campaign?.title}</Typography>
                <SplitButton 
                    actions={[
                        { label: 'Hủy chiến dịch', onClick: () => {} },
                        { label: 'Hoàn tất tất toán', onClick: () => {} }
                    ]}
                />
            </Box>

            <Tabs
                value={tabIndex}
                onChange={(_, newValue) => setTabIndex(newValue)}
                indicatorColor="primary"
                textColor="primary"
                sx={{
                    marginTop: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tab label="Thông tin chung" />
                <Tab label="Danh sách đăng ký" />
                <Tab label="Nhà hảo tâm" />
            </Tabs>

            {tabIndex === 0 && <GeneralInfoTab campaign={campaign} organization={campaign?.organization} />}
            {tabIndex === 1 && <VolunteerListTab organizationId={campaign?.organization?.userId}/>}
            {tabIndex === 2 && <DonatorListTab />}
        </Box>
    )
}

export default CampaignDetailPage;