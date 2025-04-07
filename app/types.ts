export type typeUser = {
    _id: string;
    userName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    roomNumber?: string;
    checkInDate?: string;
    checkOutDate?: string;
    key?: string; 
    conversation?: typeConversation
}

export type typeConversation = {
    _id: string;
    user: typeUser
    chat: object
    createdAt: Date
    updatedAt: Date
}