export interface UserInterface {
    id: number,
    expirationDate: Date
    roleList: {
        id: number
        name: string
    } []
    token: string
    active: boolean
    type: string
    username: string
    email: string
    tipoUser: string
    bio: string,
    imgUrl: string
    fullname: string
    dataRegistrazione: Date
}
