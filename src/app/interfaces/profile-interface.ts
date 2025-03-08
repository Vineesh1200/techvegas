export interface ProfileInterface {
    address: {
        geolocation: {
            lat: number,
            long: number
        },
        city: string,
        street: string,
        number: number,
        zipcode: number
    },
    id: number,
    email: string,
    username: string,
    password: string,
    name: {
        firstname: string,
        lastname: string
    },
    phone: number
}