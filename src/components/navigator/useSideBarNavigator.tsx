import api from "@services/base";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useSideBarNavigator = () => {
    const navigator = useNavigate()
    const location = useLocation()
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('session')
        delete api.defaults.headers.common['Authorization']
        navigator('/login')
    }

    useEffect(() => {
        if (location.pathname.includes('/accounts'))
            setSelectedIndex(0)
        else if (location.pathname.includes('/campaigns'))
            setSelectedIndex(1)
        else if (location.pathname.includes('/posts'))
            setSelectedIndex(2)
    }, [location.pathname])

    return {
        menuAnchorEl,
        selectedIndex,
        handleOpenMenu,
        handleCloseMenu,
        handleLogout,
        navigator,
    }
}

export default useSideBarNavigator