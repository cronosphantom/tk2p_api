import { customAlphabet } from 'nanoid'


export class IdGenerator {

    generate(){
        const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 23)
        return "ck"+nanoid()  
    }



}