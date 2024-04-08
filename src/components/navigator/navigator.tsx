import { AccountCircle, ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import CampaignIcon from '@mui/icons-material/Campaign';
import { Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ContactsIcon from '@mui/icons-material/Contacts';
import { useNavigate } from "react-router-dom";


const Navigator = () => {
    const navigator = useNavigate()
    const [extendDrawer, setExtendDrawer] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const handleToggleDrawer = () => {
        setExtendDrawer(!extendDrawer)
    }

    const handleCloseDrawer = () => {
        setExtendDrawer(false)
    }

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    };

    return (
        <Drawer 
            variant='permanent' 
            open={extendDrawer}
            PaperProps={{
                sx: {
                    minWidth: 75,
                }
            }}
            onClose={handleCloseDrawer}
        >
            <Box component="div" px={2} pt={2} height={65} boxSizing='border-box'>
                <Collapse 
                    in={extendDrawer} 
                    timeout={300} 
                    orientation="horizontal"
                    collapsedSize={45}
                > 
                    <img src='/imgs/logo_expand.svg' alt="logo" width={150}/>
                </Collapse>
            </Box>

            <Divider />

            <List>
                <Tooltip title='Trang chủ' placement="right">
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: extendDrawer ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => navigator('/accounts')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: extendDrawer ? 3 : 0,
                                }}
                            ><ContactsIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Tài khoản'} sx={{ display: extendDrawer ? 'block' : 'none' }} />
                        </ListItemButton>
                    </ListItem>
                </Tooltip>

                
                <Tooltip title='Chiến dịch' placement="right">
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: extendDrawer ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => navigator('/campaigns')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: extendDrawer ? 3 : 0,
                                }}
                            ><CampaignIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Chiến dịch'} sx={{ display: extendDrawer ? 'block' : 'none' }} />
                        </ListItemButton>
                    </ListItem>
                </Tooltip>
            </List>

            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    bottom: 0,
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
                    {extendDrawer && <Typography variant='caption'>Admin</Typography>}
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
                    <MenuItem onClick={() => navigator('/login')}>Đăng xuất</MenuItem>
                </Menu>
            
                <Box>
                    <IconButton onClick={handleToggleDrawer}>
                        {extendDrawer ? <ChevronLeftRounded /> : <ChevronRightRounded />}
                    </IconButton>
                </Box>
            </Box>
        </Drawer>
    )
}

export default Navigator