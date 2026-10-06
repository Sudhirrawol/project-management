export interface RegisterUserDTO {
    name: string,
    email: string,
    password: string
}

export interface LoginDTO {
    email: string,
    password: string,
}
interface UpdateProfileDTO {
    name?: string,
    email?: string,
}