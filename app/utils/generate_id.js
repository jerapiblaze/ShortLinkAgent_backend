import {nanoid, customAlphabet} from 'nanoid'

const numbersOnly = "0123456789"

const alphabetOnly = "abcdefghijklmnopqrstuvwxyz"

const capitalAlphabetOnly = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const userId = customAlphabet(numbersOnly,10)

const urlId = customAlphabet(numbersOnly+alphabetOnly+capitalAlphabetOnly, 10)

export default {
    userId,
    urlId
}