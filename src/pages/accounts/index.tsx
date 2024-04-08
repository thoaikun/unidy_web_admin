import AccountCard from "@components/card/accountCard"
import { Box, Tab, Tabs } from "@mui/material"
import { useState, SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"

const AccountsPage = () => {
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
                <Tab label="Tình nguyện viên" />
                <Tab label="Tổ chức" />
                <Tab label="Chờ phê duyệt" />
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
                <AccountCard onClick={() => navigator('/accounts/4')} />
            </Box>
        </>
    )
}   

export default AccountsPage