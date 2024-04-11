import { AccountCircle } from "@mui/icons-material";
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import useSideBarNavigator from "./useSideBarNavigator";

const Navigator = () => {
    const {
        menuAnchorEl, 
        selectedIndex,
        handleOpenMenu, 
        handleCloseMenu, 
        handleLogout,
        navigator 
    } = useSideBarNavigator()

    return (
        <Drawer 
            variant='permanent' 
            open={false}
            PaperProps={{
                sx: {
                    minWidth: 75,
                }
            }}
        >
            <Box component="div" px={2} pt={2} height={65} boxSizing='border-box'>
                <Collapse
                    timeout={300} 
                    orientation="horizontal"
                    collapsedSize={45}
                > 
                    <img src='/imgs/logo_expand.svg' alt="logo" width={150}/>
                </Collapse>
            </Box>

            <Divider />

            <List>
                <Tooltip title='Tài khoản' placement="right">
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                                justifyContent: 'center',
                            }}
                            onClick={() => navigator('/accounts')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                }}
                            >
                                <ContactsIcon color={selectedIndex === 0 ? 'primary' : 'action'} />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </Tooltip>

                
                <Tooltip title='Chiến dịch' placement="right">
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                                justifyContent: 'center',
                            }}
                            onClick={() => navigator('/campaigns')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                }}
                            >
                                <CampaignIcon color={selectedIndex === 1 ? 'primary' : 'action'} />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </Tooltip>
            </List>

            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    flexFlow: 'column wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >   
                <Box>
                    <IconButton onClick={handleOpenMenu}>
                        <AccountCircle />
                    </IconButton>
                </Box>

                <Menu
                    anchorEl={menuAnchorEl} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    open={Boolean(menuAnchorEl)} 
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
            </Box>
        </Drawer>
    )
}

export default Navigator