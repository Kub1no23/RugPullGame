
// Generic Section Type
interface Section<T> {
    heading: string;
    description: string;
    items: T[];
}

// Achievements
interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
}

// Upgrades & Actions
interface Upgrade {
    id: number;
    title: string;
    description: string;
    icon: string;
    price: number;
    upgradePriceMultiplier: number;
    heatChange?: number;
    cloutPowerChange?: number;
    coinPriceMultiplier?: number;
    activeForSeconds?: number;
    additionalLives?: number;
    unlockAtLevel: number;
}

export type { Section, Achievement, Upgrade };