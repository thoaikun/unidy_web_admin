export interface Post {
    postId:     string;
    content:    string;
    status:     string;
    createDate: Date;
    updateDate: Date;
    isBlock:    boolean;
    linkImage:  string;
    userId:     number;
    user:       User;
}

export interface User {
    userId:                number;
    fullName:              string;
    address:               string;
    dayOfBirth:            Date;
    sex:                   null;
    phone:                 string;
    email:                 string;
    job:                   string;
    workLocation:          string;
    password:              string;
    role:                  string;
    isBlock:               boolean;
    enabled:               boolean;
    username:              string;
    authorities:           Authority[];
    accountNonExpired:     boolean;
    credentialsNonExpired: boolean;
    accountNonLocked:      boolean;
}

export interface Authority {
    authority: string;
}