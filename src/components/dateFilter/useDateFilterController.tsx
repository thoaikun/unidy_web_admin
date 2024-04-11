import { SelectChangeEvent } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

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
    const [searchParams, setSearchParams] = useSearchParams()
    const [fromDate, setFromDate] = useState(moment(new Date()).subtract(7, 'days'))
    const [toDate, setToDate] = useState(moment(new Date()))
    const [quickSelection, setQuickSelection] = useState<EQuickDateSelection | null>(null)

    const handleQuickSelectionChange = (event: SelectChangeEvent<EQuickDateSelection | null>) => {
        const value = event.target.value as EQuickDateSelection
        setQuickSelection(value)
        
        if (value === EQuickDateSelection.THIS_WEEK) {
            setFromDate(moment(new Date()).startOf('week'))
            setToDate(moment(new Date()))
            const params = new URLSearchParams(searchParams)
            params.set('fromDate', fromDate.format('YYYY-MM-DD'))
            params.set('toDate', toDate.format('YYYY-MM-DD'))
            setSearchParams(params)
            return
        }
        else if (value === EQuickDateSelection.THIS_MONTH) {
            setFromDate(moment(new Date()).startOf('month'))
            setToDate(moment(new Date()))
            const params = new URLSearchParams(searchParams)
            params.set('fromDate', fromDate.format('YYYY-MM-DD'))
            params.set('toDate', toDate.format('YYYY-MM-DD'))
            setSearchParams(params)
            return
        }
        else if (value === EQuickDateSelection.LAST_MONTH) {
            setFromDate(moment(new Date()).subtract(1, 'month').startOf('month'))
            setToDate(moment(new Date()).subtract(1, 'month').endOf('month'))
            const params = new URLSearchParams(searchParams)
            params.set('fromDate', fromDate.format('YYYY-MM-DD'))
            params.set('toDate', toDate.format('YYYY-MM-DD'))
            setSearchParams(params)
            return
        }
    }

    const handleFromDateChange = (date: moment.Moment | null) => {
        if (date) {
            setFromDate(date)
            const params = new URLSearchParams(searchParams)
            params.set('fromDate', date.format('YYYY-MM-DD'))
            setSearchParams(params)
        }
        setQuickSelection(null)
    }

    const handleToDateChange = (date: moment.Moment | null) => {
        if (date) {
            setToDate(date)
            const params = new URLSearchParams(searchParams)
            params.set('toDate', date.format('YYYY-MM-DD'))
            setSearchParams(params)
        }
        setQuickSelection(null)
    }

    useEffect(() => {
        const fromDate = searchParams.get('fromDate')
        const toDate = searchParams.get('toDate')
        if (fromDate && toDate) {
            setFromDate(moment(fromDate))
            setToDate(moment(toDate))
        }
    }, [searchParams])

    useEffect(() => {
        const f = searchParams.get('fromDate')
        const t = searchParams.get('toDate')
        if (f && t) {
            setFromDate(moment(f))
            setToDate(moment(t))
            return
        }
        else if (fromDate && toDate) {
            const params = new URLSearchParams(searchParams)
            params.set('fromDate', moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'))
            params.set('toDate', moment(new Date()).format('YYYY-MM-DD'))
            setSearchParams(params)
        }
    }, [])

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