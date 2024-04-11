import { Campaign } from "@models/campaign"
import api from "./base"
import { Transaction } from "@models/transaction"
import { JoinedVolunteer } from "@models/joinedVolunteer"
import { Pageable } from "@models/pageable"

const getCampaigns = async (
    fromDate?: string,
    toDate?: string,
    status?: string,
    pageNumber?: number,
    pageSize?: number,
) => {
    const payload = {
        fromDate,
        toDate,
        status,
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }

    const response = await api.post("api/v1/admin/campaigns", payload)
    return response.data as Pageable<Campaign>
}

const getCampaignById = async (campaignId: string) => {
    const response = await api.get(`api/v1/admin/campaigns/${campaignId}`)
    return response.data as Campaign
}

const getDonationsInCampaign = async (campaignId: string, pageNumber?: number, pageSize?: number) => {
    const payload = {
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }
    const response = await api.get(`api/v1/admin/campaigns/${campaignId}/transactions`, { params: payload })
    return response.data as Pageable<Transaction>
}

const getApprovedVolunteersInCampaign = async (campaignId: string, organizationId: number, pageNumber?: number, pageSize?: number) => {
    const payload = {
        organizationId,
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }
    const response = await api.get(`api/v1/admin/campaigns/${campaignId}/volunteers/approved`, { params: payload })
    return response.data as Pageable<JoinedVolunteer>
}

const getUnapprovedVolunteersInCampaign = async (campaignId: string, organizationId: number, pageNumber?: number, pageSize?: number) => {
    const payload = {
        organizationId,
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }
    const response = await api.get(`api/v1/admin/campaigns/${campaignId}/volunteers/unapproved`, { params: payload })
    return response.data as Pageable<JoinedVolunteer>
}

const campaignService = {
    getCampaigns,
    getCampaignById,
    getDonationsInCampaign,
    getApprovedVolunteersInCampaign,
    getUnapprovedVolunteersInCampaign,
}

export default campaignService