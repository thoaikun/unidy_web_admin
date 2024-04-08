import Navigator from "@components/navigator/navigator";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column'}}>
            <Navigator />
            <Box component="div" pl={11} pr={1}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default HomeLayout