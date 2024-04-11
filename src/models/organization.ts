export interface Organization {
    userId:           number;
    organizationName: string;
    address:          string;
    phone:            string;
    email:            string;
    country:          string;
    image:            string;
    firebaseTopic:    string;
    isFollow:         boolean;
    isApproved:       boolean;
    overallFigure:    null;
}