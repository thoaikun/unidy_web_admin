import { Pageable } from "@models/pageable"
import { Volunteer } from "@models/volunteer"
import api from "./base"
import { Organization } from "@models/organization"

const getVolunteers = async (pageNumber?: number, pageSize?: number) => {
    const payload = {
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }
    const res = await api.get('api/v1/admin/volunteers', { params: payload })
    return res.data as Pageable<Volunteer>
}

const getVolunteerById = async (volunteerId: string) => {
    const res = await api.get(`api/v1/admin/volunteers/${volunteerId}`)
    return res.data as Volunteer
}

const getOrganizations = async (pageNumber?: number, pageSize?: number) => {
    const payload = {
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }
    const res = await api.get('api/v1/admin/organizations', { params: payload })
    return res.data as Pageable<Organization>
}

const getUnapprovedOrganizations = async (pageNumber?: number, pageSize?: number) => {
    const payload = {
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }
    const res = await api.get('api/v1/admin/organizations/unapproved', { params: payload })
    return res.data as Pageable<Organization>
}

const getOrganizationById = async (organizationId: string) => {
    const res = await api.get(`api/v1/admin/organizations/${organizationId}`)
    return res.data as Organization
}

const approveOrganization = async (organizationId: string) => {
    await api.patch(`api/v1/admin/organizations/${organizationId}/approve`)
}

const blockOrUnBlockVolunteer = async (volunteerId: string) => {
    await api.patch(`api/v1/admin/users/${volunteerId}/block`)
}

const accountService = {
    getVolunteers,
    getVolunteerById,
    getOrganizations,
    getUnapprovedOrganizations,
    getOrganizationById,
    approveOrganization,
    blockOrUnBlockVolunteer
}

export default accountService