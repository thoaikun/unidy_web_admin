export interface Campaign {
    campaignId:                number;
    title:                     string;
    description:               string;
    numberVolunteer:           number;
    numberVolunteerRegistered: number;
    donationBudget:            number;
    donationBudgetReceived:    number;
    startDate:                 Date;
    endDate:                   Date;
    timeTakePlace:             Date;
    location:                  string;
    status:                    ECampaignStatus;
    createDate:                Date;
    updateDate:                Date;
    updateBy:                  number;
    owner:                     number;
    hashTag:                   string;
    link_image:                string;
    campaignType:              CampaignType;
    organization:              OrganizationInfo;
}

export interface CampaignType {
    typeId:                number;
    campaignId:            number;
    communityType:         number;
    education:             number;
    research:              number;
    helpOther:             number;
    environment:           number;
    healthy:               number;
    emergencyPreparedness: number;
}

export interface OrganizationInfo {
    organizationId:   number;
    organizationName: string;
    address:          string;
    phone:            string;
    email:            string;
    status:           string;
    country:          string;
    userId:           number;
    firebaseTopic:    string;
    isApproved:       boolean;
    userProfileImage: UserProfileImage;
}

export interface UserProfileImage {
    imageId:    number;
    linkImage:  string;
    updateDate: Date;
    userId:     number;
}

export enum ECampaignStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE',
    BLOCK = 'BLOCK',
}