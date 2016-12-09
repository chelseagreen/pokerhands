class Card {
    cardValue: number;
    suit: string;

    faceCards: any = {
        "A": 14
    };

    constructor(card: string) {
        this.cardValue = isNaN(Number(card[0])) ? this.faceCards[card[0]] : Number(card[0]);
        this.suit = card[1];
    }
}

export class Hand {

    hand: string;
    sortedCardList: any = [];

    faceCards: any = {
        "A": 14
    };

    constructor(hand: string) {
        this.hand = hand;
        this.sortCards();
    }

    sortCards() : void {
        var handArray = this.hand.split(" ");
        this.sortedCardList = handArray.map((card) => {
            return new Card(card);
        }).sort((a,b) => {
            return a.cardValue-b.cardValue;
        });
    }

    getHandType(): string {

        let consecutiveCardValuePairCount: number = 0;
        let equalCardValuePairCount: number = 0;
        let equalCardSuitePairCount: number = 0;
        let equalCardValueList: any = [];

        for (let i=0; i<this.sortedCardList.length-1; i++) {
            if (this.consecutiveValueCards(this.sortedCardList[i], this.sortedCardList[i+1])) {
                consecutiveCardValuePairCount++;
            }
            if (this.equalValueCards(this.sortedCardList[i], this.sortedCardList[i+1])) {
                equalCardValuePairCount++;
                equalCardValueList.push(this.sortedCardList[i].cardValue);
            }
            if (this.equalSuites(this.sortedCardList[i], this.sortedCardList[i+1])) {
                equalCardSuitePairCount++;
            }

        }
        if (this.isFlush(equalCardSuitePairCount)) {
            return "flush";
        }
        if (this.isTwoPair(equalCardValuePairCount, equalCardValueList)) {
            return "two pair";
        }
        if (this.isStraight(consecutiveCardValuePairCount)) {
            return "straight";
        }
        return "";
    }

    private equalSuites(card1: Card, card2: Card): boolean {
        return card1.suit === card2.suit;
    }

    private isFlush(equalCardSuitePairCount: number): boolean {
        return equalCardSuitePairCount === 4;
    }

    private equalValueCards(card1: any, card2: any): boolean {
        return card1.cardValue === card2.cardValue;
    }

    private isTwoPair(equalCardValuePairCount: number, equalCardValueList: any): boolean {
        return equalCardValuePairCount === 2 && equalCardValueList[0] !== equalCardValueList[1];
    }

    private consecutiveValueCards(card1: any, card2: any): boolean {
        return card1.cardValue + 1 === card2.cardValue;
    }

    private isStraight(consecutiveCardValuePairCount: number): boolean {
        return consecutiveCardValuePairCount === 4;
    }
}