import { SelectChangeEvent } from "@mui/material"
import moment from "moment"
import { useState } from "react"

export enum EQuickDateSelection {
    THIS_WEEK = 1,
    THIS_MONTH = 2,
    LAST_MONTH = 3
}

export interface IUseDateFilterController {
    fromDate: moment.Moment
    toDate: moment.Moment
    quickSelection: EQuickDateSelection | null
    handleQuickSelectionChange: (event: SelectChangeEvent<EQuickDateSelection | null>) => void
    handleFromDateChange: (date: moment.Moment | null) => void
    handleToDateChange: (date: moment.Moment | null) => void
}

const useDateFilterController = () : IUseDateFilterController => {
    const [fromDate, setFromDate] = useState(moment(new Date()).subtract(7, 'days'))
    const [toDate, setToDate] = useState(moment(new Date()))
    const [quickSelection, setQuickSelection] = useState<EQuickDateSelection | null>(null)

    const handleQuickSelectionChange = (event: SelectChangeEvent<EQuickDateSelection | null>) => {
        const value = event.target.value as EQuickDateSelection
        setQuickSelection(value)
        
        switch (value) {
            case EQuickDateSelection.THIS_WEEK:
                setFromDate(moment(new Date()).startOf('week'))
                setToDate(moment(new Date()))
                break
            case EQuickDateSelection.THIS_MONTH:
                setFromDate(moment(new Date()).startOf('month'))
                setToDate(moment(new Date()))
                break
            case EQuickDateSelection.LAST_MONTH:
                setFromDate(moment(new Date()).subtract(1, 'month').startOf('month'))
                setToDate(moment(new Date()).subtract(1, 'month').endOf('month'))
                break
        }
    }

    const handleFromDateChange = (date: moment.Moment | null) => {
        if (date) {
            setFromDate(date)
        }
        setQuickSelection(null)
    }

    const handleToDateChange = (date: moment.Moment | null) => {
        if (date) {
            setToDate(date)
        }
        setQuickSelection(null)
    }


    return {
        fromDate,
        toDate,
        quickSelection,
        handleQuickSelectionChange,
        handleFromDateChange,
        handleToDateChange
    }
}

export default useDateFilterController