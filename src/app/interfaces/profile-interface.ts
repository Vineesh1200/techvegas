export interface ProfileInterface {
    data: {
        createdTime: string;
        email: string;
        userName:string,
        gender: string;
        profileImage: string;
        profileImageKey: string;
        _id: string;
        country: string;
        countryCode: string;
        phone: string;
        adsCount: number;
        followerCount: number;
        followingCount: number;
        isFollowing?: boolean;
        notificationCount: number
    };
    isAdmin: boolean;
    statusCode: number;
}

export interface ProfileEditInterface {
    userName: string;
    email: string;
    country: string;
    countryCode: string;
    gender: string;
    phone: string;
}