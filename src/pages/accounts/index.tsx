import { OrganizationAccountCard, VolunteerAccountCard } from "@components/card/accountCard"
import EmptyPlaceholder from "@components/emptyPlaceholder/emptyPlaceholder"
import { Organization } from "@models/organization"
import { Volunteer } from "@models/volunteer"
import { Box, CircularProgress, Pagination, Tab, Tabs } from "@mui/material"
import accountService from "@services/account"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

enum EAccountTab {
    VOLUNTEER = 0,
    ORGANIZATION = 1,
    PENDING = 2
}

const useAccounts = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [tabIndex, setTabIndex] = useState<EAccountTab>(EAccountTab.VOLUNTEER)
    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: ['accounts', page, tabIndex],
        queryFn: async () => {
            switch(tabIndex) {
                case EAccountTab.VOLUNTEER:
                    return accountService.getVolunteers(page-1, 10)
                case EAccountTab.ORGANIZATION:
                    return accountService.getOrganizations(page-1, 10)
                case EAccountTab.PENDING:
                    return accountService.getUnapprovedOrganizations(page-1, 10)
                default:
                    return accountService.getVolunteers(page-1, 10)
            }
        }
    })

    const onChangeTab = (_: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue)
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('tabIndex', newValue.toString())
        params.set('page', page.toString())
        setSearchParams(params)
    }

    const onChangePage = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        params.set('tabIndex', tabIndex.toString())
        params.set('page', page.toString())
        setSearchParams(params)
    }, [tabIndex, page]) // eslint-disable-line
    
    return {
        tabIndex,
        onChangeTab,
        page,
        onChangePage,
        accounts: data?.content,
        totalPages: data?.totalPages,
        isLoading
    }
}

const AccountsPage = () => {
    const navigator = useNavigate()
    const { tabIndex, onChangeTab, page, onChangePage, accounts, totalPages, isLoading } = useAccounts()

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
                <Tab label="Tình nguyện viên" />
                <Tab label="Tổ chức" />
                <Tab label="Chờ phê duyệt" />
            </Tabs>

            {isLoading &&
                (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 3
                        }} 
                    >
                        <CircularProgress size={32} />
                    </Box>
                )
            }

            {
                accounts && accounts.length > 0 ?
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
                            {accounts?.map(account => {
                                if (tabIndex === EAccountTab.VOLUNTEER) {
                                    return <VolunteerAccountCard 
                                        key={account.userId} account={account as Volunteer} onClick={() => navigator(`volunteers/${account.userId}`)}/>
                                }
                                else {
                                    return <OrganizationAccountCard key={account.userId} account={account as Organization} onClick={() => navigator(`organizations/${account.userId}`)} />
                                }
                            })}
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
                :
                (
                    <EmptyPlaceholder />
                )
            }

        </>
    )
}   

export default AccountsPage