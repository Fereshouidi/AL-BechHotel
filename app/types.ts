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

export type typeReservation = {
    _id?: string;
    user?: typeUser;
    room?: {
        number: string,
        type: string,
    };
    checkInDate?: string;
    checkOutDate?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type typeRoom = {
    _id: string
    number: string
    guests: [{
        guest: typeUser,
        ckeckInAt: Date,
        ckeckOutAt: Date
    }]
    type: 'single' | 'double' | 'triple' | 'quad'
    key: string
    isAvalable: boolean
}

export const reservation: typeReservation = {
    user: {
        _id: "67f5397151acb5d45246555f",
        checkInDate: "2025-04-09T10:00:00.000Z",
        checkOutDate: "2025-04-16T10:00:00.000Z",
        dateOfBirth: "2003-10-12T00:00:00.000Z",
        email: "fareshouidi298@gmail.com",
        key: "7474",
        phone: "+21629165922",
        roomNumber: "204",
        userName: "فارس هويدي"
      },
    room: {
    number: '202',
    type: 'Standard Room',
    },    
    checkInDate: "2023-12-01",
    checkOutDate: "2023-12-05",
    status: "confirmed",
    createdAt: new Date("2023-11-25T09:00:00Z"),
    updatedAt: new Date("2023-11-25T09:00:00Z")
};

