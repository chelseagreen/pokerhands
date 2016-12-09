import {Hand} from "../src/poker"

describe("Poker Hands", () => {
    it("returns a card of two", () => {
        let hand = new Hand("2H 3S 5C 6D 7H");
        expect(hand.sortedCardList[0].cardValue).toEqual(2);
    });

    it("returns a face card", () => {
        let hand = new Hand("2H 3S 5C 6D AH");
        expect(hand.sortedCardList[4].cardValue).toEqual(14);
    });

    it("returns cards sorted in order by value", () => {
        let hand = new Hand("AH 2H 3S 5C 6D");
        expect(hand.sortedCardList[4].cardValue).toEqual(14);
    });

    it("returns a straight", () => {
        let hand = new Hand("2H 3S 5C 6D 4S");
        expect(hand.getHandType()).toEqual("straight");
    });

    it("returns a two pair", () => {
        let hand = new Hand("2H 2S 5C 6D 5S");
        expect(hand.getHandType()).toEqual("two pair");
    });
    it("returns a two pair", () => {
        let hand = new Hand("2H 2S 2C 6D 5S");
        expect(hand.getHandType()).not.toEqual("two pair");
    });
    it("returns a flush", () => {
        let hand = new Hand("2H 3H 4H 6H 9H");
        expect(hand.getHandType()).toEqual("flush");
    });
});