import type { Upgrade, Section } from "./types"
import whitepaper from '../assets/whitepaper.png';
import advertise from '../assets/advertise.png';
import invest from '../assets/graphBuy.png';
import botsPromote from '../assets/botsPromotion.png';
import botsDeepfake from '../assets/botsDeepfake.png';
import celebAdvertisement from '../assets/celebAdvertisement.png';
import exchangeListing from '../assets/exchangeListing.png';
import donateCharity from '../assets/donateCharity.png';
import fomo from '../assets/fomo.png';
import taxEvasion from '../assets/taxEvasion.png';
import onetimeShield from '../assets/onetimeShield.png';
import lagoon from '../assets/lagoon.png';

export const upgradesSection: Section<Upgrade> = {
    heading: "Upgrades & Actions",
    description: "Purchase upgrades to boost your clout power and manage heat levels",
    items: [
        {
            id: 0,
            title: "Invest into the crypto yourself",
            description: "Lower the heat by investing your own money",
            icon: invest,
            heatChange: -15,
            cloutPowerChange: 2,
            price: 300,
            upgradePriceMultiplier: 1.5,
            unlockAtLevel: 0
        },
        {
            id: 1,
            title: "Advertise your socials",
            description: "Build social media presence and clout power",
            icon: advertise,
            heatChange: 5,
            cloutPowerChange: 1,
            price: 200,
            upgradePriceMultiplier: 1.5,
            unlockAtLevel: 0
        },
        {
            id: 2,
            title: "Bots Farm",
            description: `Army of bots commenting "To the moon! 🚀"`,
            icon: botsPromote,
            heatChange: 15,
            cloutPowerChange: 0,
            coinPriceMultiplier: 2,
            price: 500,
            upgradePriceMultiplier: 3,
            unlockAtLevel: 0
        },
        {
            id: 3,
            title: "Deepfake Endorsement",
            description: "Fake tweets endorsing your coin",
            icon: botsDeepfake,
            heatChange: 30,
            cloutPowerChange: 4,
            coinPriceMultiplier: 1.5,
            price: 7500,
            upgradePriceMultiplier: 2,
            unlockAtLevel: 2
        },
        {
            id: 4,
            title: "Influencer advertisements",
            description: "Celebrities advertising your coin to the public",
            icon: celebAdvertisement,
            heatChange: 0,
            cloutPowerChange: 3,
            coinPriceMultiplier: 1.3,
            price: 2000,
            upgradePriceMultiplier: 2,
            unlockAtLevel: 1
        },
        {
            id: 5,
            title: "Whitepapers",
            description: "Generate nonsense technical texts regarding the stability of your coin to calm down investors",
            icon: whitepaper,
            heatChange: -25,
            cloutPowerChange: 0,
            price: 500,
            upgradePriceMultiplier: 2,
            unlockAtLevel: 0
        },
        {
            id: 6,
            title: "Exchange Listing",
            description: "Enter new exchange to increase demand for your coin",
            icon: exchangeListing,
            heatChange: 10,
            cloutPowerChange: 5,
            coinPriceMultiplier: 2,
            price: 40000,
            upgradePriceMultiplier: 3,
            unlockAtLevel: 3
        },
        {
            id: 7,
            title: "Donate to charity",
            description: "Lowers heat while building reputation",
            icon: donateCharity,
            heatChange: -20,
            cloutPowerChange: 3,
            price: 1500,
            upgradePriceMultiplier: 2,
            unlockAtLevel: 1
        },
        {
            id: 8,
            title: "FOMO Multiplier",
            description: "Increases clout power for 30 seconds",
            icon: fomo,
            heatChange: 20,
            cloutPowerChange: 10,
            activeForSeconds: 30,
            price: 10000,
            upgradePriceMultiplier: 2.5,
            unlockAtLevel: 2
        },
        {
            id: 9,
            title: "Tax Evasion",
            description: "Arouses authority suspicion but keeps more of your hard earned money after rug pull",
            icon: taxEvasion,
            heatChange: 30,
            cloutPowerChange: 0,
            price: 20000,
            upgradePriceMultiplier: 2,
            unlockAtLevel: 4
        },
        {
            id: 10,
            title: "Celebrity shield",
            description: "One time protection when heat rises near limit",
            icon: onetimeShield,
            additionalLives: 1,
            cloutPowerChange: 0,
            price: 30000,
            upgradePriceMultiplier: 2,
            unlockAtLevel: 2
        },
        {
            id: 11,
            title: "Laguna Beach Villa",
            description: "Increases clout power and changes background",
            icon: lagoon,
            heatChange: 0,
            cloutPowerChange: 500,
            price: 500000,
            upgradePriceMultiplier: 100,
            unlockAtLevel: 4
        }
    ]
}