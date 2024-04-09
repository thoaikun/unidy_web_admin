export interface Campaign {
    campaign:         CampaignInfo;
    organizationNode: OrganizationNode;
    likeCount:        number;
    isLiked:          boolean;
    isJoined:         boolean;
}

interface CampaignInfo {
    campaignId:             string;
    title:                  string;
    hashTag:                null;
    content:                string;
    status:                 ECampaignStatus;
    startDate:              Date;
    endDate:                Date;
    timeTakePlace:          Date;
    location:               string;
    numbersVolunteer:       number;
    numOfRegister:          number;
    createDate:             Date;
    updateDate:             Date;
    isBlock:                boolean;
    linkImage:              string;
    donationBudget:         number;
    donationBudgetReceived: number;
    donate:                 null;
}

interface OrganizationNode {
    userId:           number;
    fullName:         string;
    isBlock:          boolean;
    profileImageLink: string;
    role:             string;
    isFriend?:        boolean;
    isFollow?:        boolean;
}

enum ECampaignStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE',
    BLOCK = 'BLOCK',
}