import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { EQuickDateSelection, IUseDateFilterController } from "./useDateFilterController"
import { FilterAltRounded } from "@mui/icons-material"


interface IProps {
    controller: IUseDateFilterController
}

const DateFilter = ({ controller }: IProps) => {
    return (
        <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', gap: 2, marginTop: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', gap: 0.5 }}>
                    <FilterAltRounded />
                    <Typography variant="body1">Bộ lọc</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', gap: 2 }}>
                    <DatePicker 
                        label="Từ ngày" 
                        format="DD/MM/YYYY"  
                        value={controller.fromDate}
                        onChange={controller.handleFromDateChange}                        
                    />
                    <DatePicker 
                        label="Tới ngày" 
                        format="DD/MM/YYYY" 
                        value={controller.toDate} 
                        onChange={controller.handleToDateChange}
                    />
                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="quick-selection">Chọn nhanh</InputLabel>
                        <Select
                            labelId="quick-selection"
                            value={controller.quickSelection}
                            onChange={controller.handleQuickSelectionChange}
                            label="Quick selection"
                        >
                            <MenuItem value={EQuickDateSelection.THIS_WEEK}>Tuần này</MenuItem>
                            <MenuItem value={EQuickDateSelection.THIS_MONTH}>Tháng này</MenuItem>
                            <MenuItem value={EQuickDateSelection.LAST_MONTH}>Tháng trước</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </LocalizationProvider>
        </Box>
    )
}

export default DateFilter