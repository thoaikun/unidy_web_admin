export interface Transaction {
    transactionId:      number;
    transactionType?:   string;
    transactionTime?:   Date;
    transactionAmount:  number;
    transactionCode?:   string;
    signature?:         string;
    organizationUserId: number;
    campaignId:         number;
    user:               User;
}

interface User {
    userId:    number;
    fullName:  string;
    linkImage: string;
}