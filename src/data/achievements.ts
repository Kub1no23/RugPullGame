import type { Achievement, Section } from "./types"
import victim from '../assets/victim.png';
import dump from '../assets/dump.png';
import exitLQ from '../assets/multipleVictims.png';
import mostWanted from '../assets/mostWanted.png';
import taxOptimization from '../assets/taxEvasion.png';
import lagoonVilla from '../assets/lagoonVilla.png';
import caught from '../assets/caught.png';

export const achievementsSection: Section<Achievement> = {
    heading: "Achievements",
    description: "Unlock these achievements as you progress through the game",
    items: [
        {
            id: 0,
            title: "First Victim",
            description: "First person to invest into your coin",
            icon: victim,
            unlocked: false
        },
        {
            id: 1,
            title: "Pump & Dump Master",
            description: "Dump after massive pump in a few secs",
            icon: dump,
            unlocked: false
        },
        {
            id: 2,
            title: "Exit Liquidity",
            description: "Rug pull when volume is at it's peak",
            icon: exitLQ,
            unlocked: false
        },
        {
            id: 3,
            title: "Laguna Beach Villa",
            description: "Buy your dream villa",
            icon: lagoonVilla,
            unlocked: false
        },
        {
            id: 4,
            title: "Interpol's Most Wanted",
            description: "Reach max level of Infamy",
            icon: mostWanted,
            unlocked: false
        },
        {
            id: 5,
            title: "Tax Optimization",
            description: "Keep more of your hard earned money",
            icon: taxOptimization,
            unlocked: false
        },
        {
            id: 6,
            title: "Better Luck Next Time",
            description: "You've been caught by the authorities",
            icon: caught,
            unlocked: false
        }
    ]
}