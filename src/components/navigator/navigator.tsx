import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import CampaignIcon from '@mui/icons-material/Campaign';
import { Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import ContactsIcon from '@mui/icons-material/Contacts';


const Navigator = () => {
    const [open, setOpen] = useState(false)  

    return (
        <Drawer 
            variant='permanent' 
            open={open}
            PaperProps={{
                sx: {
                    minWidth: 75,
                }
            }}
        >
            <Box component="div" px={2} pt={2} height={65} boxSizing='border-box'>
                <Collapse 
                    in={open} 
                    timeout={300} 
                    orientation="horizontal"
                    collapsedSize={45}
                > 
                    <img src='/imgs/logo_expand.svg' alt="logo" width={150}/>
                </Collapse>
            </Box>

            <Divider />

            <List>
                {['Tài khoản', 'Chiến dịch'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 0,
                                }}
                            >
                            {
                                index === 0 ? <ContactsIcon /> :
                                index === 1 ?  <CampaignIcon /> :
                                null
                            }
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ display: open ? 'block' : 'none' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >   
                <IconButton onClick={() => setOpen(!open)}>
                    {open ? <ChevronLeftRounded /> : <ChevronRightRounded />}
                </IconButton>
            </Box>
        </Drawer>
    )
}

export default Navigator