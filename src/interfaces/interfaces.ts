export interface User {
    id: string;
    username: string;
    age: number;
    hobbies: [ key: string ]
}

export interface HttpResponse {
    response: string;
    statusCode: number;
}