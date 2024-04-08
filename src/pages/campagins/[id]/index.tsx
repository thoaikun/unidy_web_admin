import SplitButton from "@components/button/splitButton";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import GeneralInfoTab from "./tabs/generalInfoTab";
import VolunteerListTab from "./tabs/volunteerListTab";

const CampaignDetailPage = () => {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <Box pt={2} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Campaign title</Typography>
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
                <Tab label="Thống kê" />
                <Tab label="Bình luận" />
            </Tabs>

            {tabIndex === 0 && <GeneralInfoTab />}
            {tabIndex === 1 && <VolunteerListTab />}
            {tabIndex === 2 && <></>}
            {tabIndex === 3 && <></>}
        </Box>
    )
}

export default CampaignDetailPage;