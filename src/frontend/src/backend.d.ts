import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    userName: string;
    playType: PlayType;
    bookingDate: string;
    timestamp: Time;
    contactNumber: string;
    gameType: GameType;
}
export interface Result {
    winningNumber: string;
    date: string;
    time: string;
    gameName: string;
}
export type Time = bigint;
export interface Bet {
    playType: PlayType;
    number: string;
    timestamp: Time;
    gameType: GameType;
    amount: bigint;
}
export enum GameType {
    thailandLottery = "thailandLottery",
    bangkokWeekly = "bangkokWeekly"
}
export enum PlayType {
    vip = "vip",
    rumble = "rumble",
    local = "local"
}
export interface backendInterface {
    getAllResults(): Promise<Array<Result>>;
    getBangkokHistory(): Promise<Array<Result>>;
    getBets(): Promise<Array<Bet>>;
    getBookings(): Promise<Array<Booking>>;
    getResultByDate(date: string): Promise<Result>;
    getThaiHistory(): Promise<Array<Result>>;
    init(): Promise<void>;
    submitBet(number: string, amount: bigint, playType: PlayType, gameType: GameType): Promise<void>;
    submitBooking(userName: string, contactNumber: string, gameType: GameType, playType: PlayType, bookingDate: string): Promise<void>;
}
